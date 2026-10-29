import crypto from 'node:crypto';
import { getEmailLayout, getAppDownloadEmailTemplate } from './email-templates.js';
import { signToken, verifyToken, setSecureCors, checkRateLimit, encryptVault, decryptVault } from './security.js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://iaylgsthwildjkiiwgfd.supabase.co';
const DEFAULT_SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || DEFAULT_SUPABASE_ANON;

function verifyPassword(password, storedPassword) {
  if (!storedPassword) return false;
  if (!storedPassword.includes(':')) {
    // Contraseña heredada en texto plano
    return password === storedPassword;
  }
  const [salt, originalHash] = storedPassword.split(':');
  const hash = crypto.createHash('sha256').update(password + salt).digest('hex');
  return hash === originalHash;
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.createHash('sha256').update(password + salt).digest('hex');
  return `${salt}:${hash}`;
}

async function recordAuditLog(storeId, eventType, details, req) {
  try {
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || '—';
    const userAgent = req.headers['user-agent'] || 'Navegador Web';
    await fetch(`${SUPABASE_URL}/rest/v1/store_audit_logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      },
      body: JSON.stringify({
        store_id: storeId,
        event_type: eventType,
        details: details,
        device: userAgent.slice(0, 100),
        ip: clientIp,
        status: 'Normal',
        created_at: new Date().toISOString()
      })
    });
  } catch (e) {
    // Falla silenciosa si la tabla aún no existe
  }
}

export default async function handler(req, res) {
  // SEC-06: CORS Defensivo y Security Headers
  setSecureCors(req, res, 'GET, POST, OPTIONS', 'Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ status: 'ok', service: 'auth-api' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { action, store_id, password, new_password } = req.body || {};

    // Acción especial: Seguimiento público de un pedido puntual por order_number / id (sin requerir store_id obligatorio)
    if (action === 'track_order') {
      const orderIdQuery = String(req.body?.order_id || '').trim();
      const storeHint = String(store_id || '').trim().toLowerCase();
      if (!orderIdQuery) {
        return res.status(400).json({ success: false, error: 'El número de pedido es requerido' });
      }

      // 1. Intentar consultar en tabla nativa orders si la key tiene privilegio
      try {
        const directRes = await fetch(`${SUPABASE_URL}/rest/v1/orders?or=(order_number.eq.${encodeURIComponent(orderIdQuery)},id.eq.${encodeURIComponent(orderIdQuery)})&limit=1`, {
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
        });
        if (directRes.ok) {
          const directRows = await directRes.json();
          if (Array.isArray(directRows) && directRows.length > 0) {
            return res.status(200).json({ success: true, order: directRows[0] });
          }
        }
      } catch (e) {}

      // 2. Consultar en el vault cifrado AES-256-GCM de la tienda (o tiendas activas si no se especificó store_id)
      const csQuery = storeHint
        ? `store_id=eq.${encodeURIComponent(storeHint)}&select=store_id,billing_info`
        : `status=neq.DELETED&select=store_id,billing_info`;
      const csRes = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?${csQuery}`, {
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
      });
      if (csRes.ok) {
        const storesList = await csRes.json();
        for (const st of (storesList || [])) {
          const bInfo = st.billing_info || {};
          if (bInfo._orders_vault) {
            const vaultOrders = decryptVault(bInfo._orders_vault, []);
            const found = (vaultOrders || []).find(o =>
              String(o.id || '').toLowerCase() === orderIdQuery.toLowerCase() ||
              String(o.order_number || '').toLowerCase() === orderIdQuery.toLowerCase()
            );
            if (found) {
              return res.status(200).json({ success: true, order: found, store_id: st.store_id });
            }
          }
        }
      }

      return res.status(404).json({ success: false, error: 'Pedido no encontrado' });
    }

    if (!store_id) {
      return res.status(400).json({ success: false, error: 'El nombre de la tienda o correo electrónico es requerido' });
    }

    const cleanStoreId = store_id.trim().toLowerCase();
    const isEmail = cleanStoreId.includes('@');

    // SEC-01 DEFENSE-IN-DEPTH: Si es intento de reseteo, verificar token criptográfico tempranamente
    if (action === 'reset_password') {
      const { reset_token } = req.body || {};
      if (!reset_token) {
        return res.status(401).json({
          success: false,
          error: 'Acceso denegado: Se requiere un token de recuperación válido. Por favor iniciá la recuperación desde "Olvidé mi contraseña".'
        });
      }
      const verifiedToken = verifyToken(reset_token, 'password_reset');
      if (!verifiedToken) {
        return res.status(403).json({
          success: false,
          error: 'El token de recuperación es inválido o ha expirado (límite 15 minutos). Por favor solicitá un nuevo enlace.'
        });
      }
    }

    // Prioridad 1: Autenticación segura mediante RPC en PostgreSQL (credenciales aisladas en store_auth)
    if (action === 'login' || !action) {
      // SEC-08: Prevención de ataques de fuerza bruta (máx 15 intentos por IP/tienda cada 15 min)
      const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'ip';
      const loginRl = checkRateLimit(`login_${clientIp}_${cleanStoreId}`, 15, 15 * 60 * 1000);
      if (!loginRl.allowed) {
        return res.status(429).json({
          success: false,
          error: 'Demasiados intentos de autenticación fallidos. Por seguridad, por favor aguardá 15 minutos.'
        });
      }

      try {
        const rpcRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/verify_store_login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          },
          body: JSON.stringify({
            p_identifier: cleanStoreId,
            p_password: (password || '').trim()
          })
        });

        if (rpcRes.ok) {
          const rpcData = await rpcRes.json();
          if (rpcData && rpcData.success) {
            const actualStoreId = (rpcData.store_id || cleanStoreId).toLowerCase();
            const planLevel = rpcData.plan_level || 'starter';
            // SEC-02: Generación de token firmado criptográficamente con HMAC-SHA256 (7 días de vigencia)
            const sessionToken = signToken({
              store_id: actualStoreId,
              admin_email: rpcData.admin_email || '',
              plan_level: planLevel,
              type: 'session'
            }, 86400 * 7);

            // Registrar auditoría de inicio de sesión de forma asíncrona
            recordAuditLog(actualStoreId, 'Inicio de Sesión (Admin)', `Acceso exitoso al panel de control (${rpcData.admin_email || cleanStoreId})`, req).catch(() => {});

            return res.status(200).json({
              success: true,
              store_id: actualStoreId,
              admin_email: rpcData.admin_email || '',
              token: sessionToken,
              plan_level: planLevel,
              message: 'Autenticación exitosa'
            });
          } else if (rpcData && rpcData.error) {
            const status = rpcData.error.includes('no existe') ? 404 : 401;
            return res.status(status).json({ success: false, error: rpcData.error });
          }
        }
      } catch (rpcErr) {
        console.warn('RPC verify_store_login no disponible, utilizando consulta directa:', rpcErr);
      }
    }

    let queryParam = '';
    if (isEmail) {
      queryParam = `admin_email=eq.${encodeURIComponent(cleanStoreId)}`;
    } else {
      queryParam = `store_id=eq.${encodeURIComponent(cleanStoreId)}`;
    }

    // Consulta directa a la base de datos (fallback)
    const configRes = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?${queryParam}`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });

    if (!configRes.ok) {
      return res.status(500).json({ success: false, error: 'Error al conectar con la base de datos' });
    }

    const data = await configRes.json();
    if (!data || data.length === 0) {
      return res.status(404).json({ success: false, error: 'La tienda o correo electrónico ingresado no existe' });
    }

    const settings = data[0];
    
    // Obtener la contraseña desde la columna dedicada 'password'
    // Fallback al JSON de 'email' en caso de que sea un comercio antiguo no migrado
    let dbPassword = settings.password || '';
    if (!dbPassword && settings.email) {
      try {
        const parsed = JSON.parse(settings.email);
        dbPassword = parsed.password || '';
      } catch(e) {}
    }

    // Usar el store_id real de la base de datos para la sesión
    const actualStoreId = (settings.store_id || cleanStoreId).toLowerCase();
    const adminEmail = settings.admin_email || (isEmail ? cleanStoreId : '');

    // Action: Login verification
    if (action === 'login' || !action) {
      if (dbPassword && !verifyPassword((password || '').trim(), dbPassword)) {
        return res.status(401).json({ success: false, error: 'Contraseña incorrecta' });
      }

      // SEC-02: Generación de token firmado criptográficamente con HMAC-SHA256 (7 días de vigencia)
      const sessionToken = signToken({
        store_id: actualStoreId,
        admin_email: adminEmail,
        plan_level: settings.plan_level || 'starter',
        type: 'session'
      }, 86400 * 7);

      // Registrar auditoría de inicio de sesión de forma asíncrona
      recordAuditLog(actualStoreId, 'Inicio de Sesión (Admin)', `Acceso exitoso al panel de control (${adminEmail || cleanStoreId})`, req).catch(() => {});

      return res.status(200).json({
        success: true,
        store_id: actualStoreId,
        admin_email: adminEmail,
        token: sessionToken,
        plan_level: settings.plan_level || 'starter',
        message: 'Autenticación exitosa'
      });
    }

    // Action: Forgot Password (Solicitud de recuperación de usuario / contraseña)
    if (action === 'forgot_password') {
      // SEC-01: Generar token de recuperación firmado criptográficamente con vigencia estricta de 15 minutos (900s)
      const resetToken = signToken({
        store_id: actualStoreId,
        admin_email: adminEmail,
        type: 'password_reset'
      }, 900);

      const resetLink = `https://daletepido.com.ar/alta-usuario.html?action=login&reset_store=${encodeURIComponent(actualStoreId)}&reset_token=${encodeURIComponent(resetToken)}`;

      if (adminEmail) {
        try {
          await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(adminEmail)}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              _subject: `Recuperación Segura de Contraseña - DaleTePido (${settings.business_name || actualStoreId})`,
              _template: 'table',
              Mensaje: `Solicitaste la recuperación de tu cuenta en DaleTePido. Este enlace tiene una vigencia de 15 minutos por razones de seguridad.`,
              Tienda: actualStoreId,
              Email: adminEmail,
              Enlace_Restablecer: resetLink
            })
          });
        } catch (e) {
          console.warn('Advertencia al enviar email de recuperación:', e);
        }
      }

      return res.status(200).json({
        success: true,
        store_id: actualStoreId,
        admin_email: adminEmail,
        reset_token: resetToken,
        message: `Te hemos enviado un correo de recuperación a ${adminEmail || 'tu email registrado'} (válido por 15 minutos).`
      });
    }

    // Action: Reset Password (Establecer nueva contraseña con validación criptográfica obligatoria)
    if (action === 'reset_password') {
      const { reset_token } = req.body || {};

      // SEC-01 HARDENING: Validar obligatoriamente la existencia y firma del reset_token
      if (!reset_token) {
        return res.status(401).json({
          success: false,
          error: 'Acceso denegado: Se requiere un token de recuperación válido. Por favor iniciá la recuperación desde "Olvidé mi contraseña".'
        });
      }

      const verifiedToken = verifyToken(reset_token, 'password_reset');
      if (!verifiedToken || verifiedToken.store_id !== actualStoreId) {
        return res.status(403).json({
          success: false,
          error: 'El token de recuperación es inválido, ha expirado (límite 15 minutos) o no corresponde a esta tienda. Por favor solicitá un nuevo enlace.'
        });
      }

      if (!new_password || new_password.trim().length < 4) {
        return res.status(400).json({ success: false, error: 'La nueva contraseña debe tener al menos 4 caracteres' });
      }

      const hashedPassword = hashPassword(new_password.trim());

      // 1. Intentar actualizar mediante RPC segura en PostgreSQL (store_auth)
      try {
        const rpcReset = await fetch(`${SUPABASE_URL}/rest/v1/rpc/reset_store_password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          },
          body: JSON.stringify({
            p_store_id: actualStoreId,
            p_new_password_hash: hashedPassword
          })
        });

        if (rpcReset.ok) {
          const rpcResetData = await rpcReset.json();
          if (rpcResetData && rpcResetData.success) {
            return res.status(200).json({
              success: true,
              store_id: actualStoreId,
              message: 'Tu contraseña ha sido restablecida exitosamente. Ya podés ingresar.'
            });
          }
        }
      } catch (errRpcReset) {
        console.warn('RPC reset_store_password no disponible, usando fallback:', errRpcReset);
      }

      // 2. Fallback: Actualizar en company_settings (el trigger de la base de datos se encargará de neutralizarlo)
      const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${encodeURIComponent(actualStoreId)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        },
        body: JSON.stringify({ password: hashedPassword })
      });

      if (!patchRes.ok) {
        throw new Error(`HTTP Error ${patchRes.status}`);
      }

      return res.status(200).json({
        success: true,
        store_id: actualStoreId,
        message: 'Tu contraseña ha sido restablecida exitosamente. Ya podés ingresar.'
      });
    }

    // Action: Request Plan Upgrade (Solicitud de cambio de plan / membresía)
    if (action === 'request_plan_upgrade') {
      const selectedPlan = (req.body.selected_plan || 'mensual').toUpperCase();
      const contactEmail = req.body.contact_email || adminEmail || '';
      const whatsapp = req.body.whatsapp || settings.wapp_number || 'No especificado';
      const businessName = settings.business_name || actualStoreId;

      const resendApiKey = process.env.RESEND_API_KEY;
      const adminNotifyEmails = ['soporte@daletepido.com.ar', 'daletepido@gmail.com'];

      const subject = `🚀 Solicitud de Membresía (${selectedPlan}) — Tienda ${businessName}`;
      const htmlBody = `
        <h2>NUEVA SOLICITUD DE CAMBIO DE PLAN DE MEMBRESÍA</h2>
        <p>Un comercio ha solicitado contratar/cambiar su plan desde el Dashboard:</p>
        <ul>
          <li><strong>Tienda (Store ID):</strong> ${actualStoreId}</li>
          <li><strong>Nombre del Comercio:</strong> ${businessName}</li>
          <li><strong>Plan Solicitado:</strong> ${selectedPlan}</li>
          <li><strong>Email de Contacto:</strong> ${contactEmail}</li>
          <li><strong>WhatsApp:</strong> ${whatsapp}</li>
          <li><strong>Fecha/Hora:</strong> ${new Date().toLocaleString('es-AR')}</li>
        </ul>
        <p><em>Por favor verificar la acreditación del pago o contactar al comercio para concretar el cobro y actualizar el plan en el Super Admin.</em></p>
      `;

      if (resendApiKey) {
        try {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${resendApiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: 'Dale! Te Pido <soporte@daletepido.com.ar>',
              to: adminNotifyEmails,
              subject: subject,
              html: htmlBody
            })
          });

          // AUTORRESPUESTA AUTOMÁTICA AL USUARIO
          if (contactEmail) {
            try {
              const autoReplyHtml = getEmailLayout({
                title: 'Recibimos tu solicitud — Dale! Te Pido',
                bodyContent: `
                  <div class="greeting">¡Hola, ${businessName || actualStoreId}! 👋</div>
                  <div class="badge badge-green">🟢 Consulta Recibida en Soporte</div>
                  <div class="text">
                    Recibimos tu mensaje en el centro de atención de <strong>Dale! Te Pido</strong>.<br/><br/>
                    <strong>Pronto te estaremos ayudando.</strong> Nuestro equipo de soporte procesará tu requerimiento y te responderá por este mismo medio a la brevedad.
                  </div>
                  <div class="box">
                    <div class="box-title">📋 Resumen de tu solicitud:</div>
                    <div class="step-item"><span class="step-num">•</span><div><strong>Comercio:</strong> ${businessName} (${actualStoreId})</div></div>
                    <div class="step-item"><span class="step-num">•</span><div><strong>Solicitud:</strong> Cambio / Alta de Plan ${selectedPlan}</div></div>
                  </div>
                `
              });

              await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${resendApiKey}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  from: 'Dale! Te Pido <soporte@daletepido.com.ar>',
                  to: [contactEmail],
                  subject: 'Recibimos tu solicitud — Dale! Te Pido',
                  html: autoReplyHtml
                })
              });
            } catch (errAuto) {
              console.warn('Error enviando autorrespuesta:', errAuto);
            }
          }
        } catch(e) {
          console.warn('Error enviando mail Resend de upgrade:', e);
        }
      } else {
        try {
          await fetch('https://formsubmit.co/ajax/daletepido@gmail.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              _subject: subject,
              Tienda: actualStoreId,
              Comercio: businessName,
              Plan: selectedPlan,
              Email: contactEmail,
              WhatsApp: whatsapp
            })
          });
        } catch(e) {}
      }

      return res.status(200).json({
        success: true,
        store_id: actualStoreId,
        message: 'Solicitud de membresía enviada exitosamente. Nos pondremos en contacto a la brevedad.'
      });
    }

    // Action: Send App Download Email (Envío de enlace de descarga de APK al comerciante)
    if (action === 'send_app_download_email') {
      const targetEmail = (req.body.email || adminEmail || '').trim();
      const businessName = settings.business_name || actualStoreId;

      if (!targetEmail || !targetEmail.includes('@')) {
        return res.status(400).json({ success: false, error: 'Por favor proporcioná un correo electrónico válido' });
      }

      // SEC-08: Prevención de abuso de envío (máx 5 correos por hora por IP/tienda)
      const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'ip';
      const emailRl = checkRateLimit(`apk_email_${clientIp}_${actualStoreId}`, 5, 60 * 60 * 1000);
      if (!emailRl.allowed) {
        return res.status(429).json({
          success: false,
          error: 'Demasiadas solicitudes de descarga por correo. Por favor revisá tu bandeja de entrada o spam.'
        });
      }

      const downloadUrl = 'https://daletepido.com.ar/descargar-app';
      const template = getAppDownloadEmailTemplate({ storeName: businessName, downloadUrl });
      const resendApiKey = process.env.RESEND_API_KEY;

      if (resendApiKey) {
        try {
          const sendRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${resendApiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: process.env.RESEND_FROM_EMAIL || 'Dale! Te Pido <soporte@daletepido.com.ar>',
              to: [targetEmail],
              subject: template.subject,
              html: template.html
            })
          });

          if (!sendRes.ok) {
            const errData = await sendRes.json().catch(() => ({}));
            console.warn('Fallo en Resend al enviar email de APK:', errData);
            return res.status(502).json({ success: false, error: 'No se pudo enviar el correo en este momento. Podés usar la descarga directa o el código QR.' });
          }

          await recordAuditLog(actualStoreId, 'apk_download_email_sent', `Enviado a ${targetEmail}`, req);

          return res.status(200).json({
            success: true,
            message: `¡Enlace de descarga enviado exitosamente a ${targetEmail}! Revisá tu bandeja de entrada (y la carpeta de spam si no lo ves).`
          });
        } catch (errResend) {
          console.error('Error enviando email APK vía Resend:', errResend);
          return res.status(500).json({ success: false, error: 'Error al conectar con el servidor de correo' });
        }
      } else {
        return res.status(503).json({ success: false, error: 'Servicio de correo temporalmente no disponible' });
      }
    }

    // =========================================================================
    // SINCRONIZACIÓN CLOUD SEGURA DE PEDIDOS Y CADETES (AES-256-GCM VAULT)
    // =========================================================================
    const currentBillingInfo = (settings.billing_info && typeof settings.billing_info === 'object')
      ? { ...settings.billing_info }
      : {};

    // A. Crear / Registrar un nuevo pedido desde tienda.html o dashboard.html
    if (action === 'sync_order_create') {
      const incomingOrder = req.body?.order;
      if (!incomingOrder || typeof incomingOrder !== 'object') {
        return res.status(400).json({ success: false, error: 'Datos de pedido inválidos' });
      }

      const normalizedOrder = {
        ...incomingOrder,
        id: incomingOrder.id || incomingOrder.order_number || ('PED-' + Date.now()),
        order_number: incomingOrder.order_number || incomingOrder.id || ('PED-' + Date.now()),
        store_id: actualStoreId,
        estado: incomingOrder.estado || incomingOrder.status || 'confirmar',
        status: incomingOrder.status || incomingOrder.estado || 'confirmar',
        created_at: incomingOrder.created_at || new Date().toISOString()
      };

      const existingOrders = decryptVault(currentBillingInfo._orders_vault, []);
      const filtered = (Array.isArray(existingOrders) ? existingOrders : []).filter(
        o => o && String(o.id) !== String(normalizedOrder.id) && String(o.order_number) !== String(normalizedOrder.order_number)
      );
      filtered.unshift(normalizedOrder);
      const trimmed = filtered.slice(0, 200);

      currentBillingInfo._orders_vault = encryptVault(trimmed);

      await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${encodeURIComponent(actualStoreId)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        },
        body: JSON.stringify({ billing_info: currentBillingInfo })
      });

      return res.status(200).json({ success: true, order: normalizedOrder });
    }

    // B. Listar pedidos del comercio para el Dashboard (sync_orders_list)
    if (action === 'sync_orders_list') {
      const vaultOrders = decryptVault(currentBillingInfo._orders_vault, []);
      return res.status(200).json({
        success: true,
        store_id: actualStoreId,
        orders: Array.isArray(vaultOrders) ? vaultOrders : []
      });
    }

    // C. Actualizar estado, repartidor o eliminar pedido en el Kanban (sync_order_update)
    if (action === 'sync_order_update') {
      const orderId = String(req.body?.order_id || '').trim();
      const updates = req.body?.updates || {};
      const isDelete = req.body?.delete === true;

      if (!orderId) {
        return res.status(400).json({ success: false, error: 'order_id es requerido' });
      }

      let vaultOrders = decryptVault(currentBillingInfo._orders_vault, []);
      if (!Array.isArray(vaultOrders)) vaultOrders = [];

      let updatedOrder = null;
      if (isDelete) {
        vaultOrders = vaultOrders.filter(o => o && String(o.id) !== orderId && String(o.order_number) !== orderId);
      } else {
        const idx = vaultOrders.findIndex(o => o && (String(o.id) === orderId || String(o.order_number) === orderId));
        if (idx >= 0) {
          vaultOrders[idx] = {
            ...vaultOrders[idx],
            ...updates,
            updated_at: new Date().toISOString()
          };
          updatedOrder = vaultOrders[idx];
        } else if (req.body?.full_order) {
          updatedOrder = {
            ...req.body.full_order,
            ...updates,
            store_id: actualStoreId,
            updated_at: new Date().toISOString()
          };
          vaultOrders.unshift(updatedOrder);
        }
      }

      currentBillingInfo._orders_vault = encryptVault(vaultOrders.slice(0, 200));

      await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${encodeURIComponent(actualStoreId)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        },
        body: JSON.stringify({ billing_info: currentBillingInfo })
      });

      // Intentar también sincronizar en public.orders si la política lo permite
      try {
        if (!isDelete && updates.estado) {
          await fetch(`${SUPABASE_URL}/rest/v1/orders?or=(id.eq.${encodeURIComponent(orderId)},order_number.eq.${encodeURIComponent(orderId)})&store_id=eq.${encodeURIComponent(actualStoreId)}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'apikey': SUPABASE_KEY,
              'Authorization': `Bearer ${SUPABASE_KEY}`
            },
            body: JSON.stringify({ status: updates.estado, updated_at: new Date().toISOString() })
          });
        }
      } catch (e) {}

      return res.status(200).json({ success: true, order: updatedOrder });
    }

    // D. Sincronizar Cadetes / Puntos de Retiro (sync_pickups)
    if (action === 'sync_pickups') {
      const subAction = req.body?.sub_action || 'list';
      let vaultPickups = decryptVault(currentBillingInfo._pickups_vault, []);
      if (!Array.isArray(vaultPickups)) vaultPickups = [];

      if (subAction === 'list') {
        return res.status(200).json({ success: true, pickups: vaultPickups });
      }

      if (subAction === 'save' && req.body?.pickup) {
        const pu = { ...req.body.pickup, store_id: actualStoreId };
        const idx = vaultPickups.findIndex(p => p && String(p.id) === String(pu.id));
        if (idx >= 0) {
          vaultPickups[idx] = { ...vaultPickups[idx], ...pu };
        } else {
          vaultPickups.push(pu);
        }
      } else if (subAction === 'delete' && req.body?.pickup_id) {
        vaultPickups = vaultPickups.filter(p => p && String(p.id) !== String(req.body.pickup_id));
      } else if (subAction === 'replace_all' && Array.isArray(req.body?.pickups)) {
        vaultPickups = req.body.pickups.map(p => ({ ...p, store_id: actualStoreId }));
      }

      currentBillingInfo._pickups_vault = encryptVault(vaultPickups);

      await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${encodeURIComponent(actualStoreId)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        },
        body: JSON.stringify({ billing_info: currentBillingInfo })
      });

      return res.status(200).json({ success: true, pickups: vaultPickups });
    }

    return res.status(400).json({ success: false, error: 'Acción no válida' });

  } catch (error) {
    console.error('Error in auth handler:', error);
    return res.status(500).json({ success: false, error: 'Error interno en la autenticación' });
  }
}
