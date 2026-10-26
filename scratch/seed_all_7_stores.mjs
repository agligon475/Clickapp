// seed_all_7_stores.mjs
// Script definitivo y exhaustivo para purgar las 13 cuentas obsoletas
// y cargar con dedicación artesanal las 7 tiendas demo oficiales de ClickApp:
// 1. ferre-now (Ferretería Industrial)
// 2. kioscojulio (Kiosco 24hs)
// 3. noutacc (Accesorios Tech & Cases Apple/Samsung)
// 4. tecnomont (Gaming & Hardware High-End)
// 5. biuti (Indumentaria Femenina +35yo Palermo)
// 6. todolisto (Librería & Papelería San Justo)
// 7. lugonessilva (Corralón de Materiales San Vicente)

const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Prefer': 'return=representation',
  'Connection': 'close'
};

async function safeFetch(url, options = {}) {
  const mergedOptions = {
    ...options,
    headers: { ...headers, ...(options.headers || {}) },
    signal: AbortSignal.timeout(12000)
  };
  return await fetch(url, mergedOptions);
}

const DEPRECATED_STORES = [
  'gastronomia',
  'burgerhouse',
  'test-store-1786047945925',
  'tecnomon',
  'gastronomia-vacia',
  'electronica-vacia',
  'kiosco-vacia',
  'ferreteria-vacia',
  'electronica-demo',
  'gastronomia-demo',
  'kiosco-demo',
  'ferreteria-demo',
  'ferrenow'
];

// Importamos los datos
import catalogs from './catalogs_data.cjs';

