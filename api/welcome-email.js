import { getWelcomeEmail, getPlanPaymentInstructionsEmail } from './email-templates.js';

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
    const { store_id, business_name, admin_email, wapp, type, plan_key, plan_level } = req.body || {};

    if (!admin_email || !store_id) {
      return res.status(400).json({ success: false, error: 'Store ID y Email son requeridos' });
    }

    const storeName = business_name || store_id;
    const effectivePlanLevel = (plan_level || (plan_key && plan_key.startsWith('enterprise') ? 'enterprise' : 'starter')).toLowerCase();
    let emailSubject = '';
    let htmlBody = '';

    if (type === 'plan_instructions' || plan_key) {
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

    // Send via Resend API if API Key is configured, fallback to FormSubmit
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Dale! Te Pido <soporte@daletepido.com.ar>';

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
            to: [admin_email],
            subject: emailSubject,
            html: htmlBody
          })
        });
        const resendData = await resendResp.json();
        if (!resendResp.ok) {
          console.error('Error enviando con Resend API:', resendData);
          // Return success true with warning so registration UI is not broken
          return res.status(200).json({
            success: true,
            warning: resendData.message || 'Error con servicio Resend',
            dashboard_url: dashboardUrl,
            store_id: store_id
          });
        } else {
          console.log('Email de bienvenida enviado con Resend ID:', resendData.id);
          return res.status(200).json({
            success: true,
            message: 'Correo de bienvenida enviado exitosamente vía Resend',
            email_id: resendData.id,
            dashboard_url: dashboardUrl,
            store_id: store_id
          });
        }
      } catch (sendErr) {
        console.warn('Advertencia al enviar email vía Resend:', sendErr);
        return res.status(200).json({
          success: true,
          warning: sendErr.message,
          dashboard_url: dashboardUrl,
          store_id: store_id
        });
      }
    } else {
      try {
        await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(admin_email)}`, {
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
      } catch (sendErr) {
        console.warn('Advertencia al enviar email vía FormSubmit:', sendErr);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Correo de bienvenida procesado exitosamente',
      dashboard_url: dashboardUrl,
      store_id: store_id
    });

  } catch (error) {
    console.error('Error sending welcome email:', error);
    return res.status(500).json({ success: false, error: 'Error al enviar el correo de bienvenida' });
  }
}
