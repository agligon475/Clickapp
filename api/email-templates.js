/**
 * Plantillas de Correo HTML para Dale! Te Pido
 */

const BASE_URL = 'https://daletepido.com.ar';

export function getEmailLayout({ title, bodyContent }) {
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
    .badge-green { background: rgba(16, 185, 129, 0.18); border: 1px solid #10B981; color: #34d399; }
    .text { font-size: 15px; color: #cccccc; line-height: 1.6; margin-bottom: 24px; }
    .btn-container { text-align: center; margin: 28px 0; }
    .btn-primary { background: linear-gradient(135deg, #D60000 0%, #b30000 100%); color: #ffffff !important; padding: 16px 36px; border-radius: 12px; font-weight: 800; font-size: 16px; text-decoration: none; display: inline-block; box-shadow: 0 8px 24px rgba(214,0,0,0.4); text-transform: uppercase; letter-spacing: 0.5px; }
    .btn-secondary { background: rgba(255,255,255,0.06); color: #ffffff !important; border: 1px solid rgba(255,255,255,0.15); padding: 14px 28px; border-radius: 10px; font-weight: 700; font-size: 14px; text-decoration: none; display: inline-block; margin-top: 10px; }
    .box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 20px; margin-bottom: 24px; }
    .box-title { font-size: 15px; font-weight: 700; color: #ffffff; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
    .step-item { display: flex; align-items: flex-start; margin-bottom: 12px; font-size: 14px; color: #dddddd; line-height: 1.5; }
    .step-num { background: #D60000; color: #fff; font-size: 12px; font-weight: 900; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0; }
    .plan-card { background: linear-gradient(180deg, rgba(214,0,0,0.1) 0%, rgba(214,0,0,0.02) 100%); border: 1px solid rgba(214,0,0,0.3); border-radius: 14px; padding: 20px; text-align: center; margin-bottom: 20px; }
    .plan-price { font-size: 32px; font-weight: 900; color: #ffffff; margin: 8px 0; }
    .qr-card { text-align: center; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 20px; margin-bottom: 24px; }
    .qr-card img { width: 160px; height: 160px; border-radius: 10px; background: #fff; padding: 8px; margin: 12px 0; }
    .support-box { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; font-size: 13px; color: #888888; text-align: center; line-height: 1.6; }
    .support-box a { color: #ff6666; text-decoration: none; font-weight: 600; }
    .footer { background-color: #080606; padding: 20px; text-align: center; font-size: 12px; color: #555555; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <img src="https://res.cloudinary.com/deuog0r34/image/upload/v1778811606/daletepido-logo-white_zpcolq.png" alt="Dale Te Pido" style="max-width: 220px; width: 80%; height: auto; display: block; margin: 0 auto;">
        <div class="logo-sub" style="margin-top: 8px;">Catálogos & Presupuestos Online</div>
      </div>
      <div class="content">
        ${bodyContent}
        <div class="support-box">
          ¿Tenés alguna consulta o necesitás ayuda con tu tienda?<br/>
          Escribinos por correo a <a href="mailto:soporte@daletepido.com.ar">soporte@daletepido.com.ar</a>.
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
 * Helper para generar el recuadro sobre el Servicio de Setup (Bonificado para Enterprise, $35.000 ARS para Starter/Pro)
 */
export function getSetupNoticeBox(planLevel = 'starter') {
  const isEnterprise = String(planLevel || '').toLowerCase().includes('enterprise');

  if (isEnterprise) {
    return `
    <div class="box" style="border-left: 4px solid #10B981; background: rgba(16, 185, 129, 0.05); margin-top: 20px;">
      <div class="box-title" style="color: #34d399;">🎁 Servicio de Setup & Carga Asistida Incluido</div>
      <div style="font-size: 13.5px; color: #dddddd; line-height: 1.6;">
        ¡Felicitaciones! Por contar con tu <strong>Membresía Enterprise</strong>, el servicio completo de setup y carga inicial de tu catálogo está <strong>100% Bonificado</strong> (incluido sin cargo adicional). Nuestro equipo de soporte especializado se pondrá en contacto con vos para asistirte en la configuración.
      </div>
    </div>`;
  }

  return `
  <div class="box" style="border-left: 4px solid #22D3EE; background: rgba(34, 211, 238, 0.05); margin-top: 20px;">
    <div class="box-title" style="color: #67e8f9;">🛠️ Servicio Opcional de Setup & Carga de Tienda</div>
    <div style="font-size: 13.5px; color: #dddddd; line-height: 1.6;">
      Si deseás que nuestro equipo profesional se encargue de la configuración inicial y la carga de tus productos por vos, podés contratar nuestro servicio asistido de setup por un costo de <strong>$35.000 ARS</strong>. Si te interesa sumarlo a tu cuenta, respondé a este correo o escribinos por WhatsApp.
    </div>
  </div>`;
}

/**
 * 1. Correo de Bienvenida / Verificación de Email
 */
export function getWelcomeEmail({ storeName, storeId, planLevel = 'starter' }) {
  const dashboardUrl = `${BASE_URL}/dashboard.html?store=${encodeURIComponent(storeId)}&verify=true`;
  const storeUrl = `${BASE_URL}/index.html?store=${encodeURIComponent(storeId)}`;
  const title = `¡Bienvenido a Dale! Te Pido! Comienza tus 15 días gratis`;

  const setupBoxHtml = getSetupNoticeBox(planLevel);

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

    ${setupBoxHtml}
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
 * 3. Recordatorio 7 Días de Prueba (Quedan 7 Días) - Con QR y CTA Secundario
 */
export function getTrialReminder7DaysEmail({ storeName, storeId }) {
  const dashboardUrl = `${BASE_URL}/dashboard.html?store=${encodeURIComponent(storeId)}`;
  const storeUrl = `${BASE_URL}/index.html?store=${encodeURIComponent(storeId)}`;
  const qrUrl = `${BASE_URL}/api/qr?store=${encodeURIComponent(storeId)}`;
  const title = `⏳ Te quedan 7 días de prueba en Dale! Te Pido`;

  const bodyContent = `
    <div class="greeting">¡Hola, ${storeName || storeId}! 📊</div>
    <div class="badge badge-blue">🗓️ Día 8 de 15 · Mitad de tu prueba gratis</div>
    <div class="text">
      Ya pasaron 8 días desde que abriste tu catálogo en <strong>Dale! Te Pido</strong>. Te quedan <strong>7 días restantes</strong> para seguir disfrutando sin cargo y sin comisiones por venta.
    </div>

    <div class="qr-card">
      <div style="font-size:14px; font-weight:700; color:#ffffff; text-transform:uppercase;">Tu Catálogo y Código QR Oficial</div>
      <div style="font-size:13px; color:#22D3EE; margin-top:4px;"><a href="${storeUrl}" target="_blank" style="color:#22D3EE;">${storeUrl}</a></div>
      <img src="${qrUrl}" alt="Código QR de la Tienda" />
      <div style="font-size:12px; color:#aaaaaa;">Imprimí tu QR o descargalo desde tu Dashboard para tus mesas y mostrador.</div>
    </div>

    <div class="btn-container">
      <a href="${dashboardUrl}" target="_blank" class="btn-primary">👉 Ir al Dashboard y Revisar Pedidos</a>
      <br/>
      <a href="${dashboardUrl}#suscribirse" target="_blank" class="btn-secondary">¿Ya estás listo para tener tu membresía?</a>
    </div>
  `;

  return { subject: title, html: getEmailLayout({ title, bodyContent }) };
}

/**
 * 4. Recordatorio 12 Días de Prueba (Quedan 3 Días) - Con QR y CTA Secundario
 */
export function getTrialReminder3DaysEmail({ storeName, storeId }) {
  const dashboardUrl = `${BASE_URL}/dashboard.html?store=${encodeURIComponent(storeId)}`;
  const storeUrl = `${BASE_URL}/index.html?store=${encodeURIComponent(storeId)}`;
  const qrUrl = `${BASE_URL}/api/qr?store=${encodeURIComponent(storeId)}`;
  const title = `⚠️ Quedan solo 3 días de tu prueba gratuita en Dale! Te Pido`;

  const bodyContent = `
    <div class="greeting">¡Atención, ${storeName || storeId}! ⏰</div>
    <div class="badge badge-amber">⚠️ Quedan 3 Días de Prueba Gratuita</div>
    <div class="text">
      Tu período de prueba gratuito finaliza en <strong>3 días</strong>. Asegurá la continuidad de tu tienda online para no interrumpir el flujo de pedidos de tus clientes por WhatsApp.
    </div>

    <div class="qr-card">
      <div style="font-size:14px; font-weight:700; color:#ffffff; text-transform:uppercase;">Enlace y QR de tu Tienda:</div>
      <div style="font-size:13px; color:#fbbf24; margin-top:4px;"><a href="${storeUrl}" target="_blank" style="color:#fbbf24;">${storeUrl}</a></div>
      <img src="${qrUrl}" alt="Código QR de la Tienda" />
    </div>

    <div class="plan-card">
      <div style="font-size:14px; font-weight:700; color:#fbbf24; text-transform:uppercase;">Mantendrás todos tus beneficios:</div>
      <div class="plan-price">Catálogo Activo 24/7</div>
      <div style="font-size:14px; color:#dddddd;">Sin comisiones por venta · Pedidos directos a tu WhatsApp</div>
    </div>

    <div class="btn-container">
      <a href="${dashboardUrl}#suscribirse" target="_blank" class="btn-primary" style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); box-shadow: 0 8px 24px rgba(245,158,11,0.4);">⭐ Elegir Plan y Asegurar mi Tienda</a>
      <br/>
      <a href="${dashboardUrl}#suscribirse" target="_blank" class="btn-secondary">¿Ya estás listo para tener tu membresía?</a>
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

/**
 * 6. NUEVO: Correo de Confirmación / Activación de Cuenta (Con enlace a Base de Conocimiento)
 */
export function getAccountActivatedEmail({ storeName, storeId, planLevel = 'starter' }) {
  const ayudaUrl = `${BASE_URL}/ayuda`;
  const dashboardUrl = `${BASE_URL}/dashboard.html?store=${encodeURIComponent(storeId)}`;
  const title = `✅ ¡Tu cuenta en Dale! Te Pido está activa y lista para vender!`;
  const setupBoxHtml = getSetupNoticeBox(planLevel);

  const bodyContent = `
    <div class="greeting">¡Cuenta Confirmada, ${storeName || storeId}! 🎉</div>
    <div class="badge badge-green">✓ Verificación Completada</div>
    <div class="text">
      ¡Excelente! Tu correo electrónico ha sido verificado con éxito y tu catálogo digital ya se encuentra 100% activo en internet.
      <br/><br/>
      Para ayudarte a sacar el máximo provecho de tu tienda, ponemos a tu disposición nuestra <strong>Base de Conocimientos y Centro de Ayuda</strong> con guías paso a paso:
    </div>

    <div class="btn-container">
      <a href="${ayudaUrl}" target="_blank" class="btn-primary" style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); box-shadow: 0 8px 24px rgba(16,185,129,0.4);">📖 Explorar Base de Conocimientos</a>
      <br/>
      <a href="${dashboardUrl}" target="_blank" class="btn-secondary">Ir a mi Panel de Control</a>
    </div>

    <div class="box">
      <div class="box-title">📚 Temas Populares en la Base de Conocimiento:</div>
      <div class="step-item">
        <span class="step-num">•</span>
        <div><strong>Configurar tu WhatsApp de ventas:</strong> Asegurate de recibir los pedidos directamente.</div>
      </div>
      <div class="step-item">
        <span class="step-num">•</span>
        <div><strong>Imprimir y descargar tu Código QR:</strong> Ponelo en las mesas, bolsas o mostrador.</div>
      </div>
      <div class="step-item">
        <span class="step-num">•</span>
        <div><strong>Cargar categorías y opciones:</strong> Agregá combos, tamaños y extras a tus platos.</div>
      </div>
    </div>

    ${setupBoxHtml}
  `;

  return { subject: title, html: getEmailLayout({ title, bodyContent }) };
}

/**
 * 7. NUEVO: Beneficio de Pago Anual + Solicitud de Reseña (Para clientes mensuales)
 */
export function getAnnualBenefitAndReviewEmail({ storeName, storeId }) {
  const dashboardUrl = `${BASE_URL}/dashboard.html?store=${encodeURIComponent(storeId)}#suscribirse`;
  const reviewUrl = `${BASE_URL}/dejar-resena.html?store=${encodeURIComponent(storeId)}`;
  const title = `🎁 Obtené 2 meses gratis al cambiar a tu Plan Anual en Dale! Te Pido`;

  const bodyContent = `
    <div class="greeting">¡Hola, ${storeName || storeId}! 🎁</div>
    <div class="badge badge-purple">⭐ Beneficio Exclusivo para Clientes</div>
    <div class="text">
      Queremos agradecerte por formar parte de <strong>Dale! Te Pido</strong>. Como cliente de nuestro plan mensual, tenés disponible un descuento especial al cambiar a la membresía anual:
    </div>

    <div class="plan-card" style="border-color: rgba(168,85,247,0.4); background: linear-gradient(180deg, rgba(168,85,247,0.15) 0%, rgba(168,85,247,0.03) 100%);">
      <div style="font-size:13px; font-weight:800; color:#c084fc; text-transform:uppercase;">Ahorro del 20% · 2 Meses Gratis</div>
      <div class="plan-price" style="color:#ffffff;">Plan Anual Preferencial</div>
      <div style="font-size:13px; color:#cccccc; margin-top:6px;">
        Pagá 10 meses y disfrutá 12 meses de servicio ininterrumpido sin comisiones.
      </div>
    </div>

    <div class="btn-container">
      <a href="${dashboardUrl}" target="_blank" class="btn-primary" style="background: linear-gradient(135deg, #A855F7 0%, #7E22CE 100%); box-shadow: 0 8px 24px rgba(168,85,247,0.4);">💎 Cambiar a Plan Anual y Ahorrar</a>
    </div>

    <div class="box" style="border-left: 4px solid #F59E0B; background: rgba(245,158,11,0.04);">
      <div class="box-title" style="color:#F59E0B;">⭐ Tu opinión es muy importante para nosotros</div>
      <div style="font-size:14px; color:#dddddd; line-height:1.6; margin-bottom:14px;">
        ¿Cómo ha sido tu experiencia vendiendo con Dale! Te Pido? Nos encantaría contar con tu reseña para seguir mejorando la plataforma.
      </div>
      <div style="text-align:center;">
        <a href="${reviewUrl}" target="_blank" class="btn-secondary" style="border-color:#F59E0B; color:#fbbf24 !important;">⭐ Dejar mi Opinión / Reseña</a>
      </div>
    </div>
  `;

  return { subject: title, html: getEmailLayout({ title, bodyContent }) };
}

/**
 * 8. NUEVO: Instrucciones de Pago para los 6 Planes (Starter, Pro, Enterprise x Mensual, Anual)
 */
export const PLAN_DETAILS = {
  starter_mensual: {
    name: 'Plan Starter',
    period: 'mensual',
    amount: '$19.900',
    planLevel: 'starter'
  },
  starter_anual: {
    name: 'Plan Starter',
    period: 'anual',
    amount: '$199.000',
    planLevel: 'starter'
  },
  pro_mensual: {
    name: 'Plan Pro',
    period: 'mensual',
    amount: '$29.900',
    planLevel: 'pro'
  },
  pro_anual: {
    name: 'Plan Pro',
    period: 'anual',
    amount: '$299.000',
    planLevel: 'pro'
  },
  enterprise_mensual: {
    name: 'Plan Enterprise',
    period: 'mensual',
    amount: '$59.900',
    planLevel: 'enterprise'
  },
  enterprise_anual: {
    name: 'Plan Enterprise',
    period: 'anual',
    amount: '$599.000',
    planLevel: 'enterprise'
  }
};

export function getPlanPaymentInstructionsEmail({ storeName, storeId, planKey = 'starter_mensual' }) {
  const planInfo = PLAN_DETAILS[planKey] || PLAN_DETAILS.starter_mensual;
  const receiptPageUrl = `${BASE_URL}/enviar-comprobante.html?store=${encodeURIComponent(storeId)}&plan=${encodeURIComponent(planKey)}`;
  const title = `Instrucciones de Pago: ${planInfo.name} (${planInfo.period})`;
  const setupBoxHtml = getSetupNoticeBox(planInfo.planLevel);

  const bodyContent = `
    <div class="greeting">¡Hola, ${storeName || storeId}! 👋</div>
    <div class="badge badge-red">🚀 Mejora de Plan Solicitada</div>
    
    <div class="text">
      ¡Ya estás decidido a dar el paso con tu <strong>${planInfo.name}</strong>!
      <br/><br/>
      Para poder activar tu mejora de plan, necesitamos que realices el pago de <strong>${planInfo.amount}</strong> por el período <strong>${planInfo.period}</strong> a los datos que te pasamos a continuación:
    </div>

    <div class="box" style="border-left: 4px solid #D60000; background: rgba(214,0,0,0.04);">
      <div class="box-title" style="color:#ffffff;">📋 Datos para la Transferencia / Pago:</div>
      <div class="step-item" style="margin-bottom:8px;">
        <div><strong>Datos de cuenta CVU/CBU:</strong> <span style="font-family:monospace; font-size:15px; color:#ff6666; font-weight:700;">0000076500000014269976</span></div>
      </div>
      <div class="step-item" style="margin-bottom:8px;">
        <div><strong>Propietario de la cuenta:</strong> Agustin Licari Gonzalez</div>
      </div>
      <div class="step-item">
        <div><strong>Monto del pago:</strong> <span style="font-size:16px; font-weight:800; color:#ffffff;">${planInfo.amount}</span> (${planInfo.period})</div>
      </div>
    </div>

    <div class="text">
      Una vez realizado el pago, te solicitamos nos envíes el comprobante de la operación al siguiente enlace:
    </div>

    <div class="btn-container">
      <a href="${receiptPageUrl}" target="_blank" class="btn-primary">📤 Adjuntar Comprobante de Pago aquí →</a>
    </div>

    ${setupBoxHtml}

    <div class="box" style="border-left: 4px solid #F59E0B; background: rgba(245,158,11,0.04); margin-top:16px;">
      <div style="font-size:13px; color:#dddddd; line-height:1.6;">
        💡 <strong>Recomendación:</strong> Te recomendamos tener los datos de facturación cargados correctamente en tu Dashboard para poder enviarte el comprobante de pago oficial.
      </div>
    </div>

    <div class="text" style="margin-top:20px; font-weight:600; color:#ffffff;">
      Muchas gracias por confiar en Dale! Te Pido.
    </div>
  `;

  return { subject: `Instrucciones de Pago: ${planInfo.name} - Dale! Te Pido`, html: getEmailLayout({ title, bodyContent }) };
}

/**
 * Correo de Prospección / Venta a Nuevos Posibles Clientes (Leads)
 */
export function getProspectEmail({
  prospectName = '',
  subject = 'Potenciá tus ventas por WhatsApp con tu propio Catálogo Digital sin comisiones',
  badgeText = '🚀 INVITACIÓN EXCLUSIVA',
  greetingText = '',
  bodyText = '',
  ctaText = 'Crear mi Tienda Gratis Ahora →',
  ctaUrl = 'https://daletepido.com.ar/alta-usuario.html',
  extraNotes = ''
}) {
  const greeting = greetingText || `¡Hola${prospectName ? ' ' + prospectName : ''}! 👋`;
  const defaultBody = bodyText || `
    Nos comunicamos de parte de <strong>Dale! Te Pido</strong> para presentarte la solución definitiva para impulsar las ventas de tu negocio.<br/><br/>
    Con tu propio <strong>Catálogo Digital Interactivo</strong> podrás:
    <ul>
      <li>📲 Recibir pedidos directos a tu WhatsApp con resumen de productos, precios y datos del cliente.</li>
      <li>🏷️ Cargar productos ilimitados con fotos, categorías, subrubros y marca de agua automática.</li>
      <li>🛵 Gestionar repartidores y cadetes con asignación de envíos en tiempo real.</li>
      <li>⚡ Cero comisiones por venta: todo lo que vendés es 100% tuyo.</li>
    </ul>
    ¡Podés crear y probar tu catálogo completamente gratis en menos de 2 minutos!
  `;

  const title = subject || 'Propuesta Especial de Dale! Te Pido';

  const bodyContent = `
    <div class="greeting">${greeting}</div>
    <div class="badge badge-purple">${badgeText || '🚀 INVITACIÓN EXCLUSIVA'}</div>
    
    <div class="text">
      ${defaultBody}
    </div>

    <div class="btn-container" style="margin: 32px 0;">
      <a href="${ctaUrl || 'https://daletepido.com.ar/alta-usuario.html'}" target="_blank" class="btn-primary" style="font-size:16px; padding:16px 36px;">${ctaText || 'Crear mi Tienda Gratis Ahora →'}</a>
    </div>

    ${extraNotes ? `
    <div class="box" style="border-left: 4px solid #A855F7; background: rgba(168,85,247,0.05); margin-top: 20px;">
      <div style="font-size:13.5px; color:#dddddd; line-height:1.6;">
        ${extraNotes}
      </div>
    </div>` : ''}

    <div class="box" style="border-left: 4px solid #22D3EE; background: rgba(34, 211, 238, 0.05); margin-top: 20px;">
      <div class="box-title" style="color: #67e8f9;">🎁 Prueba Gratuita y Asesoramiento Sin Cargo</div>
      <div style="font-size: 13.5px; color: #dddddd; line-height: 1.6;">
        Si querés ver una demostración en vivo o tenés alguna duda sobre la configuración, simplemente respondé a este correo o escribinos por WhatsApp. Estaremos encantados de ayudarte.
      </div>
    </div>

    <div class="text" style="margin-top:20px; font-weight:600; color:#ffffff;">
      Te esperamos en Dale! Te Pido.
    </div>
  `;

  return { subject: title, html: getEmailLayout({ title, bodyContent }) };
}

/**
 * 9. Correo de Seguimiento Día 2: Redes Sociales y Enlace de Catálogo en Bio
 */
export function getFollowUpDay2Email({ storeName, storeId }) {
  const dashboardUrl = `${BASE_URL}/dashboard.html?store=${encodeURIComponent(storeId)}`;
  const storeUrl = `${BASE_URL}/index.html?store=${encodeURIComponent(storeId)}`;
  const title = `📲 Sumá tu catálogo a tus Redes Sociales y multiplicá tus pedidos - Dale! Te Pido`;

  const bodyContent = `
    <div class="greeting">¡Hola, ${storeName || storeId}! 🚀</div>
    <div class="badge badge-purple">📱 Seguimiento Día 2 · Redes Sociales</div>
    <div class="text">
      Ya diste los primeros pasos configurando tu catálogo digital en <strong>Dale! Te Pido</strong>. Ahora llega el momento clave: <strong>hacerlo visible para todos tus clientes y seguidores</strong>.
      <br/><br/>
      Desde tu panel de control podés conectar tus redes oficiales (<strong>Instagram, Facebook, TikTok y tu ubicación en Google Maps</strong>). De este modo, quienes visiten tu catálogo podrán seguirte y encontrarte al instante.
    </div>

    <div class="box" style="border-left: 4px solid #A855F7; background: rgba(168,85,247,0.05);">
      <div class="box-title" style="color: #c084fc;">💡 El paso más importante: Publicar el enlace de tu tienda</div>
      <div style="font-size: 14px; color: #dddddd; line-height: 1.6;">
        Tu enlace oficial es:<br/>
        <div style="margin: 8px 0; background: rgba(0,0,0,0.4); padding: 8px 12px; border-radius: 8px; font-family: monospace; font-size: 14px; color: #22D3EE; word-break: break-all;">
          <a href="${storeUrl}" target="_blank" style="color: #22D3EE; text-decoration: none;">${storeUrl}</a>
        </div>
        <strong>¿Dónde compartirlo hoy mismo?</strong>
        <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #cccccc;">
          <li><strong>Biografía de Instagram:</strong> En "Editar perfil" &gt; "Enlaces", colocá tu link para que cualquier seguidor compre con 1 toque.</li>
          <li><strong>Historias y Estados de WhatsApp:</strong> Subí fotos de tus productos destacados y agregá el sticker de enlace a tu catálogo.</li>
          <li><strong>Mensaje de bienvenida de WhatsApp Business:</strong> Respondé automáticamente con tu enlace para que miren el catálogo mientras les contestás.</li>
        </ul>
      </div>
    </div>

    <div class="btn-container">
      <a href="${dashboardUrl}" target="_blank" class="btn-primary" style="background: linear-gradient(135deg, #A855F7 0%, #7E22CE 100%); box-shadow: 0 8px 24px rgba(168,85,247,0.4);">🔗 Cargar mis Redes en el Panel de Control</a>
    </div>

    <div class="text" style="font-size: 13.5px; color: #aaaaaa; text-align: center;">
      Recordá que todos los pedidos llegan directamente a tu WhatsApp, listos con el detalle de productos y sin intermediarios.
    </div>
  `;

  return { subject: title, html: getEmailLayout({ title, bodyContent }) };
}

/**
 * 10. Correo de Seguimiento Día 3: Kit QR Imprimible para Mostrador y Mesas
 */
export function getFollowUpDay3Email({ storeName, storeId }) {
  const dashboardUrl = `${BASE_URL}/dashboard.html?store=${encodeURIComponent(storeId)}`;
  const storeUrl = `${BASE_URL}/index.html?store=${encodeURIComponent(storeId)}`;
  const qrUrl = `${BASE_URL}/api/qr?store=${encodeURIComponent(storeId)}`;
  const printKitUrl = `${BASE_URL}/kit-imprimible.html?store=${encodeURIComponent(storeId)}`;
  const title = `🖨️ ¿Ya imprimiste tu Kit QR para tu mostrador? - Dale! Te Pido`;

  const bodyContent = `
    <div class="greeting">¡Hola, ${storeName || storeId}! 🖨️</div>
    <div class="badge badge-blue">⚡ Seguimiento Día 3 · Pedidos Sin Esperas</div>
    <div class="text">
      ¿Sabías que podés agilizar la atención en tu local y evitar que los clientes hagan filas o se vayan sin comprar?
      <br/><br/>
      Con tu <strong>Kit QR Comercial</strong>, cualquier cliente que visite tu comercio puede escanear tu código con la cámara de su teléfono y ver tu catálogo al instante, armar su pedido y coordinar el pago o retiro sin demoras ni folletos de papel desactualizados.
    </div>

    <div class="qr-card">
      <div style="font-size: 14px; font-weight: 700; color: #ffffff; text-transform: uppercase;">Código QR Oficial de tu Tienda:</div>
      <div style="font-size: 13px; color: #22D3EE; margin-top: 4px;"><a href="${storeUrl}" target="_blank" style="color: #22D3EE;">${storeUrl}</a></div>
      <img src="${qrUrl}" alt="Código QR de la Tienda" />
      <div style="font-size: 12px; color: #aaaaaa; margin-top: 4px;">Listo para descargar en alta resolución o imprimir en tu folletería.</div>
    </div>

    <div class="box" style="border-left: 4px solid #22D3EE; background: rgba(34,211,238,0.05);">
      <div class="box-title" style="color: #67e8f9;">📍 3 lugares estratégicos donde poner tu QR:</div>
      <div style="font-size: 14px; color: #dddddd; line-height: 1.6;">
        <div style="margin-bottom: 8px;"><strong>1. En el mostrador o caja:</strong> Mientras esperan a ser atendidos, los clientes exploran todos tus productos y suelen sumar más ítems a su compra.</div>
        <div style="margin-bottom: 8px;"><strong>2. En las bolsas y paquetes de despacho:</strong> Quien ya te compró una vez, tiene el QR a mano pegado en la bolsa para pedirte de nuevo sin dudar.</div>
        <div><strong>3. En la vidriera exterior o puerta:</strong> Clientes que pasan cuando tu local está cerrado pueden escanearlo, conocer tus precios y encargarte con anticipación.</div>
      </div>
    </div>

    <div class="btn-container">
      <a href="${printKitUrl}" target="_blank" class="btn-primary" style="background: linear-gradient(135deg, #0284C7 0%, #0369A1 100%); box-shadow: 0 8px 24px rgba(2,132,199,0.4);">📄 Abrir Kit Imprimible Listo para Imprimir</a>
      <br/>
      <a href="${dashboardUrl}" target="_blank" class="btn-secondary">Ir a mi Panel de Control</a>
    </div>
  `;

  return { subject: title, html: getEmailLayout({ title, bodyContent }) };
}

/**
 * 11. Correo de Seguimiento Día 4: Gestión de Repartidores & Envíos
 */
export function getFollowUpDay4Email({ storeName, storeId }) {
  const dashboardUrl = `${BASE_URL}/dashboard.html?store=${encodeURIComponent(storeId)}`;
  const title = `🛵 ¿Sabías que podés gestionar tus repartidores en tiempo real? - Dale! Te Pido`;

  const bodyContent = `
    <div class="greeting">¡Hola, ${storeName || storeId}! 🛵💨</div>
    <div class="badge badge-amber">🛵 Seguimiento Día 4 · Logística & Envíos</div>
    <div class="text">
      ¿Hacés envíos a domicilio en tu negocio? Coordinar cadetes por mensajes sueltos de WhatsApp suele generar confusiones, demoras y pérdidas de tiempo.
      <br/><br/>
      En <strong>Dale! Te Pido</strong> incluimos un módulo completo de <strong>Gestión de Repartidores</strong> diseñado para que tus entregas funcionen como un reloj suizo, sin costo extra.
    </div>

    <div class="box" style="border-left: 4px solid #F59E0B; background: rgba(245,158,11,0.05);">
      <div class="box-title" style="color: #fbbf24;">⚡ Todo lo que podés hacer desde la sección Repartidores:</div>
      <div style="font-size: 14px; color: #dddddd; line-height: 1.6;">
        <div style="margin-bottom: 10px;">
          <strong>👤 Alta de tu equipo de cadetes:</strong> Registrá a tus repartidores con su nombre y número de WhatsApp.
        </div>
        <div style="margin-bottom: 10px;">
          <strong>📦 Asignación con 1 clic:</strong> Al tener un pedido listo, seleccionás qué cadete lo lleva. El repartidor recibe los datos exactos del envío en su teléfono.
        </div>
        <div style="margin-bottom: 10px;">
          <strong>📍 Remito Digital y GPS:</strong> El cadete cuenta con un enlace para abrir la dirección del cliente directamente en Google Maps y llamarlo si es necesario.
        </div>
        <div>
          <strong>💵 Control de cobros y rendiciones:</strong> Sabrás con precisión qué pedidos están pagados por transferencia y cuáles deben cobrarse en efectivo contra entrega.
        </div>
      </div>
    </div>

    <div class="btn-container">
      <a href="${dashboardUrl}" target="_blank" class="btn-primary" style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); box-shadow: 0 8px 24px rgba(245,158,11,0.4);">🛵 Explorar Módulo de Repartidores en mi Panel</a>
    </div>

    <div class="text" style="font-size: 13.5px; color: #aaaaaa; text-align: center;">
      ¿Tenés dudas sobre cómo configurar tus zonas de envío o cadetes? Responde este correo y te asesoramos paso a paso.
    </div>
  `;

  return { subject: title, html: getEmailLayout({ title, bodyContent }) };
}

/**
 * Plantilla: Enlace de Descarga de App Android para Gestores
 */
export function getAppDownloadEmailTemplate({ storeName = 'Comerciante', downloadUrl = 'https://daletepido.com.ar/descargar-app' } = {}) {
  const title = `📲 Descargá la App de Dale! Te Pido en tu Celular`;
  const qrUrl = `https://daletepido.com.ar/api/qr?url=${encodeURIComponent(downloadUrl)}`;

  const bodyContent = `
    <div style="text-align: center; margin-bottom: 24px;">
      <span class="badge badge-red">📱 APLICACIÓN OFICIAL ANDROID</span>
      <div class="greeting">¡Hola, ${storeName}! 👋</div>
      <div class="text">
        Pediste el enlace para instalar la aplicación oficial de <strong>Dale! Te Pido</strong> en tu teléfono celular o tablet.
        <br/><br/>
        Con la App instalada, vas a poder gestionar tus pedidos, actualizar precios, revisar comprobantes y atender a tus clientes <strong>en pantalla completa, sin barras de navegador y con máxima rapidez</strong>.
      </div>
    </div>

    <div class="btn-container">
      <a href="${downloadUrl}" target="_blank" class="btn-primary" style="font-size: 17px; padding: 18px 40px; box-shadow: 0 10px 28px rgba(214,0,0,0.5);">
        ⬇️ Descargar App para Android (.APK)
      </a>
    </div>

    <div class="box" style="border-left: 4px solid #D60000; background: rgba(214,0,0,0.04); margin-top: 30px;">
      <div class="box-title" style="color: #ff6666;">📝 3 Pasos Simples para Instalarla:</div>
      <div style="font-size: 14px; color: #dddddd; line-height: 1.6;">
        <div style="margin-bottom: 12px; display: flex; align-items: flex-start;">
          <span style="background: #D60000; color: #fff; font-size: 12px; font-weight: 900; width: 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 10px; flex-shrink: 0;">1</span>
          <div>Tocá el botón rojo de arriba desde tu celular para iniciar la descarga del archivo <strong>DaleTePido.apk</strong>.</div>
        </div>
        <div style="margin-bottom: 12px; display: flex; align-items: flex-start;">
          <span style="background: #D60000; color: #fff; font-size: 12px; font-weight: 900; width: 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 10px; flex-shrink: 0;">2</span>
          <div>Al terminar la descarga, abrí el archivo. Si tu teléfono te muestra un aviso de seguridad por ser descarga directa, activá la casilla <strong>"Permitir instalar aplicaciones de esta fuente"</strong> (Chrome / Archivos).</div>
        </div>
        <div style="display: flex; align-items: flex-start;">
          <span style="background: #D60000; color: #fff; font-size: 12px; font-weight: 900; width: 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 10px; flex-shrink: 0;">3</span>
          <div>Presioná <strong>"Instalar"</strong>. ¡Y listo! Ya vas a tener el ícono de Dale! Te Pido en la pantalla de inicio de tu celular listo para usar.</div>
        </div>
      </div>
    </div>

    <div class="qr-card" style="margin-top: 24px;">
      <div style="font-size: 13px; color: #aaaaaa; margin-bottom: 6px;">¿Abriste este correo desde una computadora?</div>
      <div style="font-size: 14px; color: #ffffff; font-weight: 700;">Escaneá este código QR con la cámara de tu celular:</div>
      <img src="${qrUrl}" alt="Código QR Descarga App" style="width: 150px; height: 150px; display: block; margin: 12px auto; background: white; padding: 8px; border-radius: 12px;" />
      <div style="font-size: 12px; color: #888888;">Enlace directo: <a href="${downloadUrl}" style="color: #ff6666;">${downloadUrl}</a></div>
    </div>
  `;

  return { subject: title, html: getEmailLayout({ title, bodyContent }) };
}

