const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`
};

// ── PERFIL PASIONAL Y PROFESIONAL DE BURGER HOUSE ────────────────────────
const ownerPassionBurgerHouseProfile = {
  business_name: 'Burger House — The Smash Master',
  tagline: 'Las mejores smash burgers de Buenos Aires: costra crocante y puro sabor',
  wapp: '5491144883322',
  rubro: 'Gastronomía & Street Food',
  subrubro: 'Hamburguesería Artesanal',
  direccion: 'Av. Corrientes 1840, CABA (Tribunales / Centro)',
  horario: 'Mar a Dom 19:30–01:00 hs (Lunes cerrado por producción de blends y panificación)',
  primary_color: '#E74C3C',
  secondary_color: '#18181B',
  logo_url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=400&fit=crop',
  bg: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=1600&q=85',
  h1: 'Sentí el verdadero poder',
  h2: 'DEL SMASH EN CADA MORDISCO',
  desc: 'Corte novillo de pastura seleccionado, planchas de hierro a 260°C para la costra Maillard perfecta, pan de papa que se derrite en boca y cheddar fundido de verdad. Delivery en caja térmica o Takeaway caliente sin filas.',
  emoji: '🍔',
  theme: 'dark',
  font: 'Barlow Condensed',
  font_body: 'Barlow',
  instagram: '@burgerhouse.ar',
  facebook: 'facebook.com/burgerhouse.ar',
  social_web: 'https://burgerhouse.daletepido.com.ar',
  social_ig: '@burgerhouse.ar',
  social_fb: 'burgerhouse.ar',
  social_maps: 'https://maps.google.com/?q=Av.+Corrientes+1840,+CABA',
  admin_email: 'franco.duarte@burgerhouse.com.ar',
  pay_cash: true,
  pay_transfer: true,
  pay_agreement: true,
  banner1_label: 'PROMO SMASH DELIVERY',
  banner1_title: 'Doble Cheddar Bacon + Papas Rústicas',
  banner1_img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200',
  banner1_cat: 'Burgers Clásicas',
  banner1_bg: '#1c1c1e',
  banner1_active: true,
  banner2_label: 'SMASH DE AUTOR',
  banner2_title: 'Oklahoma Caramelized Onion Triple',
  banner2_img: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=1200',
  banner2_cat: 'Burgers Especiales',
  banner2_bg: '#1c1c1e',
  banner2_active: true,
  status: 'ACTIVE',
  payment_status: 'UP_TO_DATE',
  plan_level: 'pro',
  nosotros: 'Burger House nació con una sola obsesión: terminar para siempre con las hamburguesas secas, aburridas e insípidas de las cadenas industriales. Somos artesanos del hierro fundido. Seleccionamos personalmente cada pieza de roast beef y tapa de asado para lograr el ratio exacto 75/25 de carne magra y grasa de cobertura. Prensamos a más de 250°C para provocar una reacción de Maillard insuperable: costra crujiente e hiper sabrosa por fuera, jugo hirviendo por dentro. Nuestro pan de papa es horneado todos los días a las 17 hs para que llegue a tu mesa esponjoso como una nube. Si buscás comida rápida genérica, este no es tu lugar; si amás la mejor hamburguesa que probaste en tu vida, bienvenido a casa.',
  horarios_data: JSON.stringify([
    {
      question: '¿Por qué nuestras hamburguesas smash son distintas a cualquier otra?',
      answer: 'Porque no usamos medallones congelados ni prensa liviana. Prensamos en vivo con espátula de acero macizo y discos de hierro a 260°C para caramelizar los azúcares naturales de la carne (Reacción de Maillard). Logramos bordes encaje crocantes y un centro súper jugoso con blend propio 75/25.'
    },
    {
      question: '¿Qué carne y qué pan utilizamos?',
      answer: 'Usamos novillo de pastura con blend exclusivo de roast beef madurado y tapa de asado picado dos horas antes del servicio. El pan es nuestro brioche de papa artesanal, liviano, mantecoso y sellado con manteca clarificada para que resista salsas sin desarmarse.'
    },
    {
      question: '¿Cómo garantizan que la hamburguesa llegue crocante y caliente en Delivery?',
      answer: 'Todos los pedidos se despachan en cajas microcorrugadas térmicas ventiladas que dejan salir el vapor sin ablandar el pan ni las papas. Además, con Dale!QueVoy monitoreamos al repartidor en tiempo real y el cliente valida con PIN al recibir para asegurar entrega inmediata.'
    },
    {
      question: '¿Tienen cadetería propia y retiro en el local (Takeaway)?',
      answer: '¡Exacto! Podés pedir con cadetes de la casa (Lucas y Mateo en zona), por la red exprés Dale!QueVoy, o seleccionar Takeaway para retirar caliente por Av. Corrientes 1840 con tu comanda impresa esperándote en mostrador.'
    },
    {
      question: '¿Cuáles son los medios de pago aceptados?',
      answer: 'Efectivo con descuento al retirar o recibir, Transferencia bancaria directa inmediata (Alias con validación de comprobante) y Mercado Pago (Débito, Crédito y Dinero en cuenta).'
    }
  ]),
  billing_info: {
    cuit_cuil: '30-71889944-8',
    razon_social: 'BURGER HOUSE SMASH FOOD S.R.L.',
    condicion_iva: 'Responsable Inscripto',
    direccion_fiscal: 'Av. Corrientes 1840, Ciudad Autónoma de Buenos Aires',
    email_facturacion: 'administracion@burgerhouse.com.ar',
    design: {
      brand_style: 'editorial',
      primary_color: '#E74C3C',
      secondary_color: '#18181B',
      hero_overlay: 'rgba(0,0,0,0.65)',
      hero_img_opacity: '0.85',
      h1Color: '#FFFFFF',
      h2Color: '#FF6B6B',
      descColor: '#E4E4E7'
    }
  }
};

async function updateStoreProfile(targetStoreId) {
  console.log(`\n=================== ACTUALIZANDO PERFIL: ${targetStoreId} ===================`);
  
  const payload = {
    ...ownerPassionBurgerHouseProfile,
    store_id: targetStoreId
  };

  const res = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${targetStoreId}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(payload)
  });

  console.log(`✓ Status PATCH: ${res.status}`);
  if (res.status >= 300) {
    console.error(await res.text());
  }
}

async function run() {
  await updateStoreProfile('burgerhouse');
  await updateStoreProfile('gastronomia');
  await updateStoreProfile('gastronomia-demo');
  console.log('\n🎉 ¡PERFIL DE DUEÑO APASIONADO ACTUALIZADO EXITOSAMENTE EN TODAS LAS DEMOS!');
}

run().catch(console.error);