// Definición de perfiles de tiendas para company_settings (columnas exactas)
const STORE_PROFILES = [
  // 1. FERRENOW
  {
    store_id: 'ferre-now',
    business_name: 'FerreNow — Ferretería Industrial & Herramientas',
    tagline: '35 años equipando profesionales, obras y talleres con primeras marcas y asesoramiento técnico',
    wapp: '5491133221100',
    rubro: 'Ferretería & Construcción',
    subrubro: 'Ferretería Industrial',
    direccion: 'Av. Mitre 3820, Munro (Vicente López)',
    horario: 'Lun a Vie 07:30–18:30 hs | Sáb 08:00–14:00 hs',
    primary_color: '#EA580C',
    secondary_color: '#0F172A',
    logo_url: '/img/logos/ferrenow-logo.jpg',
    bg: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1600&q=85',
    h1: 'POTENCIA Y PRECISIÓN',
    h2: 'PARA PROFESIONALES DE VERDAD',
    desc: 'Distribuidor oficial DeWalt, Bosch, Makita, Bahco y Fischer. Stock real inmediato, Factura A y B, y envíos en el día a pie de obra en CABA y GBA Norte.',
    emoji: '🛠️',
    theme: 'dark',
    font: 'Space Grotesk',
    font_body: 'Inter',
    instagram: '@ferrenow.ar',
    facebook: 'facebook.com/ferrenow.ar',
    social_web: 'https://ferre-now.daletepido.com.ar',
    social_ig: '@ferrenow.ar',
    social_fb: 'ferrenow.ar',
    social_maps: 'https://maps.google.com/?q=Av.+Mitre+3820,+Munro',
    admin_email: 'ventas@ferrenow.com.ar',
    pay_cash: true,
    pay_transfer: true,
    pay_agreement: true,
    banner1_label: 'LÍNEA INALÁMBRICA 20V',
    banner1_title: 'DeWalt Brushless & Baterías FlexVolt',
    banner1_img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200',
    banner1_cat: 'Herramientas Eléctricas',
    banner1_bg: '#18181b',
    banner1_active: true,
    banner2_label: 'ANCLAJES & QUÍMICOS',
    banner2_title: 'Sistemas Fischer de Fijación Pesada',
    banner2_img: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?w=1200',
    banner2_cat: 'Fijaciones y Adhesivos',
    banner2_bg: '#18181b',
    banner2_active: true,
    status: 'ACTIVE',
    payment_status: 'UP_TO_DATE',
    plan_level: 'pro',
    nosotros: 'FerreNow nació en 1989 en un pequeño local sobre la Avenida Mitre en Munro. Con más de 35 años de trayectoria ininterrumpida, nos convertimos en el centro de abastecimiento industrial de referencia para contratistas, herreros, carpinteros, plomeros y empresas constructoras. No vendemos herramientas de catálogo genérico: probamos en banco de trabajo cada modelo que comercializamos y brindamos garantía escrita oficial con servicio técnico postventa. Si tenés una obra en marcha o necesitás equipar tu taller con lo mejor del mercado mundial, en FerreNow encontrás respuesta inmediata, despacho en el día y el mejor precio mayorista por bulto cerrado.',
    horarios_data: JSON.stringify([
      { question: '¿Las máquinas eléctricas cuentan con garantía oficial de fábrica?', answer: 'Sí, absolutamente todas las herramientas y maquinarias cuentan con garantía oficial directa (DeWalt 3 años, Bosch 2 años, Makita 1 año). Entregamos certificado sellado con tu factura de compra.' },
      { question: '¿Emiten Factura A para empresas y responsables inscriptos?', answer: 'Emitimos Factura A o B de forma automática en todas las operaciones. Podés cargar tu CUIT y Razón Social al confirmar tu pedido por WhatsApp.' },
      { question: '¿Hacen entregas en el día directo en obra?', answer: 'Sí, disponemos de flota propia de utilitarios para CABA y Zona Norte con entregas en el día o en menos de 24 hs para pedidos confirmados antes de las 13:00 hs.' },
      { question: '¿El stock de la tienda online es real?', answer: 'Totalmente. Nuestro catálogo está sincronizado en tiempo real con el depósito central de Munro. Si el producto permite agregar al carrito, está físicamente en estantería listo para despacho.' },
      { question: '¿Hacen descuentos por cantidad o lista de gremio?', answer: 'Contamos con listas especiales para talleres, instaladores matriculados y constructoras. Consultanos por WhatsApp para abrir tu cuenta corriente comercial.' }
    ])
  },

  // 2. KIOSCOJULIO
  {
    store_id: 'kioscojulio',
    business_name: 'Kiosco Julio 24hs — Snacks, Bebidas & Golosinas',
    tagline: 'El clásico de Belgrano que nunca duerme: bebidas heladas, antojos dulces y sándwiches frescos las 24 horas',
    wapp: '5491155998877',
    rubro: 'Kiosco & Almacén',
    subrubro: 'Kiosco 24 Horas & Drugstore',
    direccion: 'Av. Cabildo 2140, Belgrano (CABA)',
    horario: 'Abierto las 24 horas, los 365 días del año sin excepción',
    primary_color: '#F59E0B',
    secondary_color: '#7C2D12',
    logo_url: '/img/logos/kioscojulio-logo.jpg',
    bg: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=1600&q=85',
    h1: 'TU ANTOJO FAVORITO',
    h2: 'HELADO Y AL INSTANTE 24/7',
    desc: 'Golosinas importadas, chocolates premium, bebidas bajo cero, combos nocturnos y empanadas recién horneadas con delivery veloz en 20 minutos.',
    emoji: '🍬',
    theme: 'dark',
    font: 'Outfit',
    font_body: 'Inter',
    instagram: '@kioscojulio24',
    facebook: 'facebook.com/kioscojulio24',
    social_web: 'https://kioscojulio.daletepido.com.ar',
    social_ig: '@kioscojulio24',
    social_fb: 'kioscojulio24',
    social_maps: 'https://maps.google.com/?q=Av.+Cabildo+2140,+Belgrano,+CABA',
    admin_email: 'julio@kioscojulio24.com.ar',
    pay_cash: true,
    pay_transfer: true,
    pay_agreement: true,
    banner1_label: 'NOCHES DE FERNET & AMIGOS',
    banner1_title: 'Branca 750ml + Coca 1.5L + Hielo',
    banner1_img: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=1200',
    banner1_cat: 'Bebidas y Energizantes',
    banner1_bg: '#1c1917',
    banner1_active: true,
    banner2_label: 'EL ALFAJOR DEL MOMENTO',
    banner2_title: 'Rasta Negro & Havanna 150 Años',
    banner2_img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=1200',
    banner2_cat: 'Golosinas y Chocolates',
    banner2_bg: '#1c1917',
    banner2_active: true,
    status: 'ACTIVE',
    payment_status: 'UP_TO_DATE',
    plan_level: 'pro',
    nosotros: 'Desde 1998 en la esquina de Cabildo y Mendoza, Kiosco Julio es el corazón nocturno y diurno de Belgrano. Fuimos pioneros en no cerrar nunca la persiana, acompañando a estudiantes que trasnochan, trabajadores del turno noche, reuniones con amigos de último momento o simplemente a quien busca darse un gusto después de un largo día. Nuestras heladeras están calibradas a 2°C exactos para que la gaseosa o la cerveza salgan con la escarcha perfecta, y nuestros sándwiches de miga y empanadas se producen dos veces por día para garantizar frescura absoluta.',
    horarios_data: JSON.stringify([
      { question: '¿Realmente están abiertos las 24 horas?', answer: 'Sí, atendemos 24/7 los 365 días del año. De madrugada podés hacer tu pedido por la web y retirarlo por la ventanilla de seguridad o pedir envío a domicilio.' },
      { question: '¿Cuánto demora el delivery en Belgrano y alrededores?', answer: 'El promedio de entrega en Belgrano, Colegiales y Núñez es de entre 15 y 30 minutos gracias a nuestros repartidores exclusivos.' },
      { question: '¿Las bebidas se envían frías de verdad?', answer: 'Absolutamente. Todas las gaseosas, cervezas y energizantes salen directamente de nuestra cámara de frío comercial a 2°C.' },
      { question: '¿Puedo pagar con Mercado Pago / Transferencia al recibir?', answer: 'Sí, aceptamos transferencia bancaria, QR de Mercado Pago, efectivo o tarjetas de débito y crédito.' }
    ])
  },

  // 3. NOUTACC
  {
    store_id: 'noutacc',
    business_name: 'Nout Accesorios — Premium Tech & Lifestyle Cases',
    tagline: 'Cases MagSafe de alta ingeniería, cargadores GaN y audio de alta fidelidad para tu iPhone y Samsung',
    wapp: '5491166334411',
    rubro: 'Tecnología & Celulares',
    subrubro: 'Accesorios Premium & Gadgets',
    direccion: 'Arenales 1340, Recoleta (CABA)',
    horario: 'Lun a Sáb 10:00–20:00 hs',
    primary_color: '#06B6D4',
    secondary_color: '#0F172A',
    logo_url: '/img/logos/noutacc-logo.jpg',
    bg: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1600&q=85',
    h1: 'DISEÑO MINIMALISTA',
    h2: 'PROTECCIÓN Y RENDIMIENTO SUPREMO',
    desc: 'Fundas con imanes de neodimio N52, cables mallados con certificación Apple MFi, cristales de zafiro y audio Hi-Res inalámbrico.',
    emoji: '⚡',
    theme: 'dark',
    font: 'Plus Jakarta Sans',
    font_body: 'Inter',
    instagram: '@noutacc.ar',
    facebook: 'facebook.com/noutacc.ar',
    social_web: 'https://noutacc.daletepido.com.ar',
    social_ig: '@noutacc.ar',
    social_fb: 'noutacc.ar',
    social_maps: 'https://maps.google.com/?q=Arenales+1340,+Recoleta,+CABA',
    admin_email: 'contacto@noutacc.com.ar',
    pay_cash: true,
    pay_transfer: true,
    pay_agreement: true,
    banner1_label: 'ECOSISTEMA MAGSAFE',
    banner1_title: 'Soportes, Billeteras & Baterías Qi2',
    banner1_img: 'https://images.unsplash.com/photo-1609592424379-455b7beea890?w=1200',
    banner1_cat: 'Ecosistema MagSafe',
    banner1_bg: '#082f49',
    banner1_active: true,
    banner2_label: 'AUDIO SIN LÍMITES',
    banner2_title: 'Sony WF-1000XM5 & Bose QuietComfort',
    banner2_img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1200',
    banner2_cat: 'Audio TWS & Headphones',
    banner2_bg: '#082f49',
    banner2_active: true,
    status: 'ACTIVE',
    payment_status: 'UP_TO_DATE',
    plan_level: 'pro',
    nosotros: 'Nout Accesorios nació en Recoleta bajo una premisa innegociable: tu smartphone de última generación merece accesorios a la altura de su diseño e ingeniería. Estamos cansados de los plásticos baratos que se amarillean a la semana o de cables genéricos que dañan la batería de tu dispositivo. Seleccionamos componentes con certificación oficial Apple MFi, aleaciones de aluminio anodizado aeroespacial, silicona líquida anti-polvo y cuero vegano con pátina noble. Cada producto en nuestra boutique pasa por rigurosas pruebas de durabilidad, conductividad y ajuste milimétrico.',
    horarios_data: JSON.stringify([
      { question: '¿Los accesorios son 100% compatibles con MagSafe?', answer: 'Sí, todas nuestras fundas, billeteras y cargadores MagSafe incorporan anillos magnéticos de neodimio N52 de polaridad exacta, garantizando un agarre ultra fuerte y compatibilidad con cargadores Qi y Qi2.' },
      { question: '¿Los cables y cargadores tienen certificación Apple MFi?', answer: 'Absolutamente. Todos los cables Lightning y USB-C de nuestra línea MFi cuentan con el chip original de control de carga homologado por Apple para no dañar la salud de la batería de tu iPhone ni de tu iPad.' },
      { question: '¿Cómo funciona la colocación del vidrio templado EZ Fit?', answer: 'Nuestros vidrios Spigen EZ Fit incluyen una bandeja plástica que se calza sobre el teléfono. En 10 segundos queda perfectamente centrado y 100% libre de burbujas o motas de polvo.' },
      { question: '¿Hacen envíos express en el día en CABA?', answer: 'Sí, contamos con mensajería privada en moto que entrega en el día en toda la Ciudad de Buenos Aires para compras realizadas antes de las 15:00 hs.' }
    ])
  },

  // 4. TECNOMONT
  {
    store_id: 'tecnomont',
    business_name: 'TecnoMont — Tecnología, Gaming & Accesorios High-End',
    tagline: 'Hardware competitivo para esports, streaming y render: placas de video, procesadores AM5 y periféricos custom',
    wapp: '5491122446688',
    rubro: 'Electrónica & Gaming',
    subrubro: 'Hardware & Esports Gear',
    direccion: 'Av. Rivadavia 5420, Caballito (CABA)',
    horario: 'Lun a Sáb 10:00–19:30 hs',
    primary_color: '#8B5CF6',
    secondary_color: '#09090B',
    logo_url: '/img/logos/tecnomont-logo.jpg',
    bg: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1600&q=85',
    h1: 'FPS SIN LÍMITES',
    h2: 'HARDWARE PARA QUIENES JUEGAN A GANAR',
    desc: 'Ensamblados a medida, cable management quirúrgico, placas RTX serie 4000, Ryzen 3D V-Cache y teclados magnéticos Rapid Trigger.',
    emoji: '🎮',
    theme: 'dark',
    font: 'Space Grotesk',
    font_body: 'Inter',
    instagram: '@tecnomont.hw',
    facebook: 'facebook.com/tecnomont.hw',
    social_web: 'https://tecnomont.daletepido.com.ar',
    social_ig: '@tecnomont.hw',
    social_fb: 'tecnomont.hw',
    social_maps: 'https://maps.google.com/?q=Av.+Rivadavia+5420,+Caballito,+CABA',
    admin_email: 'ventas@tecnomont.com.ar',
    pay_cash: true,
    pay_transfer: true,
    pay_agreement: true,
    banner1_label: 'PODER GRÁFICO RT & DLSS 3.5',
    banner1_title: 'Nvidia RTX 4070 Super 12GB GDDR6X',
    banner1_img: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1200',
    banner1_cat: 'Placas de Video GPUs',
    banner1_bg: '#1e1b4b',
    banner1_active: true,
    banner2_label: 'VENTAJA COMPETITIVA ESPORTS',
    banner2_title: 'Wooting 60HE+ Rapid Trigger Magnético',
    banner2_img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1200',
    banner2_cat: 'Periféricos Competitivos',
    banner2_bg: '#1e1b4b',
    banner2_active: true,
    status: 'ACTIVE',
    payment_status: 'UP_TO_DATE',
    plan_level: 'pro',
    nosotros: 'TecnoMont fue fundada en 2017 por gamers y overclockers apasionados de Caballito. Entendemos cada milisegundo de input lag, cada grado de temperatura en los VRM de tu placa madre y la importancia crítica de una fuente Gold con riel limpio de 12V. No somos despachantes de cajas: testeamos compatibilidad térmica, flasheamos BIOS con las últimas curvas de voltaje y asesoramos a streamers y profesionales del 3D para exprimir al máximo su presupuesto sin cuellos de botella.',
    horarios_data: JSON.stringify([
      { question: '¿Los componentes tienen garantía oficial argentina?', answer: 'Sí, todos nuestros componentes cuentan con garantía oficial de importador directo (Asus, Gigabyte, Corsair, Kingston, Logitech). Conservamos el número de serie registrado en tu factura.' },
      { question: '¿Arman PCs a medida con pruebas de estabilidad?', answer: 'Sí, todos nuestros ensamblados salen con prueba de estrés de 24 horas (FurMark + Cinebench), actualización de BIOS y cable management profesional sin costo extra.' },
      { question: '¿Los teclados y periféricos son en español o inglés?', answer: 'Disponemos de modelos con distribución ISO español o ANSI internacional. En la descripción de cada producto está especificado el layout exacto.' },
      { question: '¿Realizan envíos protegidos a todo el país?', answer: 'Despachamos por Andreani o Correo Argentino con seguro total contra pérdidas o daños, en doble caja con burbuja de alta densidad.' }
    ])
  },

  // 5. BIUTI (Indumentaria Femenina +35yo Palermo)
  {
    store_id: 'biuti',
    business_name: 'Biuti — Moda Femenina Contemporánea & Alta Sastrería',
    tagline: 'Prendas atemporales de lino italiano, seda y lana para mujeres activas que eligen calidad, calce impecable y distinción',
    wapp: '5491177002233',
    rubro: 'Indumentaria & Calzado',
    subrubro: 'Moda Femenina +35 & Sastrería',
    direccion: 'Armenia 1620, Palermo Soho (CABA)',
    horario: 'Mar a Dom 11:00–20:00 hs',
    primary_color: '#D97706',
    secondary_color: '#1C1917',
    logo_url: '/img/logos/biuti-logo.jpg',
    bg: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=85',
    h1: 'ELEGANCIA QUE TRASCIENDE',
    h2: 'SASTRERÍA Y TEXTILES NOBLES EN PALERMO',
    desc: 'Blazers con caída perfecta, camisas en algodón pima peruano, pantalones wide leg que estilizan y tejidos de abrigo que acarician la piel.',
    emoji: '✨',
    theme: 'light',
    font: 'Cormorant Garamond',
    font_body: 'Inter',
    instagram: '@biuti.oficial',
    facebook: 'facebook.com/biuti.oficial',
    social_web: 'https://biuti.daletepido.com.ar',
    social_ig: '@biuti.oficial',
    social_fb: 'biuti.oficial',
    social_maps: 'https://maps.google.com/?q=Armenia+1620,+Palermo,+CABA',
    admin_email: 'atelier@biuti.com.ar',
    pay_cash: true,
    pay_transfer: true,
    pay_agreement: true,
    banner1_label: 'NUEVA COLECCIÓN ATEMPORAL',
    banner1_title: 'Blazers Sastreros en Lino Italiano & Satén',
    banner1_img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200',
    banner1_cat: 'Blazers & Tapados Sastreros',
    banner1_bg: '#fef3c7',
    banner1_active: true,
    banner2_label: 'SILUETAS FLUIDAS & CHIC',
    banner2_title: 'Pantalones Wide Leg & Palazzos Sastreros',
    banner2_img: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=1200',
    banner2_cat: 'Pantalones & Palazzos Wide Leg',
    banner2_bg: '#fef3c7',
    banner2_active: true,
    status: 'ACTIVE',
    payment_status: 'UP_TO_DATE',
    plan_level: 'pro',
    nosotros: 'Biuti nace en nuestro atelier de Palermo Soho a partir de una necesidad real: crear ropa sofisticada, femenina y de calce perfecto pensada especialmente para mujeres mayores de 35 años que no se identifican con la moda descartable y efímera. Diseñamos piezas que acompañan con solvencia reuniones de directorio, conferencias o eventos sociales con la misma naturalidad con la que se visten para un brunch relajado de fin de semana. Priorizamos fibras naturales como lino europeo, seda natural lavada, algodón pima y lana merino suave, confeccionadas con mano de obra calificada en talleres éticos de Buenos Aires.',
    horarios_data: JSON.stringify([
      { question: '¿Cómo elijo mi talle correcto si compro online?', answer: 'Cada prenda cuenta con su tabla de medidas reales en centímetros (busto, cintura, cadera y largo total). Además, nuestro equipo de estilistas te asesora en directo por WhatsApp para elegir el talle que mejor resalte tu silueta.' },
      { question: '¿Tienen cambio si la prenda no me queda como esperaba?', answer: '¡Por supuesto! Tenés 30 días corridos para solicitar el cambio de talle o modelo sin costo adicional en nuestro local de Palermo Soho o mediante mensajería a domicilio.' },
      { question: '¿Qué cuidados requieren las prendas de lino y seda?', answer: 'Recomendamos lavado en ciclo delicado con agua fría o limpieza a seco profesional, secado a la sombra en percha acolchada y planchado del revés a temperatura media para conservar el lustre natural del tejido.' },
      { question: '¿Hacen envíos a todo el país?', answer: 'Sí, enviamos a todas las provincias argentinas a través de OCA o Andreani con código de seguimiento en tiempo real y embalaje de regalo premium.' }
    ])
  },

  // 6. TODOLISTO (Librería & Papelería San Justo)
  {
    store_id: 'todolisto',
    business_name: 'TodoListo — Librería, Papelería & Insumos Escolares y de Oficina',
    tagline: 'Todo lo que tu escuela, estudio u oficina necesita en un solo lugar: cuadernos, arte, escritura fina y resmas con entrega rápida en San Justo y AMBA',
    wapp: '5491144558899',
    rubro: 'Librería & Papelería',
    subrubro: 'Librería Comercial & Artística',
    direccion: 'Dr. Ignacio Arieta 3120, San Justo (La Matanza)',
    horario: 'Lun a Vie 08:30–19:30 hs | Sáb 09:00–14:00 hs',
    primary_color: '#2563EB',
    secondary_color: '#1E293B',
    logo_url: '/img/logos/todolisto-logo.jpg',
    bg: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1600&q=85',
    h1: 'CREATIVIDAD Y ORGANIZACIÓN',
    h2: 'AL SERVICIO DE TU DÍA A DÍA',
    desc: 'Primeras marcas en papelería: Autor, Mooving, Posca, Stabilo, Faber-Castell y Casio. Precios mayoristas para empresas, colegios y profesionales.',
    emoji: '📚',
    theme: 'light',
    font: 'Plus Jakarta Sans',
    font_body: 'Inter',
    instagram: '@todolisto.libreria',
    facebook: 'facebook.com/todolisto.libreria',
    social_web: 'https://todolisto.daletepido.com.ar',
    social_ig: '@todolisto.libreria',
    social_fb: 'todolisto.libreria',
    social_maps: 'https://maps.google.com/?q=Dr.+Ignacio+Arieta+3120,+San+Justo',
    admin_email: 'ventas@todolisto.com.ar',
    pay_cash: true,
    pay_transfer: true,
    pay_agreement: true,
    banner1_label: 'INSUMOS DE OFICINA & EMPRESAS',
    banner1_title: 'Resmas Autor A4 75g + Carpetas & Biblioratos',
    banner1_img: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1200',
    banner1_cat: 'Resmas & Papelería Escolar',
    banner1_bg: '#dbeafe',
    banner1_active: true,
    banner2_label: 'ARTE, LETTERING & DISEÑO',
    banner2_title: 'Uni Posca x8 + Stabilo Pastel & Faber-Castell',
    banner2_img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1200',
    banner2_cat: 'Artística, Lettering & Manualidades',
    banner2_bg: '#dbeafe',
    banner2_active: true,
    status: 'ACTIVE',
    payment_status: 'UP_TO_DATE',
    plan_level: 'pro',
    nosotros: 'Desde hace más de dos décadas sobre la tradicional calle Arieta en pleno centro de San Justo, TodoListo es el punto de encuentro indiscutido para familias en época escolar, estudiantes universitarios y empresas de la zona oeste del conurbano bonaerense. Contamos con un surtido colosal que abarca desde la lapicera más económica hasta los sets profesionales de acuarelas y marcadores Posca para ilustradores y arquitectos. Gestionamos cuentas corporativas con facturación centralizada y entregas programadas en empresas de San Justo, Ramos Mejía, Morón y alrededores.',
    horarios_data: JSON.stringify([
      { question: '¿Hacen presupuestos para listas escolares de colegios?', answer: 'Sí, podés mandarnos una foto de la lista de útiles por WhatsApp y te armamos el presupuesto con descuento por combo escolar completo en menos de una hora.' },
      { question: '¿Venden resmas de papel por caja cerrada a precio mayorista?', answer: 'Sí, disponemos de precios diferenciales por bulto cerrado de 5 o 10 resmas de papel A4 y Oficio para estudios jurídicos, colegios y empresas.' },
      { question: '¿Hacen Factura A para personas jurídicas?', answer: 'Emitimos Factura A y B de forma instantánea al procesar el pedido. Solo necesitás indicarnos el CUIT correspondiente.' },
      { question: '¿Cuál es el área de cobertura para envíos a domicilio?', answer: 'Entregamos con logística propia en San Justo, Ramos Mejía, Haedo, Morón, Villa Luzuriaga y La Tablada. Para el resto del AMBA despachamos vía correo privado.' }
    ])
  },

  // 7. LUGONES SILVA (Corralón de Materiales San Vicente)
  {
    store_id: 'lugonessilva',
    business_name: 'Lugones Silva — Distribuidor Mayorista de Materiales de Construcción & Corralón',
    tagline: 'Líder en provisión integral para obras civiles y residenciales en San Vicente, Canning y Zona Sur del AMBA',
    wapp: '5491133447788',
    rubro: 'Construcción & Corralón',
    subrubro: 'Distribuidor Mayorista de Materiales',
    direccion: 'Ruta Provincial 6 Km 48, San Vicente (Provincia de Buenos Aires)',
    horario: 'Lun a Vie 07:00–18:00 hs | Sáb 07:30–13:00 hs',
    primary_color: '#0D9488',
    secondary_color: '#134E4A',
    logo_url: '/img/logos/lugonessilva-logo.jpg',
    bg: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85',
    h1: 'CIMIENTOS SÓLIDOS',
    h2: 'DE LA PLANIFICACIÓN A LA LLAVE EN MANO',
    desc: 'Flota propia de camiones volcadores y grúas pluma. Cemento Loma Negra, cales, hierros Acindar, áridos por bolsón y ladrillos cerámicos palletizados.',
    emoji: '🏗️',
    theme: 'dark',
    font: 'Space Grotesk',
    font_body: 'Inter',
    instagram: '@lugonessilva.corralon',
    facebook: 'facebook.com/lugonessilva.corralon',
    social_web: 'https://lugonessilva.daletepido.com.ar',
    social_ig: '@lugonessilva.corralon',
    social_fb: 'lugonessilva.corralon',
    social_maps: 'https://maps.google.com/?q=Ruta+Provincial+6+Km+48,+San+Vicente',
    admin_email: 'despacho@lugonessilva.com.ar',
    pay_cash: true,
    pay_transfer: true,
    pay_agreement: true,
    banner1_label: 'ACERO & ESTRUCTURAS ACINDAR',
    banner1_title: 'Hierros ADN 420 8mm y 12mm + Mallas Cima',
    banner1_img: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?w=1200',
    banner1_cat: 'Hierros Estructurales & Mallas',
    banner1_bg: '#134e4a',
    banner1_active: true,
    banner2_label: 'ÁRIDOS & GRANEL EN OBRA',
    banner2_title: 'Arena de Río & Piedra Partida por BigBag 1m3',
    banner2_img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200',
    banner2_cat: 'Áridos & Suelos por Metro',
    banner2_bg: '#134e4a',
    banner2_active: true,
    status: 'ACTIVE',
    payment_status: 'UP_TO_DATE',
    plan_level: 'pro',
    nosotros: 'Lugones Silva nació para transformar la distribución de materiales pesados en la región de San Vicente, Canning, Cañuelas y Brandsen. Con un predio logístico de más de 12.000 m2 sobre la Ruta Provincial 6, contamos con una flota pesada de 8 camiones con hidrogrúa de alto alcance para depositar pallets de ladrillos y bolsones de áridos directamente dentro del terreno de tu obra sin roturas ni demoras. Somos distribuidores directos de fábrica de Loma Negra, Acindar, Fanelli y Megaflex, garantizando el mejor precio por volumen y acopio programado hasta por 180 días con congelamiento de valor.',
    horarios_data: JSON.stringify([
      { question: '¿Cómo funciona el servicio de acopio de materiales?', answer: 'Podés comprar hoy tus bolsas de cemento, hierros o ladrillos y congelar el precio en pesos por hasta 180 días corridos. Vamos entregando los materiales en tu obra según el avance constructivo que nos vayas pidiendo.' },
      { question: '¿Los camiones tienen hidrogrúa para bajar los bolsones dentro de la obra?', answer: 'Sí, todas nuestras unidades cuentan con grúa pluma hidráulica de 15 metros de alcance para descargar pallets y bolsones dentro del predio, evitando que queden en la vereda o calle pública.' },
      { question: '¿Cuál es el tiempo de entrega habitual en San Vicente y Canning?', answer: 'Las entregas de materiales pesados se coordinan en 24 a 48 hs hábiles desde la confirmación del pedido, con franja horaria pactada previamente por WhatsApp.' },
      { question: '¿Hacen entregas de áridos por camión volcador completo?', answer: 'Sí, realizamos fletes de tosca compactable, arena fina y cascote limpio en camiones volcadores de 5 m3 y bateas de 20 m3 para nivelaciones de terreno y plateas de fundación.' }
    ])
  }
];

