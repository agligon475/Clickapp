/**
 * Plantillas de Correo HTML para Dale! Te Pido
 */

const BASE_URL = 'https://daletepido.com.ar';

function getEmailLayout({ title, bodyContent }) {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0d0b0b; color: #ffffff; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    .wrapper { background-color: #0d0b0b; padding: 30px 10px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #171313; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 12px 40px rgba(0,0,0,0.6); }
    .header { background: linear-gradient(135deg, #D60000 0%, #7A0000 100%); padding: 32px 24px; text-align: center; }
    .logo-title { color: #ffffff; font-size: 26px; font-weight: 900; margin: 0; letter-spacing: -0.5px; text-transform: uppercase; }
    .logo-sub { color: rgba(255,255,255,0.8); font-size: 12px; margin-top: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; }
    .content { padding: 32px 24px; }
    .greeting { font-size: 22px; font-weight: 800; color: #ffffff; margin-bottom: 16px; }
    .badge { display: inline-block; padding: 6px 16px; border-radius: 50px; font-size: 13px; font-weight: 700; margin-bottom: 24px; }
    .badge-red { background: rgba(214, 0, 0, 0.18); border: 1px solid #D60000; color: #ff6666; }
    .badge-amber { background: rgba(245, 158, 11, 0.18); border: 1px solid #F59E0B; color: #fbbf24; }
    .badge-blue { background: rgba(34, 211, 238, 0.18); border: 1px solid #22D3EE; color: #67e8f9; }
    .badge-purple { background: rgba(168, 85, 247, 0.18); border: 1px solid #A855F7; color: #c084fc; }
    .text { font-size: 15px; color: #cccccc; line-height: 1.6; margin-bottom: 24px; }
    .btn-container { text-align: center; margin: 32px 0; }
    .btn-primary { background: linear-gradient(135deg, #D60000 0%, #b30000 100%); color: #ffffff !important; padding: 16px 36px; border-radius: 12px; font-weight: 800; font-size: 16px; text-decoration: none; display: inline-block; box-shadow: 0 8px 24px rgba(214,0,0,0.4); text-transform: uppercase; letter-spacing: 0.5px; }
    .btn-secondary { background: rgba(255,255,255,0.08); color: #ffffff !important; border: 1px solid rgba(255,255,255,0.15); padding: 14px 28px; border-radius: 10px; font-weight: 700; font-size: 14px; text-decoration: none; display: inline-block; }
    .box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 20px; margin-bottom: 24px; }
    .box-title { font-size: 15px; font-weight: 700; color: #ffffff; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
    .step-item { display: flex; align-items: flex-start; margin-bottom: 12px; font-size: 14px; color: #dddddd; line-height: 1.5; }
    .step-num { background: #D60000; color: #fff; font-size: 12px; font-weight: 900; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0; }
    .plan-card { background: linear-gradient(180deg, rgba(214,0,0,0.1) 0%, rgba(214,0,0,0.02) 100%); border: 1px solid rgba(214,0,0,0.3); border-radius: 14px; padding: 20px; text-align: center; margin-bottom: 20px; }
    .plan-price { font-size: 32px; font-weight: 900; color: #ffffff; margin: 8px 0; }
    .support-box { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; font-size: 13px; color: #888888; text-align: center; line-height: 1.6; }
    .support-box a { color: #ff6666; text-decoration: none; font-weight: 600; }
    .footer { background-color: #080606; padding: 20px; text-align: center; font-size: 12px; color: #555555; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="logo-title">Dale! Te Pido</div>
        <div class="logo-sub">Catálogos & Presupuestos Online</div>
      </div>
      <div class="content">
        ${bodyContent}
        <div class="support-box">
          ¿Tenés alguna consulta o necesitás ayuda con tu tienda?<br/>
          Escribinos directamente a nuestro <a href="https://wa.me/5491122334455" target="_blank">WhatsApp de Soporte</a> o por correo a <a href="mailto:soporte@daletepido.com.ar">soporte@daletepido.com.ar</a>.
        </div>
      </div>
      <div class="footer">
        © 2026 Dale! Te Pido · Tu catálogo online profesional sin comisiones por venta.
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * 1. Correo de Bienvenida / Activación
 */
export function getWelcomeEmail({ storeName, storeId }) {
  const dashboardUrl = `${BASE_URL}/dashboard.html?store=${encodeURIComponent(storeId)}&verify=true`;
  const storeUrl = `${BASE_URL}/index.html?store=${encodeURIComponent(storeId)}`;
  const title = `¡Bienvenido a Dale! Te Pido! Comienza tus 15 días gratis`;

  const bodyContent = `
    <div class="greeting">¡Hola, ${storeName || storeId}! 👋</div>
    <div class="badge badge-red">✨ 15 Días de Prueba Gratuita Activa</div>
    <div class="text">
      Te damos la bienvenida a <strong>Dale! Te Pido</strong>. Tu cuenta ha sido creada exitosamente y ya tenés acceso completo a todas las funciones premium para empezar a recibir pedidos directo en tu WhatsApp.
    </div>

    <div class="btn-container">
      <a href="${dashboardUrl}" target="_blank" class="btn-primary">🚀 Activar Cuenta y Acceder al Dashboard</a>
    </div>

    <div class="box">
      <div class="box-title">⚡ Guía Rápida para Empezar (3 Pasos):</div>
      <div class="step-item">
        <span class="step-num">1</span>
        <div><strong>Cargar tus productos:</strong> Agregá tus primeros ítems con fotos, precios y variantes en la sección Catálogo.</div>
      </div>
      <div class="step-item">
        <span class="step-num">2</span>
        <div><strong>Configurar tu WhatsApp:</strong> Ingresá el número donde querés recibir los pedidos de tus clientes.</div>
      </div>
      <div class="step-item">
        <span class="step-num">3</span>
        <div><strong>Compartir tu link:</strong> Publicá tu catálogo digital (<a href="${storeUrl}" style="color:#ff6666;" target="_blank">${storeUrl}</a>) en tu bio de Instagram y estados de WhatsApp.</div>
      </div>
    </div>
  `;

  return { subject: title, html: getEmailLayout({ title, bodyContent }) };
}

/**
 * 2. Correo de Restablecimiento de Contraseña
 */
export function getResetPasswordEmail({ storeId, resetLink }) {
  const title = `🔑 Restablecer contraseña de tu tienda - Dale! Te Pido`;

  const bodyContent = `
    <div class="greeting">Restablecimiento de Contraseña 🔒</div>
    <div class="badge badge-blue">Seguridad de la Cuenta</div>
    <div class="text">
      Recibimos una solicitud para cambiar la contraseña de acceso al panel de control de tu tienda <strong>${storeId}</strong>.
      <br/><br/>
      Hacé clic en el siguiente botón para definir una nueva clave de acceso segura:
    </div>

    <div class="btn-container">
      <a href="${resetLink || '#'}" target="_blank" class="btn-primary">🔐 Restablecer mi Contraseña</a>
    </div>

    <div class="box" style="border-left: 4px solid #22D3EE;">
      <div class="box-title" style="color:#22D3EE;">ℹ️ Información de Seguridad</div>
      <div style="font-size:13px; color:#bbbbbb; line-height:1.5;">
        • Este enlace es de un solo uso y vencerá por seguridad.<br/>
        • Si no solicitaste restablecer tu contraseña, podés ignorar este correo sin problemas.
      </div>
    </div>
  `;

  return { subject: title, html: getEmailLayout({ title, bodyContent }) };
}

/**
 * 3. Recordatorio 7 Días de Prueba (Quedan 7 Días)
 */
export function getTrialReminder7DaysEmail({ storeName, storeId }) {
  const dashboardUrl = `${BASE_URL}/dashboard.html?store=${encodeURIComponent(storeId)}`;
  const storeUrl = `${BASE_URL}/index.html?store=${encodeURIComponent(storeId)}`;
  const title = `⏳ Te quedan 7 días de prueba en Dale! Te Pido`;

  const bodyContent = `
    <div class="greeting">¡Hola, ${storeName || storeId}! 📊</div>
    <div class="badge badge-blue">🗓️ Día 8 de 15 · Mitad de tu prueba gratis</div>
    <div class="text">
      Ya pasaron 8 días desde que abriste tu catálogo en <strong>Dale! Te Pido</strong>. Te quedan <strong>7 días restantes</strong> para seguir disfrutando sin cargo y sin comisiones por venta.
    </div>

    <div class="box">
      <div class="box-title">📋 Checklist de Éxito para tu Tienda:</div>
      <div class="step-item">
        <span class="step-num">✓</span>
        <div><strong>¿Tus precios están al día?</strong> Revisá tu menú o catálogo para tener todo listo antes del fin de semana.</div>
      </div>
      <div class="step-item">
        <span class="step-num">✓</span>
        <div><strong>¿Publicaste tu link?</strong> Poné el enlace de tu catálogo (<a href="${storeUrl}" style="color:#22D3EE;" target="_blank">${storeUrl}</a>) en tu perfil de Instagram.</div>
      </div>
    </div>

    <div class="btn-container">
      <a href="${dashboardUrl}" target="_blank" class="btn-primary">👉 Ir al Dashboard y Revisar Pedidos</a>
    </div>
  `;

  return { subject: title, html: getEmailLayout({ title, bodyContent }) };
}

/**
 * 4. Recordatorio 12 Días de Prueba (Quedan 3 Días)
 */
export function getTrialReminder3DaysEmail({ storeName, storeId }) {
  const dashboardUrl = `${BASE_URL}/dashboard.html?store=${encodeURIComponent(storeId)}`;
  const title = `⚠️ Quedan solo 3 días de tu prueba gratuita en Dale! Te Pido`;

  const bodyContent = `
    <div class="greeting">¡Atención, ${storeName || storeId}! ⏰</div>
    <div class="badge badge-amber">⚠️ Quedan 3 Días de Prueba Gratuita</div>
    <div class="text">
      Tu período de prueba gratuito finaliza en <strong>3 días</strong>. Asegurá la continuidad de tu tienda online para no interrumpir el flujo de pedidos de tus clientes por WhatsApp.
    </div>

    <div class="plan-card">
      <div style="font-size:14px; font-weight:700; color:#fbbf24; text-transform:uppercase;">Mantendrás todos tus beneficios:</div>
      <div class="plan-price">Catálogo Activo 24/7</div>
      <div style="font-size:14px; color:#dddddd;">Sin comisiones por venta · Pedidos directos a tu WhatsApp</div>
    </div>

    <div class="btn-container">
      <a href="${dashboardUrl}#suscribirse" target="_blank" class="btn-primary" style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); box-shadow: 0 8px 24px rgba(245,158,11,0.4);">⭐ Elegir Plan y Asegurar mi Tienda</a>
    </div>
  `;

  return { subject: title, html: getEmailLayout({ title, bodyContent }) };
}

/**
 * 5. Fin de Prueba y Propuesta de Conversión
 */
export function getTrialEndedEmail({ storeName, storeId }) {
  const dashboardUrl = `${BASE_URL}/dashboard.html?store=${encodeURIComponent(storeId)}`;
  const title = `🔴 Tu prueba ha finalizado - Mantené tu tienda activa en Dale! Te Pido`;

  const bodyContent = `
    <div class="greeting">Tu período de prueba finalizó 🏁</div>
    <div class="badge badge-purple">🚀 Suscribite para Mantener tu Tienda Activa</div>
    <div class="text">
      Esperamos que hayas disfrutado tus 15 días de prueba gratuita en <strong>Dale! Te Pido</strong>. Tu catálogo y productos siguen guardados y listos para seguir vendiendo.
      <br/><br/>
      Elegí uno de nuestros planes accesibles y continuá recibiendo pedidos por WhatsApp sin pagar comisiones sobre tus ventas:
    </div>

    <div class="plan-card" style="border-color: rgba(168,85,247,0.4); background: linear-gradient(180deg, rgba(168,85,247,0.1) 0%, rgba(168,85,247,0.02) 100%);">
      <div style="font-size:13px; font-weight:800; color:#c084fc; text-transform:uppercase; letter-spacing:1px;">Plan Mensual Sin Compromiso</div>
      <div class="plan-price" style="color:#ffffff;">$12.990 <span style="font-size:16px; font-weight:600; color:#aaa;">/mes</span></div>
      <div style="font-size:13px; color:#cccccc; margin-top:8px;">
        ✓ Catálogo online con fotos ilimitadas<br/>
        ✓ Recibí pedidos directo en tu WhatsApp<br/>
        ✓ Dominio y QR personalizado incluidos
      </div>
    </div>

    <div class="btn-container">
      <a href="${dashboardUrl}#suscribirse" target="_blank" class="btn-primary" style="background: linear-gradient(135deg, #A855F7 0%, #7E22CE 100%); box-shadow: 0 8px 24px rgba(168,85,247,0.4);">💎 Activar Suscripción Ahora</a>
    </div>
  `;

  return { subject: title, html: getEmailLayout({ title, bodyContent }) };
}
