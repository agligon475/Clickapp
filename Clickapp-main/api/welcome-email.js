import { getWelcomeEmail, getPlanPaymentInstructionsEmail, getProspectEmail } from './email-templates.js';

// Notificaciones automáticas al Super Admin ante nuevas cuentas
async function notifyAdminNewAccount({ storeId, storeName, email, wapp, planLevel, baseUrl }) {
  const notifications = [];

  // 1. Notificación Push a Móvil vía NTFY.SH (gratuito, sin registro, alta prioridad)
  const ntfyTopic = (process.env.NTFY_TOPIC || 'daletepido-alertas-admin').trim();
  if (ntfyTopic) {
    notifications.push(
      fetch(`https://ntfy.sh/${encodeURIComponent(ntfyTopic)}`, {
        method: 'POST',
        headers: {
          'Title': 'Nueva Cuenta Creada - Dale! Te Pido',
          'Priority': 'high',
          'Tags': 'tada,shopping_bags,bell',
          'Click': `${baseUrl}/super-admin-secret-dashboard.html`
        },
        body: `Comercio: ${storeName} (${storeId})\nEmail: ${email}\nWhatsApp: ${wapp || 'Sin especificar'}\nPlan: ${planLevel}\nDashboard: ${baseUrl}/dashboard.html?store=${storeId}`
      }).catch(err => console.warn('ntfy push alert error:', err.message))
    );
  }

  // 2. Notificación vía Telegram Bot (si está configurado)
  const tgToken = process.env.TELEGRAM_BOT_TOKEN;
  const tgChatId = process.env.TELEGRAM_CHAT_ID;
  if (tgToken && tgChatId) {
    const tgText = `🚀 *¡Nueva Tienda Creada en Dale! Te Pido!*\n\n` +
      `🏬 *Nombre:* ${storeName}\n` +
      `🆔 *ID:* \`${storeId}\`\n` +
      `✉️ *Email:* ${email}\n` +
      `📱 *WhatsApp:* ${wapp || 'No indicado'}\n` +
      `💎 *Plan:* ${planLevel}\n\n` +
      `🔗 [Ver en SuperAdmin](${baseUrl}/super-admin-secret-dashboard.html)`;

    notifications.push(
      fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: tgChatId,
          text: tgText,
          parse_mode: 'Markdown'
        })
      }).catch(err => console.warn('Telegram alert error:', err.message))
    );
  }

  // 3. Notificación vía Email al Administrador
  const adminAlertEmail = process.env.ADMIN_ALERT_EMAIL || 'daletepido@gmail.com';
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Dale! Te Pido <soporte@daletepido.com.ar>';

  if (adminAlertEmail && resendApiKey) {
    notifications.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [adminAlertEmail],
          subject: `[Alerta SuperAdmin] 🎉 Nueva tienda registrada: ${storeName} (${storeId})`,
          html: `
            <div style="font-family:sans-serif;max-width:560px;margin:auto;padding:24px;border:1px solid #e2e8f0;border-radius:12px;background:#ffffff;">
              <h2 style="color:#e11d48;margin-top:0;">🎉 ¡Nueva Cuenta Registrada!</h2>
              <p style="color:#334155;font-size:15px;">Se ha registrado una nueva tienda en la plataforma:</p>
              <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;">
                <tr><td style="padding:8px;border-bottom:1px solid #f1f5f9;font-weight:600;color:#64748b;">Comercio:</td><td style="padding:8px;border-bottom:1px solid #f1f5f9;font-weight:bold;color:#0f172a;">${storeName}</td></tr>
                <tr><td style="padding:8px;border-bottom:1px solid #f1f5f9;font-weight:600;color:#64748b;">Store ID:</td><td style="padding:8px;border-bottom:1px solid #f1f5f9;color:#0f172a;">${storeId}</td></tr>
                <tr><td style="padding:8px;border-bottom:1px solid #f1f5f9;font-weight:600;color:#64748b;">Email Admin:</td><td style="padding:8px;border-bottom:1px solid #f1f5f9;color:#0f172a;">${email}</td></tr>
                <tr><td style="padding:8px;border-bottom:1px solid #f1f5f9;font-weight:600;color:#64748b;">WhatsApp:</td><td style="padding:8px;border-bottom:1px solid #f1f5f9;color:#0f172a;">${wapp || 'Sin indicar'}</td></tr>
                <tr><td style="padding:8px;border-bottom:1px solid #f1f5f9;font-weight:600;color:#64748b;">Nivel / Plan:</td><td style="padding:8px;border-bottom:1px solid #f1f5f9;color:#0f172a;text-transform:uppercase;">${planLevel}</td></tr>
              </table>
              <div style="margin-top:20px;">
                <a href="${baseUrl}/super-admin-secret-dashboard.html" style="background:#e11d48;color:#fff;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:600;display:inline-block;">Ir al Super Admin Dashboard</a>
              </div>
            </div>
          `
        })
      }).catch(err => console.warn('Admin email alert error:', err.message))
    );
  }

  await Promise.allSettled(notifications);
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      store_id,
      business_name,
      admin_email,
      wapp,
      type,
      plan_key,
      plan_level,
      // Lead / prospect outreach fields
      prospect_email,
      prospect_name,
      subject: customSubject,
      badge_text,
      greeting: customGreeting,
      body_text,
      btn_text,
      btn_url,
      extra_notes
    } = req.body || {};

    const targetEmail = admin_email || prospect_email;

    if (!targetEmail) {
      return res.status(400).json({ success: false, error: 'El email de destino es requerido' });
    }

    const storeName = business_name || prospect_name || store_id || '';
    const effectivePlanLevel = (plan_level || (plan_key && plan_key.startsWith('enterprise') ? 'enterprise' : 'starter')).toLowerCase();
    let emailSubject = '';
    let htmlBody = '';

    if (type === 'prospect') {
      const emailObj = getProspectEmail({
        prospectName: prospect_name || storeName,
        subject: customSubject,
        badgeText: badge_text,
        greetingText: customGreeting,
        bodyText: body_text,
        ctaText: btn_text,
        ctaUrl: btn_url,
        extraNotes: extra_notes
      });
      emailSubject = emailObj.subject;
      htmlBody = emailObj.html;
    } else if (type === 'plan_instructions' || plan_key) {
      const emailObj = getPlanPaymentInstructionsEmail({ storeName, storeId: store_id, planKey: plan_key || 'starter_mensual' });
      emailSubject = emailObj.subject;
      htmlBody = emailObj.html;
    } else {
      const emailObj = getWelcomeEmail({ storeName, storeId: store_id, planLevel: effectivePlanLevel });
      emailSubject = emailObj.subject;
      htmlBody = emailObj.html;
    }

    const host = req.headers['x-forwarded-host'] || req.headers.host || 'daletepido.com.ar';
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const baseUrl = `${protocol}://${host}`;
    const dashboardUrl = `${baseUrl}/dashboard.html?store=${encodeURIComponent(store_id)}&verify=true`;
    const storeUrl = `${baseUrl}/index.html?store=${encodeURIComponent(store_id)}`;

    // Envío del correo al cliente (Resend con fallback a FormSubmit)
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Dale! Te Pido <soporte@daletepido.com.ar>';
    let clientEmailSent = false;
    let clientEmailWarning = null;
    let clientEmailId = null;

    if (resendApiKey) {
      try {
        const resendResp = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [targetEmail],
            subject: emailSubject,
            html: htmlBody
          })
        });
        const resendData = await resendResp.json();
        if (resendResp.ok) {
          clientEmailSent = true;
          clientEmailId = resendData.id;
          console.log('Email de bienvenida enviado con Resend ID:', resendData.id);
        } else {
          console.warn('Resend API no pudo enviar correo al cliente:', resendData.message);
          clientEmailWarning = resendData.message || 'Error con servicio Resend';
        }
      } catch (sendErr) {
        console.warn('Error al conectar con Resend:', sendErr.message);
        clientEmailWarning = sendErr.message;
      }
    }

    // Fallback mediante FormSubmit si Resend no está configurado o si devolvió error
    if (!clientEmailSent) {
      try {
        await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: emailSubject,
            _template: 'table',
            Mensaje: `¡Bienvenido a DTP! Tu tienda "${storeName}" ha sido creada exitosamente.`,
            Dashboard: dashboardUrl,
            Tienda: storeUrl,
            Prueba: '15 días gratis sin compromiso',
            WhatsApp: wapp || '-'
          })
        });
        clientEmailSent = true;
      } catch (sendErr) {
        console.warn('Advertencia al enviar email vía FormSubmit:', sendErr.message);
      }
    }

    // Notificar SIEMPRE al Super Admin por Push móvil (ntfy) / Email / Telegram si es una nueva cuenta
    if (type !== 'prospect') {
      try {
        await notifyAdminNewAccount({
          storeId: store_id,
          storeName,
          email: targetEmail,
          wapp,
          planLevel: effectivePlanLevel,
          baseUrl
        });
      } catch (notifyErr) {
        console.warn('Advertencia en notificación de admin:', notifyErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Correo de bienvenida y notificación de admin procesados exitosamente',
      email_sent: clientEmailSent,
      email_id: clientEmailId,
      warning: clientEmailWarning,
      dashboard_url: dashboardUrl,
      store_id: store_id
    });

  } catch (error) {
    console.error('Error sending welcome email:', error);
    return res.status(500).json({ success: false, error: 'Error al enviar el correo de bienvenida' });
  }
}