async function main() {
  console.log('========================================================');
  console.log('🚀 1. PURGANDO Y NEUTRALIZANDO LAS 13 CUENTAS OBSOLETAS');
  console.log('========================================================');

  for (const depId of DEPRECATED_STORES) {
    try {
      // 1.1 Limpiar productos, categorias, pedidos
      await safeFetch(`${SUPABASE_URL}/rest/v1/products?store_id=eq.${depId}`, { method: 'DELETE' });
      await safeFetch(`${SUPABASE_URL}/rest/v1/categories?store_id=eq.${depId}`, { method: 'DELETE' });
      await safeFetch(`${SUPABASE_URL}/rest/v1/orders?store_id=eq.${depId}`, { method: 'DELETE' });

      // 1.2 Renombrar en company_settings para que la URL original quede en 404 / no encontrada
      const patchRes = await safeFetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${depId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          store_id: `deleted-${depId}-${Date.now().toString().slice(-4)}`,
          business_name: 'Cuenta Eliminada',
          tagline: 'Esta cuenta ya no está disponible',
          status: 'DELETED'
        })
      });
      console.log(`[PURGED] ${depId}: status ${patchRes.status}`);
    } catch (err) {
      console.error(`Error purgando ${depId}:`, err.message);
    }
  }

  console.log('\n========================================================');
  console.log('🌟 2. CARGANDO Y CONFIGURANDO LAS 7 TIENDAS DEMO');
  console.log('========================================================');

  for (const profile of STORE_PROFILES) {
    const sId = profile.store_id;
    console.log(`\n--------------------------------------------------------`);
    console.log(`📦 Procesando: ${sId} (${profile.business_name})`);
    console.log(`--------------------------------------------------------`);

    // 2.1 Verificar si la tienda ya existe en company_settings
    let exists = false;
    try {
      const checkRes = await safeFetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${sId}&select=id,store_id`);
      const checkData = await checkRes.json();
      exists = Array.isArray(checkData) && checkData.length > 0;
    } catch (e) {
      exists = false;
    }

    let csStatus;
    if (exists) {
      console.log(`-> Registro existe en company_settings. Actualizando vía PATCH...`);
      const patchRes = await safeFetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${sId}`, {
        method: 'PATCH',
        body: JSON.stringify(profile)
      });
      csStatus = patchRes.status;
    } else {
      console.log(`-> Registro no existe en company_settings. Creando vía POST...`);
      const postRes = await safeFetch(`${SUPABASE_URL}/rest/v1/company_settings`, {
        method: 'POST',
        body: JSON.stringify(profile)
      });
      csStatus = postRes.status;
    }
    console.log(`-> company_settings guardado: status ${csStatus}`);

    // 2.2 Limpiar categorías y productos anteriores
    await safeFetch(`${SUPABASE_URL}/rest/v1/categories?store_id=eq.${sId}`, { method: 'DELETE' });
    await safeFetch(`${SUPABASE_URL}/rest/v1/products?store_id=eq.${sId}`, { method: 'DELETE' });

    // 2.3 Cargar Categorías
    const catalogData = catalogs[sId];
    if (!catalogData) {
      console.log(`-> ¡AVISO! No se encontró catálogo para ${sId}`);
      continue;
    }

    const categoriesPayload = catalogData.categories.map((c, i) => ({
      store_id: sId,
      name: c.name,
      emoji: c.icon || '📦',
      display_order: i + 1,
      active: true,
      rubro: profile.rubro
    }));

    const catRes = await safeFetch(`${SUPABASE_URL}/rest/v1/categories`, {
      method: 'POST',
      body: JSON.stringify(categoriesPayload)
    });
    console.log(`-> Categorías insertadas (${categoriesPayload.length}): status ${catRes.status}`);

    // 2.4 Cargar Productos
    const productsPayload = catalogData.products.map(p => ({
      store_id: sId,
      nombre: p.name,
      marca: p.brand || '',
      precio: p.price,
      categoria: p.category,
      detalles: p.description,
      stock: p.stock || 25,
      emoji: profile.emoji || '📦',
      origen: 'Nacional',
      img: p.image,
      img2: null,
      img3: null,
      oculto: false,
      pills: p.featured ? ['Destacado', 'Garantía Oficial'] : []
    }));

    const prodRes = await safeFetch(`${SUPABASE_URL}/rest/v1/products`, {
      method: 'POST',
      body: JSON.stringify(productsPayload)
    });
    console.log(`-> Productos insertados (${productsPayload.length}): status ${prodRes.status}`);
  }

  console.log('\n========================================================');
  console.log('✅ TODAS LAS OPERACIONES COMPLETADAS CON ÉXITO');
  console.log('========================================================');
}

main().catch(err => {
  console.error('Error fatal durante la ejecución:', err);
});
