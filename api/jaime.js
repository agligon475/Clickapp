/**
 * API Handler para jAIme — Asistente Virtual Inteligente de Dale! Te Pido
 */

const KNOWLEDGE_BASE = [
  {
    keywords: ['producto', 'productos', 'cargar', 'agregar', 'nuevo', 'foto', 'fotos', 'catalogo', 'subir'],
    pose: 'resolucion',
    reply: '¡De una! Cargar tus productos es facilísimo 📦:\n1. Ingresá a tu Dashboard en la pestaña **Catálogo**.\n2. Tocá el botón **+ Nuevo Producto**.\n3. Completá el nombre, precio, descripción y subí una foto de buena calidad.\n4. Guardá los cambios y ¡listo! Ya aparece en tu tienda en tiempo real.',
    actions: [{ label: '📦 Ir a Catálogo', url: '/dashboard.html#catalogo' }]
  },
  {
    keywords: ['qr', 'codigo', 'imprimir', 'exhibidor', 'mostrador', 'descargar'],
    pose: 'alegria',
    reply: '¡Genial! Tu Código QR único conecta tu local físico con tu tienda digital 📲:\n1. Desde tu Dashboard, andá a la sección **Kit Imprimible / QR**.\n2. Vas a ver tu código QR generado en alta resolución.\n3. Podés descargarlo como imagen o descargar el kit completo para imprimir tu cartel de mostrador.',
    actions: [{ label: '📱 Ver mi Código QR', url: '/dashboard.html#qr' }]
  },
  {
    keywords: ['whatsapp', 'numero', 'tel', 'telefono', 'pedidos', 'recibir'],
    pose: 'resolucion',
    reply: '¡Es clave tener bien configurado tu WhatsApp! 💬:\n1. En tu Dashboard, entrá a **Configuración de Tienda**.\n2. Buscá el campo **WhatsApp de Ventas**.\n3. Ingresá tu número completo con código de área (ej: 5491100000000) sin espacios ni guiones.\n4. Guardá y hacé un pedido de prueba desde tu tienda para verificar que te llegue la lista ordenada.',
    actions: [{ label: '⚙️ Configurar WhatsApp', url: '/dashboard.html#configuracion' }]
  },
  {
    keywords: ['plan', 'planes', 'membresia', 'precio', 'costo', 'pro', 'starter', 'cambiar', 'upgrade', 'pago'],
    pose: 'alegria',
    reply: '¡Excelente decisión querer potenciar tu negocio! 🚀:\n• **Plan Starter:** $19.900/mes para hasta 12 productos.\n• **Plan PRO:** $29.900/mes con productos ilimitados, motor SEO local y métricas exportables.\n• Podés pagar de forma anual con **2 meses gratis**.\n\nTocá el botón de abajo para solicitar el cambio de plan y coordinar la membresía.',
    actions: [{ label: '⭐ Ver Planes y Membresías', url: '/dashboard.html#suscribirse' }]
  },
  {
    keywords: ['setup', 'asistencia', 'carguen', 'ayuda inicial', 'asistido', '35000'],
    pose: 'buenaonda',
    reply: '¡Tranqui! Si no tenés tiempo para cargar tus productos, contamos con el **Setup Inicial Asistido** ($35.000 pago único) 🛠️:\nUn especialista de nuestro equipo se conecta con vos durante 2 horas para dejar tu catálogo cargado y 100% funcionando.',
    actions: [{ label: '✉️ Solicitar Setup por Email', url: 'mailto:soporte@daletepido.com.ar?subject=Solicitud%20de%20Setup%20Inicial' }]
  },
  {
    keywords: ['soporte', 'humano', 'reclamo', 'problema', 'mail', 'correo', 'contacto', 'inconveniente'],
    pose: 'empatia',
    reply: 'Entiendo perfectamente. Si tenés una consulta específica o un inconveniente que requiere asistencia humana, escribinos directo a nuestro mail de soporte ✉️:\n**soporte@daletepido.com.ar**\n\nTe enviaremos una respuesta a la brevedad para ayudarte.',
    actions: [{ label: '✉️ Enviar mail a Soporte', url: 'mailto:soporte@daletepido.com.ar' }]
  },
  {
    keywords: ['hola', 'buenas', 'saludos', 'que tal', 'quien sos', 'jaime'],
    pose: 'buenaonda',
    reply: '¡Hola! 👋 Soy **jAIme**, tu asistente virtual en Dale! Te Pido. Estoy acá para ayudarte a configurar tu tienda, cargar productos, personalizar tu link o resolver cualquier duda en segundos. ¿En qué te puedo dar una mano hoy?',
    actions: []
  }
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { message = '', store_id = '' } = req.body || {};
    const text = message.trim().toLowerCase();

    if (!text) {
      return res.status(400).json({ error: 'Mensaje vacío' });
    }

    // 1. Buscador de Alta Precisión por Palabras Clave (ahorra 100% de créditos de API)
    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some(kw => text.includes(kw))) {
        return res.status(200).json({
          reply: item.reply,
          pose: item.pose,
          actions: item.actions,
          source: 'local_kb'
        });
      }
    }

    // 2. Si se configura una API Key de GPT / OpenRouter / Groq sin consumir Gemini:
    const openrouterKey = process.env.OPENROUTER_API_KEY || process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
    if (openrouterKey) {
      try {
        const aiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openrouterKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-os-120b',
            messages: [
              {
                role: 'system',
                content: 'Sos jAIme, el asistente virtual oficial de Dale! Te Pido. IMPORTANTE: Solo estás capacitado para responder dudas sobre la plataforma Dale! Te Pido (cargar productos, WhatsApp de ventas, Código QR, planes, dashboard, ayuda). Si te realizan cualquier pregunta ajena o externa a la plataforma, tu respuesta DEBE ser obligatoriamente: "Solo estoy para ayudarte con Dale! Te Pido. Podés preguntarme sobre cómo cargar productos, configurar tu WhatsApp, descargar tu Código QR o solicitar tu cambio de plan. 🚀"'
              },
              { role: 'user', content: message }
            ],
            max_tokens: 250
          })
        });

        if (aiRes.ok) {
          const aiData = await aiRes.json();
          const aiReply = aiData.choices?.[0]?.message?.content || '';
          if (aiReply) {
            return res.status(200).json({
              reply: aiReply,
              pose: aiReply.includes('Solo estoy para ayudarte con Dale! Te Pido') ? 'empatia' : 'buenaonda',
              actions: [{ label: '❓ Ver Centro de Ayuda', url: '/ayuda' }],
              source: 'gpt_os_120b'
            });
          }
        }
      } catch (errApi) {
        console.warn('Error llamando API externa de IA:', errApi);
      }
    }

    // 3. Fallback estricto de plataforma si no se detectó una palabra clave interna
    return res.status(200).json({
      reply: 'Solo estoy para ayudarte con Dale! Te Pido. Podés preguntarme sobre cómo cargar productos, configurar tu WhatsApp, descargar tu Código QR o solicitar tu cambio de plan. 🚀',
      pose: 'empatia',
      actions: [
        { label: '📖 Ir al Centro de Ayuda', url: '/ayuda' },
        { label: '✉️ Contactar Soporte', url: 'mailto:soporte@daletepido.com.ar' }
      ],
      source: 'platform_scope_fallback'
    });

  } catch (error) {
    console.error('Error en jAIme handler:', error);
    return res.status(500).json({ error: 'Error procesando consulta con jAIme' });
  }
}
