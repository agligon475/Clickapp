const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`
};

// ── STORE 1: NOUTACC (Sin TACC) ──────────────────────────────────────────
const storeNoutacc = {
  settings: {
    store_id: 'noutacc',
    business_name: 'Noutacc - 100% Sin TACC',
    rubro: 'Cafetería & Panadería Sin TACC',
    tagline: 'Comida libre de gluten, artesanal y súper rica',
    h1: 'Gana tiempo',
    h2: 'y pedí en NOUTACC',
    desc: 'Panadería, rotisería y delicias 100% libres de gluten, listas para disfrutar.',
    emoji: '🍞',
    primary_color: '#77C59F',
    secondary_color: '#1E40AF',
    logo_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop',
    bg: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1200',
    banner1_label: '100% LIBRE DE GLUTEN',
    banner1_title: 'Panadería & Desayunos',
    banner1_img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200',
    banner1_cat: 'Panadería & Desayuno',
    banner1_active: true,
    banner2_label: 'ROTISERÍA CASERA',
    banner2_title: 'Tartas & Empanadas Sin TACC',
    banner2_img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1200',
    banner2_cat: 'Rotisería & Salados',
    banner2_active: true,
    direccion: 'Cristóbal Colón 113, Córdoba',
    horario: 'Lunes a Sábados de 8:30 a 20:30 hs',
    wapp: '5491141819344',
    nosotros: 'En Noutacc nos apasiona la cocina libre de gluten. Preparamos todos nuestros productos en un ambiente 100% libre de contaminación cruzada (Sin TACC), garantizando el mejor sabor y calidad para celíacos e intolerantes al gluten.',
    status: 'ACTIVE',
    payment_status: 'UP_TO_DATE',
    plan_level: 'pro'
  },
  categories: [
    { name: 'Panadería & Desayuno', emoji: '🍞' },
    { name: 'Pastelería & Dulces', emoji: '🍰' },
    { name: 'Rotisería & Salados', emoji: '🥐' },
    { name: 'Café & Bebidas', emoji: '☕' }
  ],
  faqs: [
    { question: '¿Todos los productos son 100% Sin TACC?', answer: 'Sí, absolutamente todos nuestros productos son elaborados en nuestra cocina exclusiva 100% libre de gluten, sin ningún riesgo de contaminación cruzada. Contamos con certificación oficial.' },
    { question: '¿Cómo realizan los envíos?', answer: 'Hacemos envíos propios en moto dentro de la ciudad para garantizar que los productos de panadería y rotisería lleguen frescos y en perfectas condiciones.' },
    { question: '¿Cuáles son las formas de pago aceptadas?', answer: 'Aceptamos efectivo al retirar o recibir el pedido, transferencia bancaria inmediata (Alias / CBU) y Mercado Pago.' },
    { question: '¿Se pueden congelar los panes y medialunas?', answer: '¡Sí! Todos nuestros productos de panadería y masas saladas se pueden congelar hasta por 3 meses. Te recomendamos darles un golpe de horno antes de consumir para recuperar su textura crocante.' }
  ],
  products: [
    {
      nombre: 'Pan de Molde Lactal (Sin TACC)',
      precio: 4500,
      stock: 20,
      categoria: 'Panadería & Desayuno',
      emoji: '🍞',
      detalles: 'Pan de molde blanco lactal súper esponjoso y miga suave. Elaborado con fécula de mandioca y harina de arroz. Ideal para tostadas y sándwiches. (500g)',
      img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
      marca: 'Noutacc',
      origen: 'AR',
      oculto: false,
      store_id: 'noutacc'
    },
    {
      nombre: 'Medialunas de Manteca Gluten Free (x6)',
      precio: 5200,
      stock: 15,
      categoria: 'Panadería & Desayuno',
      emoji: '🥐',
      detalles: 'Seis medialunas de manteca hojaldradas, bañadas en sutil almíbar de vainilla. 100% aptas para celíacos.',
      img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
      marca: 'Noutacc',
      origen: 'AR',
      oculto: false,
      store_id: 'noutacc'
    },
    {
      nombre: 'Tarta Individual de Jamón, Queso y Huevo (Sin TACC)',
      precio: 4800,
      stock: 12,
      categoria: 'Rotisería & Salados',
      emoji: '🥧',
      detalles: 'Tarta salada individual con masa quebrada dorada sin gluten, rellena de abundante queso muzzarella derretido, jamón cocido seleccionado y huevo picado.',
      img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800',
      marca: 'Noutacc',
      origen: 'AR',
      oculto: false,
      store_id: 'noutacc'
    },
    {
      nombre: 'Hamburguesa Doble Cheddar & Bacon (Sin TACC)',
      precio: 8900,
      stock: 30,
      categoria: 'Rotisería & Salados',
      emoji: '🍔',
      detalles: 'Doble medallón de carne de novillo 100% vacuna, doble queso cheddar panceta ahumada crujiente, salsa especial y pan brioche casero libre de gluten.',
      img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
      marca: 'Noutacc',
      origen: 'AR',
      oculto: false,
      store_id: 'noutacc'
    },
    {
      nombre: 'Empanadas Criollas de Carne Cortada a Cuchillo (x3)',
      precio: 4200,
      stock: 25,
      categoria: 'Rotisería & Salados',
      emoji: '🥟',
      detalles: 'Trío de empanadas horneadas con masa casera sin TACC, rellenas de jugosa carne vacuna cortada a cuchillo, cebolla de verdeo y especias tradicionales.',
      img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800',
      marca: 'Noutacc',
      origen: 'AR',
      oculto: false,
      store_id: 'noutacc'
    },
    {
      nombre: 'Porción de Torta Red Velvet (Sin TACC)',
      precio: 4600,
      stock: 10,
      categoria: 'Pastelería & Dulces',
      emoji: '🍰',
      detalles: 'Deliciosa porción de torta Red Velvet con bizcochuelo húmedo de cacao sin gluten y relleno suave de frosting de queso crema con vainilla natural.',
      img: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800',
      marca: 'Noutacc',
      origen: 'AR',
      oculto: false,
      store_id: 'noutacc'
    },
    {
      nombre: 'Alfajor Artesanal de Dulce de Leche y Chocolate (Sin TACC)',
      precio: 2200,
      stock: 40,
      categoria: 'Pastelería & Dulces',
      emoji: '🍪',
      detalles: 'Alfajor relleno con abundante dulce de leche repostero y baño de cobertura de chocolate semiamargo al 70%. (80g)',
      img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800',
      marca: 'Noutacc',
      origen: 'AR',
      oculto: false,
      store_id: 'noutacc'
    },
    {
      nombre: 'Muffins de Arándanos y Limón (Pack x2)',
      precio: 3400,
      stock: 18,
      categoria: 'Pastelería & Dulces',
      emoji: '🧁',
      detalles: 'Dos muffins súper húmedos perfumados con zeste de limón fresco y repleto de arándanos enteros seleccionados.',
      img: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800',
      marca: 'Noutacc',
      origen: 'AR',
      oculto: false,
      store_id: 'noutacc'
    },
    {
      nombre: 'Café Latte Especial de Especies & Vainilla (400ml)',
      precio: 3100,
      stock: 50,
      categoria: 'Café & Bebidas',
      emoji: '☕',
      detalles: 'Doble shot de espresso de granos colombianos con leche cremada caliente y toque de jarabe artesanal de vainilla.',
      img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800',
      marca: 'Noutacc',
      origen: 'AR',
      oculto: false,
      store_id: 'noutacc'
    },
    {
      nombre: 'Jugo Natural de Naranja, Zanahoria y Jengibre (500ml)',
      precio: 2800,
      stock: 35,
      categoria: 'Café & Bebidas',
      emoji: '🧃',
      detalles: 'Jugo exprimido en el momento sin azúcar agregada ni conservantes. Súper refrescante e inmunoprotector.',
      img: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800',
      marca: 'Noutacc',
      origen: 'AR',
      oculto: false,
      store_id: 'noutacc'
    }
  ]
};

// ── STORE 2: FERRENOW / FERRE-NOW (Ferretería) ──────────────────────────
const storeFerrenow = {
  settings: {
    store_id: 'ferrenow',
    business_name: 'FerreNow — Ferretería & Herramientas',
    rubro: 'Ferretería & Construcción',
    tagline: 'Herramientas profesionales y envíos rápidos en el día',
    h1: 'Todo en Herramientas',
    h2: 'y Equipamiento Pro',
    desc: 'Catálogo completo de máquinas, herramientas manuales, electricidad e insumos de hogar.',
    emoji: '🛠️',
    primary_color: '#FF6B00',
    secondary_color: '#1E293B',
    logo_url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=200&h=200&fit=crop',
    bg: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200',
    banner1_label: 'OFERTAS ELECTRICIDAD',
    banner1_title: 'Herramientas Eléctricas Pro',
    banner1_img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200',
    banner1_cat: 'Herramientas Eléctricas',
    banner1_active: true,
    banner2_label: 'KITS DE OBRA & PINTURA',
    banner2_title: 'Pinturería & Construcción',
    banner2_img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200',
    banner2_cat: 'Pinturería & Construcción',
    banner2_active: true,
    direccion: 'Av. San Martín 2450, Buenos Aires',
    horario: 'Lunes a Sábados de 8:00 a 19:30 hs',
    wapp: '5491141819344',
    nosotros: 'FerreNow es tu aliado de confianza para obras, reparaciones y hogar. Contamos con stock permanente de las principales marcas del mercado: DeWalt, Bosch, Stanley, Schneider y más.',
    status: 'ACTIVE',
    payment_status: 'UP_TO_DATE',
    plan_level: 'pro'
  },
  categories: [
    { name: 'Herramientas Eléctricas', emoji: '🔌' },
    { name: 'Herramientas Manuales', emoji: '🔧' },
    { name: 'Electricidad & Iluminación', emoji: '💡' },
    { name: 'Pinturería & Construcción', emoji: '🎨' }
  ],
  faqs: [
    { question: '¿Las herramientas cuentan con garantía oficial?', answer: 'Sí, todas las herramientas y máquinas eléctricas comercializadas por FerreNow cuentan con garantía oficial de fábrica (DeWalt, Bosch, Stanley, etc.) que va de 1 a 3 años según la marca.' },
    { question: '¿Hacen envíos de productos pesados o voluminosos?', answer: 'Sí, realizamos envíos de pintura, herramientas y materiales de obra directamente a tu domicilio o lugar de trabajo en el día.' },
    { question: '¿Realizan Factura A o B?', answer: 'Emitimos Factura A o B según lo requieras. Al finalizar tu pedido por WhatsApp, indícanos tu CUIT y Razón Social para adjuntar el comprobante fiscal.' },
    { question: '¿Tienen stock de todos los artículos publicados?', answer: 'Sí, nuestro catálogo se encuentra sincronizado en tiempo real con nuestro depósito central.' }
  ],
  products: [
    {
      nombre: 'Taladro Percutor DeWalt DCD771 20V Max',
      precio: 145000,
      stock: 10,
      categoria: 'Herramientas Eléctricas',
      emoji: '🔌',
      detalles: 'Taladro atornillador percutor inalámbrico con batería de litio 20V. Mandril autoajustable de 13mm, 2 velocidades variables (0-450 / 0-1500 RPM) y luz LED integrada. Incluye cargador rápido y valija rígida.',
      img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800',
      marca: 'DeWalt',
      origen: 'US',
      oculto: false,
      store_id: 'ferrenow'
    },
    {
      nombre: 'Amoladora Angular Bosch GWS 700 750W 4 1/2"',
      precio: 89500,
      stock: 14,
      categoria: 'Herramientas Eléctricas',
      emoji: '⚙️',
      detalles: 'Amoladora compacta de 750W con motor de alto rendimiento para discos de 115mm (4.5 pulgadas). Entrada de aire optimizada para mayor vida útil y mango ergonómico.',
      img: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800',
      marca: 'Bosch',
      origen: 'DE',
      oculto: false,
      store_id: 'ferrenow'
    },
    {
      nombre: 'Sierra Circular de Mano Stanley STSC1718 1700W',
      precio: 112000,
      stock: 8,
      categoria: 'Herramientas Eléctricas',
      emoji: '🪚',
      detalles: 'Sierra circular profesional con motor potente de 1700W y disco de 7-1/4" (185mm). Profundidad de corte ajustable hasta 62mm y guía paralela graduada.',
      img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
      marca: 'Stanley',
      origen: 'US',
      oculto: false,
      store_id: 'ferrenow'
    },
    {
      nombre: 'Juego de Llaves Combinadas Stanley x12 Piezas (8-19mm)',
      precio: 32400,
      stock: 20,
      categoria: 'Herramientas Manuales',
      emoji: '🔧',
      detalles: 'Set de 12 llaves combinadas (boca y corona) forjadas en acero Cromo Vanadio ultrarresistente. Incluye organizador de pared. Medidas: 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18 y 19 mm.',
      img: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=800',
      marca: 'Stanley',
      origen: 'US',
      oculto: false,
      store_id: 'ferrenow'
    },
    {
      nombre: 'Caja de Herramientas Plástica Profesional 19" Stanley',
      precio: 21800,
      stock: 18,
      categoria: 'Herramientas Manuales',
      emoji: '🧰',
      detalles: 'Caja portaherramientas reforzada con cierres metálicos inoxidables, bandeja interior removible y organizadores de tornillería en la tapa.',
      img: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800',
      marca: 'Stanley',
      origen: 'US',
      oculto: false,
      store_id: 'ferrenow'
    },
    {
      nombre: 'Set de Destornilladores de Precisión Aislados 1000V (x6)',
      precio: 18900,
      stock: 25,
      categoria: 'Herramientas Manuales',
      emoji: '🪛',
      detalles: 'Juego de destornilladores para electricista con aislación probada a 1000 Volts (IEC 60900). Puntas Planas y Phillips magnetizadas.',
      img: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800',
      marca: 'Bahco',
      origen: 'DE',
      oculto: false,
      store_id: 'ferrenow'
    },
    {
      nombre: 'Lámpara LED Bulbo 12W E27 Luz Fría (Pack x5)',
      precio: 8500,
      stock: 50,
      categoria: 'Electricidad & Iluminación',
      emoji: '💡',
      detalles: 'Pack de 5 focos LED de alta eficiencia (equivalente a 100W incandescente). Ahorro energético del 85% y vida útil de 15.000 horas.',
      img: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=800',
      marca: 'Philips',
      origen: 'AR',
      oculto: false,
      store_id: 'ferrenow'
    },
    {
      nombre: 'Prolongación Eléctrica Industrial Reforzada 10 Metros',
      precio: 16200,
      stock: 30,
      categoria: 'Electricidad & Iluminación',
      emoji: '🔌',
      detalles: 'Alargue prolongador reforzado de 10m con cable taller bi-capa 3x1.5mm y ficha triple inyectada ignífuga. Apto para obras y máquinas pesadas.',
      img: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=800',
      marca: 'FerreNow',
      origen: 'AR',
      oculto: false,
      store_id: 'ferrenow'
    },
    {
      nombre: 'Pintura Látex Interior/Exterior Blanco Mate 20 Litros',
      precio: 58000,
      stock: 12,
      categoria: 'Pinturería & Construcción',
      emoji: '🎨',
      detalles: 'Látex lavable cubritivo anti-hongo de máxima resistencia a la intemperie y al sol. Acabado blanco mate uniforme de secado rápido.',
      img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800',
      marca: 'Alba',
      origen: 'AR',
      oculto: false,
      store_id: 'ferrenow'
    },
    {
      nombre: 'Rodillo Antigota 22cm + Pincel 2" + Bandeja Pintor',
      precio: 9400,
      stock: 40,
      categoria: 'Pinturería & Construcción',
      emoji: '🖌️',
      detalles: 'Kit completo de pintura profesional: rodillo sintético antigota de 22cm con mango ergonómico, pincel plano n° 20 y bandeja plástica reforzada.',
      img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800',
      marca: 'El Galgo',
      origen: 'AR',
      oculto: false,
      store_id: 'ferrenow'
    }
  ]
};

// ── STORE 3: KIOSCOJULIO (Kiosco 24hs) ──────────────────────────────────
const storeKioscoJulio = {
  settings: {
    store_id: 'kioscojulio',
    business_name: 'Kiosco Julio',
    rubro: 'Kiosco 24hs',
    tagline: 'Lo que necesites, lo pedís y te llega al toque',
    h1: 'Pedí en el Kiosco',
    h2: 'sin ninguna demora',
    desc: 'Golosinas, chocolates, bebidas frías, galletitas y snacks con envíos súper rápidos.',
    emoji: '🍬',
    primary_color: '#E91E63',
    secondary_color: '#1E40AF',
    logo_url: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=200&h=200&fit=crop',
    bg: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200',
    banner1_label: 'ESPECIAL CHOCOLATES',
    banner1_title: 'Milka, Havanna & Cadbury',
    banner1_img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=1200',
    banner1_cat: 'Chocolates & Alfajores',
    banner1_active: true,
    banner2_label: 'BEBIDAS HELADAS 24HS',
    banner2_title: 'Cervezas, Red Bull & Gaseosas',
    banner2_img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=1200',
    banner2_cat: 'Bebidas & Cervezas',
    banner2_active: true,
    direccion: 'Garzón 1208, Buenos Aires',
    horario: 'Abierto las 24 Horas - Todos los días',
    wapp: '5491141819344',
    nosotros: 'Kiosco Julio es tu kiosco de barrio de confianza abierto las 24 hs. Contamos con el surtido más grande de chocolates, caramelos, galletitas y bebidas heladas listo para llevar o pedir a domicilio.',
    status: 'ACTIVE',
    payment_status: 'UP_TO_DATE',
    plan_level: 'pro'
  },
  categories: [
    { name: 'Chocolates & Alfajores', emoji: '🍫' },
    { name: 'Golosinas & Caramelos', emoji: '🍬' },
    { name: 'Bebidas & Cervezas', emoji: '🥤' },
    { name: 'Snacks & Galletitas', emoji: '🥔' }
  ],
  faqs: [
    { question: '¿Cuáles son los horarios de atención y envíos?', answer: 'Abrimos y realizamos envíos las 24 horas del día, los 7 días de la semana, los 365 días del año.' },
    { question: '¿Cuánto tarda en llegar mi pedido?', answer: 'Los envíos tardan en promedio entre 15 y 30 minutos desde que confirmamos la orden por WhatsApp.' },
    { question: '¿Las bebidas se entregan frías?', answer: 'Sí, todas nuestras bebidas, cervezas y energizantes se envían heladas en conservadoras térmicas.' },
    { question: '¿Hay un monto mínimo de compra?', answer: 'No tenemos monto mínimo. Podés pedir desde un alfajor o gaseosa hasta combos para reuniones.' }
  ],
  products: [
    {
      nombre: 'Chocolate Milka Entero con Avellanas (100g)',
      precio: 3200,
      stock: 45,
      categoria: 'Chocolates & Alfajores',
      emoji: '🍫',
      detalles: 'Riquísimo chocolate con leche alpina Milka relleno de avellanas enteras crocantes. (100g)',
      img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800',
      marca: 'Milka',
      origen: 'AR',
      oculto: false,
      store_id: 'kioscojulio'
    },
    {
      nombre: 'Alfajor Havanna Mixto (Caja x6 u)',
      precio: 9800,
      stock: 20,
      categoria: 'Chocolates & Alfajores',
      emoji: '🍪',
      detalles: 'Caja regalo con 3 alfajores cubiertos de chocolate semiamargo y 3 alfajores cubiertos de merengue italiano, rellenos de dulce de leche Havanna.',
      img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800',
      marca: 'Havanna',
      origen: 'AR',
      oculto: false,
      store_id: 'kioscojulio'
    },
    {
      nombre: 'Chocolate Cadbury Frutilla & Yogurt (80g)',
      precio: 2900,
      stock: 35,
      categoria: 'Chocolates & Alfajores',
      emoji: '🍫',
      detalles: 'Tableta de suave chocolate con leche Cadbury con cremoso relleno de crema de yogurt sabor frutilla.',
      img: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800',
      marca: 'Cadbury',
      origen: 'AR',
      oculto: false,
      store_id: 'kioscojulio'
    },
    {
      nombre: 'Gomitas Mogul Frutales Confitadas (150g)',
      precio: 1800,
      stock: 60,
      categoria: 'Golosinas & Caramelos',
      emoji: '🍬',
      detalles: 'Paquete de gomitas masticables sabor a frutas surtidas (frutilla, manzana, naranja y ananá).',
      img: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=800',
      marca: 'Arcor',
      origen: 'AR',
      oculto: false,
      store_id: 'kioscojulio'
    },
    {
      nombre: 'Caramelos Butter Toffes Arcor Dulce de Leche (150g)',
      precio: 2100,
      stock: 50,
      categoria: 'Golosinas & Caramelos',
      emoji: '🍬',
      detalles: 'Bolsa de exquisitos caramelos blandos de leche rellenos de dulce de leche fluido.',
      img: 'https://images.unsplash.com/photo-1575224300306-1b8da36134ec?w=800',
      marca: 'Arcor',
      origen: 'AR',
      oculto: false,
      store_id: 'kioscojulio'
    },
    {
      nombre: 'Coca-Cola Sabor Original (Lata 473ml Helada)',
      precio: 1800,
      stock: 80,
      categoria: 'Bebidas & Cervezas',
      emoji: '🥤',
      detalles: 'Lata de Coca-Cola sabor original 473ml bien fría, ideal para acompañar tus comidas.',
      img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800',
      marca: 'Coca-Cola',
      origen: 'AR',
      oculto: false,
      store_id: 'kioscojulio'
    },
    {
      nombre: 'Energizante Red Bull Energy Drink (250ml)',
      precio: 2600,
      stock: 40,
      categoria: 'Bebidas & Cervezas',
      emoji: '⚡',
      detalles: 'Bebida energizante funcional con cafeína, taurina y vitaminas del grupo B. Vitaliza cuerpo y mente.',
      img: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=800',
      marca: 'Red Bull',
      origen: 'AT',
      oculto: false,
      store_id: 'kioscojulio'
    },
    {
      nombre: 'Cerveza Quilmes Clásica (Lata 473ml Helada)',
      precio: 2100,
      stock: 70,
      categoria: 'Bebidas & Cervezas',
      emoji: '🍺',
      detalles: 'Cerveza lager argentina equilibrada de color dorado brillante y espuma cremosa. 473ml lista para consumir.',
      img: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800',
      marca: 'Quilmes',
      origen: 'AR',
      oculto: false,
      store_id: 'kioscojulio'
    },
    {
      nombre: 'Papas Fritas Lays Clásicas (140g)',
      precio: 2800,
      stock: 40,
      categoria: 'Snacks & Galletitas',
      emoji: '🥔',
      detalles: 'Papas fritas cortadas en finas rodajas, crocantes y saladas en su punto justo. Paquete familiar 140g.',
      img: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=800',
      marca: 'Lays',
      origen: 'AR',
      oculto: false,
      store_id: 'kioscojulio'
    },
    {
      nombre: 'Galletitas Chocolinas Originales (250g)',
      precio: 2300,
      stock: 55,
      categoria: 'Snacks & Galletitas',
      emoji: '🍪',
      detalles: 'Las clásicas galletitas de chocolate con sabor único. Perfectas para la merienda y para preparar chocotorta. (250g)',
      img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800',
      marca: 'Bagley',
      origen: 'AR',
      oculto: false,
      store_id: 'kioscojulio'
    }
  ]
};

async function seedStore(storeData) {
  const storeId = storeData.settings.store_id;
  console.log(`\n=================== SEEDING STORE: ${storeId} ===================`);

  // 1. Update/Upsert company_settings
  const setCheckRes = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${encodeURIComponent(storeId)}`, { headers });
  const existingSet = await setCheckRes.json();

  if (existingSet && existingSet.length > 0) {
    const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${encodeURIComponent(storeId)}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(storeData.settings)
    });
    console.log('PATCH company_settings:', patchRes.status);
  } else {
    const postRes = await fetch(`${SUPABASE_URL}/rest/v1/company_settings`, {
      method: 'POST',
      headers,
      body: JSON.stringify(storeData.settings)
    });
    console.log('POST company_settings:', postRes.status);
  }

  // Also seed alias for ferre-now if ferrenow
  if (storeId === 'ferrenow') {
    const ferrenowAliasSettings = { ...storeData.settings, store_id: 'ferre-now' };
    const aliasCheck = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.ferre-now`, { headers });
    const existingAlias = await aliasCheck.json();
    if (existingAlias && existingAlias.length > 0) {
      await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.ferre-now`, { method: 'PATCH', headers, body: JSON.stringify(ferrenowAliasSettings) });
    } else {
      await fetch(`${SUPABASE_URL}/rest/v1/company_settings`, { method: 'POST', headers, body: JSON.stringify(ferrenowAliasSettings) });
    }
  }

  // 2. Clear old products, categories & faqs
  await fetch(`${SUPABASE_URL}/rest/v1/products?store_id=eq.${encodeURIComponent(storeId)}`, { method: 'DELETE', headers });
  await fetch(`${SUPABASE_URL}/rest/v1/categories?store_id=eq.${encodeURIComponent(storeId)}`, { method: 'DELETE', headers });
  await fetch(`${SUPABASE_URL}/rest/v1/faqs?store_id=eq.${encodeURIComponent(storeId)}`, { method: 'DELETE', headers });

  if (storeId === 'ferrenow') {
    await fetch(`${SUPABASE_URL}/rest/v1/products?store_id=eq.ferre-now`, { method: 'DELETE', headers });
    await fetch(`${SUPABASE_URL}/rest/v1/categories?store_id=eq.ferre-now`, { method: 'DELETE', headers });
    await fetch(`${SUPABASE_URL}/rest/v1/faqs?store_id=eq.ferre-now`, { method: 'DELETE', headers });
  }

  // 3. Insert categories with 'name' column
  let catIdx = 0;
  for (const catObj of storeData.categories) {
    catIdx++;
    const catPayload = {
      store_id: storeId,
      name: catObj.name,
      emoji: catObj.emoji || '📦',
      display_order: catIdx * 10,
      active: true,
      rubro: storeData.settings.rubro
    };
    const catRes = await fetch(`${SUPABASE_URL}/rest/v1/categories`, {
      method: 'POST',
      headers,
      body: JSON.stringify(catPayload)
    });
    if (!catRes.ok) console.error(`Error inserting category ${catObj.name}:`, await catRes.text());

    if (storeId === 'ferrenow') {
      await fetch(`${SUPABASE_URL}/rest/v1/categories`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ ...catPayload, store_id: 'ferre-now' })
      });
    }
  }
  console.log(`Categorías insertadas (${storeData.categories.length})`);

  // 4. Insert FAQs
  if (storeData.faqs) {
    for (const faq of storeData.faqs) {
      const faqPayload = {
        store_id: storeId,
        question: faq.question,
        answer: faq.answer
      };
      await fetch(`${SUPABASE_URL}/rest/v1/faqs`, {
        method: 'POST',
        headers,
        body: JSON.stringify(faqPayload)
      });
      if (storeId === 'ferrenow') {
        await fetch(`${SUPABASE_URL}/rest/v1/faqs`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ ...faqPayload, store_id: 'ferre-now' })
        });
      }
    }
    console.log(`FAQs insertadas (${storeData.faqs.length})`);
  }

  // 5. Insert 10 products
  let count = 0;
  for (const prod of storeData.products) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
      method: 'POST',
      headers,
      body: JSON.stringify(prod)
    });
    if (res.ok) count++; else console.error(`Error inserting ${prod.nombre}:`, await res.text());

    if (storeId === 'ferrenow') {
      const aliasProd = { ...prod, store_id: 'ferre-now' };
      await fetch(`${SUPABASE_URL}/rest/v1/products`, { method: 'POST', headers, body: JSON.stringify(aliasProd) });
    }
  }
  console.log(`Productos insertados (${count}/10)`);
}

async function main() {
  await seedStore(storeNoutacc);
  await seedStore(storeFerrenow);
  await seedStore(storeKioscoJulio);
  console.log('\n¡TODAS LAS TIENDAS DEMO FUERON RE-POBLADAS CON FOTOS, BANNERS Y FAQS!');
}

main().catch(console.error);
