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
    const { store_id, business_name, admin_email, wapp } = req.body || {};

    if (!admin_email || !store_id) {
      return res.status(400).json({ success: false, error: 'Store ID y Email son requeridos' });
    }

    const storeName = business_name || store_id;
    const dashboardUrl = `https://daletepido.com.ar/dashboard.html?store=${encodeURIComponent(store_id)}`;
    const storeUrl = `https://daletepido.com.ar/index.html?store=${encodeURIComponent(store_id)}`;

    const emailSubject = `¡Bienvenido a DTP! Comienza tus 15 días de prueba gratuita`;

    const htmlBody = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenido a Dale! Te Pido</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0f0d0d; color: #ffffff; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background-color: #1a1515; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
          .header { background: linear-gradient(135deg, #D60000 0%, #800000 100%); padding: 32px 24px; text-align: center; }
          .header img { max-height: 48px; margin-bottom: 12px; }
          .header h1 { color: #ffffff; font-size: 24px; margin: 0; font-weight: 800; text-transform: uppercase; letter-spacing: -0.5px; }
          .content { padding: 32px 24px; }
          .greeting { font-size: 20px; font-weight: 700; color: #ffffff; margin-bottom: 16px; }
          .text { font-size: 15px; color: #cccccc; line-height: 1.6; margin-bottom: 24px; }
          .badge-trial { display: inline-block; background: rgba(214, 0, 0, 0.2); border: 1px solid #D60000; color: #ff6666; font-size: 13px; font-weight: 700; padding: 6px 16px; border-radius: 50px; margin-bottom: 24px; }
          .btn-container { text-align: center; margin: 32px 0; }
          .btn-primary { background-color: #D60000; color: #ffffff !important; padding: 16px 32px; border-radius: 10px; font-weight: 700; font-size: 16px; text-decoration: none; display: inline-block; box-shadow: 0 8px 24px rgba(214,0,0,0.4); }
          .steps-box { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; margin-bottom: 24px; }
          .steps-title { font-size: 16px; font-weight: 700; color: #ffffff; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.05em; }
          .step-item { display: flex; align-items: flex-start; margin-bottom: 12px; font-size: 14px; color: #dddddd; }
          .step-num { background: #D60000; color: #fff; font-size: 12px; font-weight: 800; width: 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0; }
          .support-box { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; font-size: 13px; color: #888888; text-align: center; }
          .support-box a { color: #ff6666; text-decoration: none; font-weight: 600; }
          .footer { background-color: #0b0909; padding: 20px; text-align: center; font-size: 12px; color: #666666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Dale! Te Pido</h1>
          </div>
          <div class="content">
            <div class="greeting">¡Hola, ${storeName}! 👋</div>
            <div class="badge-trial">✨ 15 Días de Prueba Gratuita Activa</div>
            <div class="text">
              Te damos la bienvenida a <strong>Dale! Te Pido</strong>. Tu cuenta ha sido creada con éxito y ya tenés acceso completo e inmediato a tu Dashboard sin ningún tipo de compromiso.
              <br/><br/>
              Hacé clic en el siguiente botón para activar y verificar tu cuenta de correo electrónicoy acceder directo al panel de control:
            </div>

            <div class="btn-container">
              <a href="${dashboardUrl}&verify=true" target="_blank" class="btn-primary">🚀 Activar Cuenta y Acceder al Dashboard</a>
            </div>

            <div class="steps-box">
              <div class="steps-title">Guía Rápida para Empezar (3 Pasos):</div>
              <div class="step-item">
                <span class="step-num">1</span>
                <div><strong>Cargar tus productos:</strong> Agregá tus primeros ítems con fotos, precios y descripciones en la sección Catálogo.</div>
              </div>
              <div class="step-item">
                <span class="step-num">2</span>
                <div><strong>Personalizar tu tienda:</strong> Ajustá los colores, banners y horarios de atención.</div>
              </div>
              <div class="step-item">
                <span class="step-num">3</span>
                <div><strong>Compartir tu enlace:</strong> Publicá el link de tu catálogo (<a href="${storeUrl}" style="color:#ff6666;">${storeUrl}</a>) en tu Instagram y WhatsApp.</div>
              </div>
            </div>

            <div class="support-box">
              ¿Tenés alguna consulta o necesitás ayuda para configurar tu catálogo?<br/>
              Escribinos directamente a nuestro WhatsApp de soporte o por email a <a href="mailto:soporte@daletepido.com.ar">soporte@daletepido.com.ar</a>.
            </div>
          </div>
          <div class="footer">
            © 2026 Dale! Te Pido · Catálogos y Presupuestos Online sin comisiones.
          </div>
        </div>
      </body>
      </html>
    `;

    // Send via Resend API if API Key is configured, fallback to FormSubmit
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Dale! Te Pido <onboarding@resend.dev>';

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
        } else {
          console.log('Email de bienvenida enviado con Resend ID:', resendData.id);
        }
      } catch (sendErr) {
        console.warn('Advertencia al enviar email vía Resend:', sendErr);
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
      message: 'Correo de bienvenida enviado exitosamente',
      store_id: store_id
    });

  } catch (error) {
    console.error('Error sending welcome email:', error);
    return res.status(500).json({ success: false, error: 'Error al enviar el correo de bienvenida' });
  }
}
