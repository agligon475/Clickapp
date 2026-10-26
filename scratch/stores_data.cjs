/**
 * stores_data.js
 * Datos completos, de máxima calidad artesanal y exhaustivos para las 7 cuentas demo oficiales.
 */

module.exports = [
  // ─────────────────────────────────────────────────────────────
  // 1. FERRENOW (Ferretería Industrial)
  // ─────────────────────────────────────────────────────────────
  {
    store_id: 'ferre-now',
    business_name: 'FerreNow — Ferretería Industrial & Herramientas',
    tagline: '35 años equipando profesionales, obras y talleres con primeras marcas y asesoramiento técnico',
    wapp: '5491133221100',
    rubro: 'Ferretería & Construcción',
    subrubro: 'Herramientas Eléctricas & Fijaciones',
    direccion: 'Av. Hipólito Yrigoyen 4250, Lanús Oeste, AMBA',
    horario: 'Lun a Vie 08:00–18:30 hs | Sáb 08:30–13:30 hs (Domingos cerrado)',
    primary_color: '#F59E0B',
    secondary_color: '#18181B',
    logo_url: '/img/logos/ferrenow-logo.jpg',
    bg: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=1600&q=85',
    h1: 'POTENCIA Y PRECISIÓN',
    h2: 'PARA TU TALLER Y TU OBRA',
    desc: 'Herramientas eléctricas y a batería DeWalt, Bosch, Stanley y Makita. Stock permanente de tornillería, discos de corte, adhesivos industriales y elementos de fijación. Envíos express a obra con logística propia y Dale!QueVoy.',
    emoji: '🔧',
    theme: 'dark',
    font: 'Space Grotesk',
    font_body: 'Poppins',
    instagram: '@ferrenow.ar',
    facebook: 'facebook.com/ferrenow.ar',
    social_web: 'https://ferre-now.daletepido.com.ar',
    social_ig: '@ferrenow.ar',
    social_fb: 'ferrenow.ar',
    social_maps: 'https://maps.google.com/?q=Av.+Hipolito+Yrigoyen+4250,+Lanus+Oeste',
    admin_email: 'ventas@ferrenow.com.ar',
    pay_cash: true,
    pay_transfer: true,
    pay_agreement: true,
    banner1_label: 'LÍNEA INALÁMBRICA 20V MAX',
    banner1_title: 'Taladros Percutores & Rotomartillos DeWalt',
    banner1_img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200',
    banner1_cat: 'Herramientas Eléctricas',
    banner1_bg: '#1c1c1e',
    banner1_active: true,
    banner2_label: 'SEGURIDAD & PROTECCIÓN CERTIFICADA',
    banner2_title: 'Calzados de Trabajo, Guantes & Antiparras 3M',
    banner2_img: 'https://images.unsplash.com/photo-1578885136359-16c8bd4d3a8e?w=1200',
    banner2_cat: 'Seguridad Industrial',
    banner2_bg: '#1c1c1e',
    banner2_active: true,
    status: 'ACTIVE',
    payment_status: 'UP_TO_DATE',
    plan_level: 'pro',
    nosotros: 'FerreNow nació en 1988 como un pequeño taller y despacho de bulones en el corazón de Lanús. Con tres décadas y media de trabajo ininterrumpido, nos transformamos en el socio estratégico de más de 450 herreros, constructores, electricistas, mecánicos e industrias de zona sur y CABA. Nuestro valor diferencial no es solo el stock inagotable de más de 12.000 ítems en estanterías, sino nuestro equipo de mostrador: técnicos que entienden de torque, aleaciones, watts, consumibles y normativas de seguridad para recomendarte exactamente la herramienta que resuelve tu trabajo sin sobrecostos.',
    horarios_data: JSON.stringify([
      { day: 'Lunes a Viernes', hours: '08:00 - 18:30 hs' },
      { day: 'Sábados', hours: '08:30 - 13:30 hs' },
      { day: 'Domingos y Feriados', hours: 'Cerrado (Despacho programado a obras)' }
    ]),
    faq_data: JSON.stringify([
      {
        question: '¿Hacen envíos pesados o de volumen directo a pie de obra?',
        answer: 'Sí. Contamos con camioneta propia para envíos de bultos pesados en todo Lanús, Avellaneda, Lomas de Zamora y CABA. Para pedidos chicos y medianos de hasta 15 kg, despachamos en menos de 45 minutos mediante la red Dale!QueVoy.'
      },
      {
        question: '¿Emiten Factura A para empresas y monotributistas?',
        answer: 'Emitimos Factura A y B de forma automática al momento de confirmar tu pedido. Solo debés ingresar tu CUIT y Razón Social en el carrito de compras.'
      },
      {
        question: '¿Qué garantía tienen las herramientas eléctricas y a batería?',
        answer: 'Todas las máquinas cuentan con 12 a 36 meses de Garantía Oficial de fábrica (DeWalt, Bosch, Stanley, Makita, Gamma) con servicio técnico autorizado directo y repuestos legítimos.'
      },
      {
        question: '¿Tienen venta por mayor o cajas cerradas de tornillería y consumibles?',
        answer: 'Sí, aplicamos descuentos por escala de 10%, 15% y 20% en cajas cerradas de fijaciones Tel, bulones G8, discos abrasivos Tyrolit y electrodos Conarco.'
      },
      {
        question: '¿Cuáles son los medios de pago disponibles?',
        answer: 'Aceptamos Efectivo con 10% de descuento en mostrador/entrega, Transferencia bancaria directa con acreditación inmediata (Alias / CBU) y Mercado Pago (tarjetas de crédito, débito y dinero en cuenta).'
      }
    ]),
    billing_info: {
      cuit_cuil: '30-68994421-4',
      razon_social: 'FERRENOW INDUSTRIAL S.A.',
      condicion_iva: 'Responsable Inscripto',
      direccion_fiscal: 'Av. Hipólito Yrigoyen 4250, Lanús Oeste, Provincia de Buenos Aires',
      email_facturacion: 'administracion@ferrenow.com.ar',
      design: {
        brand_style: 'industrial',
        primary_color: '#F59E0B',
        secondary_color: '#18181B',
        hero_overlay: 'rgba(0,0,0,0.7)',
        hero_img_opacity: '0.85',
        h1Color: '#FFFFFF',
        h2Color: '#F59E0B',
        descColor: '#E4E4E7'
      }
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 2. KIOSCOJULIO (Kiosco 24hs)
  // ─────────────────────────────────────────────────────────────
  {
    store_id: 'kioscojulio',
    business_name: 'Kiosco Julio 24hs — Snacks, Bebidas & Golosinas',
    tagline: 'La esquina de Flores que nunca duerme: bebidas heladas, golosinas importadas y snacks al instante',
    wapp: '5491166778899',
    rubro: 'Kiosco & Bebidas 24hs',
    subrubro: 'MaxiKiosco & Golosinas',
    direccion: 'Av. Rivadavia 6520, Flores, CABA',
    horario: 'Abierto las 24 horas, los 365 días del año (Guardia nocturna activa)',
    primary_color: '#8B5CF6',
    secondary_color: '#0F172A',
    logo_url: '/img/logos/kioscojulio-logo.jpg',
    bg: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=1600&q=85',
    h1: '24 HORAS ABIERTO',
    h2: 'TUS ANTOJOS Y BEBIDAS AL TOQUE',
    desc: 'Golosinas nacionales e importadas, chocolates artesanales, cervezas bajo cero, energizantes, snacks salados y cigarrillos. Delivery en 15 a 30 minutos a tu puerta por Dale!QueVoy o retiro en ventanilla nocturna sin demoras.',
    emoji: '🍭',
    theme: 'dark',
    font: 'Poppins',
    font_body: 'Poppins',
    instagram: '@kioscojulio24hs',
    facebook: 'facebook.com/kioscojulio24hs',
    social_web: 'https://kioscojulio.daletepido.com.ar',
    social_ig: '@kioscojulio24hs',
    social_fb: 'kioscojulio24hs',
    social_maps: 'https://maps.google.com/?q=Av.+Rivadavia+6520,+Flores,+CABA',
    admin_email: 'julio.kiosco@gmail.com',
    pay_cash: true,
    pay_transfer: true,
    pay_agreement: true,
    banner1_label: 'COMBO PREVIA NOCTURNA',
    banner1_title: 'Fernet Branca 750ml + 2 Coca-Cola 1.5L + Bolsa de Hielo',
    banner1_img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200',
    banner1_cat: 'Bebidas & Alcohol',
    banner1_bg: '#1e1b4b',
    banner1_active: true,
    banner2_label: 'TENTACIONES & CHOCOLATES',
    banner2_title: 'Milka Oreo, Rapanui Franui & Alfajores Havanna Mar del Plata',
    banner2_img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=1200',
    banner2_cat: 'Chocolates & Golosinas',
    banner2_bg: '#1e1b4b',
    banner2_active: true,
    status: 'ACTIVE',
    payment_status: 'UP_TO_DATE',
    plan_level: 'pro',
    nosotros: 'Kiosco Julio nació hace más de dos décadas en la emblemática esquina de Rivadavia y Membrillar, en el corazón de Flores. Empezamos con una persiana de chapa y una pequeña heladera de gaseosas; hoy somos el faro nocturno de miles de vecinos, estudiantes, trabajadores de guardia y amigos que arman la previa. Atendido por Julio, su hijo Matías y nuestro equipo de confianza, acá encontrás desde la golosina vintage que creías extinta hasta las últimas importaciones virales de TikTok, bebidas a temperatura bajo cero y café caliente las 24 horas.',
    horarios_data: JSON.stringify([
      { day: 'Lunes a Domingo', hours: 'Atención 24 Horas Ininterrumpida' }
    ]),
    faq_data: JSON.stringify([
      {
        question: '¿Hacen envíos durante toda la noche y madrugada?',
        answer: '¡Sí! Toda la noche tenemos cadetes conectados con Dale!QueVoy y guardia propia para despachar tu pedido en 15 a 30 minutos a Caballito, Flores, Floresta, Parque Chacabuco y Almagro.'
      },
      {
        question: '¿Las bebidas llegan realmente frías?',
        answer: 'Nuestras heladeras exhibidoras y freezer de cervezas trabajan a -2°C calibrados permanentemente. Si pedís hielo o bebidas, llegan heladas listas para servir.'
      },
      {
        question: '¿Puedo retirar por ventanilla sin bajar del auto o caminando de noche?',
        answer: 'Totalmente. Contamos con ventanilla de seguridad blindada sobre Av. Rivadavia para compras rápidas de madrugada sin demoras.'
      },
      {
        question: '¿Tienen cigarrillos, tabaco para armar y encendedores?',
        answer: 'Sí, contamos con stock completo de marcas tabacaleras oficiales (Philip Morris, Marlboro, Lucky Strike, Chesterfield), filtros, sedas OCB y encendedores Clipper.'
      },
      {
        question: '¿Qué medios de pago aceptan?',
        answer: 'Aceptamos Efectivo contra entrega, Transferencia bancaria directa por QR/Alias y Mercado Pago (dinero en cuenta y tarjetas de débito/crédito).'
      }
    ]),
    billing_info: {
      cuit_cuil: '20-24991188-3',
      razon_social: 'JULIO ALBERTO MORALES',
      condicion_iva: 'Monotributo',
      direccion_fiscal: 'Av. Rivadavia 6520, CABA',
      email_facturacion: 'kioscojulio.facturacion@gmail.com',
      design: {
        brand_style: 'neon',
        primary_color: '#8B5CF6',
        secondary_color: '#0F172A',
        hero_overlay: 'rgba(15,23,42,0.75)',
        hero_img_opacity: '0.85',
        h1Color: '#FFFFFF',
        h2Color: '#C084FC',
        descColor: '#E2E8F0'
      }
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 3. NOUTACC (Sin TACC)
  // ─────────────────────────────────────────────────────────────
  {
    store_id: 'noutacc',
    business_name: 'Noutacc — Delicias 100% Sin TACC',
    tagline: 'Panificados y pastelería artesanal libre de gluten: cocina 100% segura y sabor inigualable',
    wapp: '5491155443322',
    rubro: 'Gastronomía & Panadería Sin Gluten',
    subrubro: 'Pastelería & Cafetería 100% Sin TACC',
    direccion: 'Juramento 2140, Belgrano, CABA',
    horario: 'Mar a Dom 08:30–20:00 hs (Lunes cerrado por sanitización profunda de planta)',
    primary_color: '#10B981',
    secondary_color: '#18181B',
    logo_url: '/img/logos/noutacc-logo.jpg',
    bg: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&q=85',
    h1: '100% LIBRE DE GLUTEN',
    h2: 'EL SABOR QUE TANTO EXTRAÑABAS',
    desc: 'Cocina 100% certificada libre de contaminación cruzada (ANMAT). Medialunas de manteca hojaldradas, panes de masa madre de masa tierna, tortas de autor y viandas congeladas listas para hornear. Envíos sellados térmicamente a todo CABA y AMBA.',
    emoji: '🌾',
    theme: 'dark',
    font: 'Josefin Sans',
    font_body: 'Poppins',
    instagram: '@noutacc.ar',
    facebook: 'facebook.com/noutacc.ar',
    social_web: 'https://noutacc.daletepido.com.ar',
    social_ig: '@noutacc.ar',
    social_fb: 'noutacc.ar',
    social_maps: 'https://maps.google.com/?q=Juramento+2140,+Belgrano,+CABA',
    admin_email: 'hola@noutacc.com.ar',
    pay_cash: true,
    pay_transfer: true,
    pay_agreement: true,
    banner1_label: 'DESAYUNOS & MERIENDAS',
    banner1_title: 'Docena de Medialunas de Manteca Hojaldradas Sin TACC',
    banner1_img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1200',
    banner1_cat: 'Panadería & Facturas',
    banner1_bg: '#064e3b',
    banner1_active: true,
    banner2_label: 'PASTELERÍA DE AUTOR',
    banner2_title: 'Cheesecake de Frutos Rojos Patagónicos & Marquise Belga',
    banner2_img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=1200',
    banner2_cat: 'Pastelería & Tortas',
    banner2_bg: '#064e3b',
    banner2_active: true,
    status: 'ACTIVE',
    payment_status: 'UP_TO_DATE',
    plan_level: 'pro',
    nosotros: 'Noutacc nació del amor y la necesidad familiar. Cuando a nuestra hija menor le diagnosticaron celiaquía a los 3 años, descubrimos lo difícil que era conseguir productos sin gluten que no parecieran cartón o se desgranaran al primer bocado. Decidimos estudiar panadería avanzada y bioquímica de almidones para lograr lo que muchos decían imposible: un hojaldre crocante y mantecoso, panes con miga alveolada que aguantan sándwiches enteros y tortas gourmet indistinguibles de las tradicionales. Nuestra planta de Belgrano es 100% hermética y dedicada exclusivamente a productos Sin TACC.',
    horarios_data: JSON.stringify([
      { day: 'Martes a Sábado', hours: '08:30 - 20:00 hs' },
      { day: 'Domingos', hours: '09:00 - 19:30 hs' },
      { day: 'Lunes', hours: 'Cerrado (Producción & Sanitización)' }
    ]),
    faq_data: JSON.stringify([
      {
        question: '¿Cómo garantizan que no haya contaminación cruzada?',
        answer: 'Nuestra planta de producción no ingresa ninguna materia prima con gluten. Todos los ingredientes cuentan con certificación oficial ANMAT y análisis de laboratorio periódico (<5 ppm de gluten). Además, cada producto se empaca y sella al vacío antes de salir al mostrador.'
      },
      {
        question: '¿Los productos congelados cómo se cocinan?',
        answer: 'Nuestras pizzas, empanadas y chipás van del freezer directo al horno precalentado a 200°C sin necesidad de descongelar previamente, quedando dorados y crocantes en 12 a 15 minutos.'
      },
      {
        question: '¿Hacen tortas de cumpleaños personalizadas?',
        answer: 'Sí, podés encargar tortas de 1.5 kg, 2 kg y 3 kg con 24 a 48 hs de anticipación (Chocotorta, Rogel, Marquise, Lemon Pie, Red Velvet). Incluyen velita y cartel comestible personalizado.'
      },
      {
        question: '¿Hasta dónde llegan los envíos a domicilio?',
        answer: 'Despachamos en el día a todo CABA con cadetes de confianza y cajas térmicas especiales. Para zona norte y oeste de AMBA, coordinamos envíos programados con franja horaria.'
      },
      {
        question: '¿Qué medios de pago aceptan?',
        answer: 'Efectivo con 10% de beneficio en retiro o entrega, Transferencia inmediata con Alias / CBU y Mercado Pago.'
      }
    ]),
    billing_info: {
      cuit_cuil: '30-71775533-9',
      razon_social: 'NOUTACC DELICIAS ARTESANALES S.R.L.',
      condicion_iva: 'Responsable Inscripto',
      direccion_fiscal: 'Juramento 2140, CABA',
      email_facturacion: 'administracion@noutacc.com.ar',
      design: {
        brand_style: 'artisan',
        primary_color: '#10B981',
        secondary_color: '#18181B',
        hero_overlay: 'rgba(0,0,0,0.65)',
        hero_img_opacity: '0.85',
        h1Color: '#FFFFFF',
        h2Color: '#34D399',
        descColor: '#E4E4E7'
      }
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 4. TECNOMONT (Tecnología & Gaming)
  // ─────────────────────────────────────────────────────────────
  {
    store_id: 'tecnomont',
    business_name: 'TecnoMont — Tecnología, Gaming & Accesorios',
    tagline: 'Hardware de alta gama, periféricos gamer profesionales y accesorios premium con garantía oficial',
    wapp: '5491177889900',
    rubro: 'Tecnología & Electrónica',
    subrubro: 'Gaming & Periféricos de Computación',
    direccion: 'Av. Cabildo 2420, Belgrano, CABA',
    horario: 'Lun a Sáb 10:00–19:30 hs (Domingos cerrado)',
    primary_color: '#06B6D4',
    secondary_color: '#0B0F19',
    logo_url: '/img/logos/tecnomont-logo.jpg',
    bg: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=85',
    h1: 'ELEVA TU SETUP',
    h2: 'HARDWARE Y GAMING DE ÉLITE',
    desc: 'Distribuidor oficial Logitech G, Redragon, HyperX, Kingston y JBL. Auriculares 7.1 con cancelación de ruido, teclados mecánicos hot-swappable, mouses ultralivianos y almacenamiento SSD NVMe. Factura A y B, garantía escrita 12 meses y envíos en el día.',
    emoji: '⚡',
    theme: 'dark',
    font: 'Space Grotesk',
    font_body: 'Poppins',
    instagram: '@tecnomont.ar',
    facebook: 'facebook.com/tecnomont.ar',
    social_web: 'https://tecnomont.daletepido.com.ar',
    social_ig: '@tecnomont.ar',
    social_fb: 'tecnomont.ar',
    social_maps: 'https://maps.google.com/?q=Av.+Cabildo+2420,+Belgrano,+CABA',
    admin_email: 'ventas@tecnomont.com.ar',
    pay_cash: true,
    pay_transfer: true,
    pay_agreement: true,
    banner1_label: 'SETUP COMPETITIVO PRO',
    banner1_title: 'Teclados Mecánicos Hot-Swap RGB & Mouses 26K DPI',
    banner1_img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200',
    banner1_cat: 'Teclados & Mouses',
    banner1_bg: '#082f49',
    banner1_active: true,
    banner2_label: 'AUDIO INMERSIVO ESPACIAL',
    banner2_title: 'Headsets Inalámbricos 7.1 Surround & Micrófonos Condensador',
    banner2_img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200',
    banner2_cat: 'Audio & Auriculares',
    banner2_bg: '#082f49',
    banner2_active: true,
    status: 'ACTIVE',
    payment_status: 'UP_TO_DATE',
    plan_level: 'pro',
    nosotros: 'TecnoMont se fundó en 2015 por un grupo de ingenieros informáticos y apasionados del gaming competitivo y la producción digital. Cansados de comprar periféricos genéricos o imitaciones sin soporte, decidimos asociarnos directamente con los importadores oficiales de las marcas número uno del mundo. En nuestro showroom de Cabildo podés probar teclados mecánicos con diferentes switches (Red, Blue, Brown), calzar auriculares para evaluar aislamiento sonoro y pedir asesoramiento experto para optimizar tu estación de trabajo o streaming.',
    horarios_data: JSON.stringify([
      { day: 'Lunes a Viernes', hours: '10:00 - 19:30 hs' },
      { day: 'Sábados', hours: '10:00 - 18:00 hs' },
      { day: 'Domingos y Feriados', hours: 'Cerrado' }
    ]),
    faq_data: JSON.stringify([
      {
        question: '¿Los productos son 100% originales y en caja sellada?',
        answer: 'Absolutamente. Todos nuestros artículos son nuevos, originales y cerrados de fábrica con número de serie verificable y faja de seguridad holográfica.'
      },
      {
        question: '¿Qué garantía tienen y cómo funciona el servicio técnico?',
        answer: 'Brindamos 12 meses de garantía directa con TecnoMont y extensión con la marca oficial. Si un producto presenta una falla de fábrica en los primeros 30 días, te lo reemplazamos de inmediato por uno nuevo en el acto.'
      },
      {
        question: '¿Hacen envíos express en moto para recibir hoy mismo?',
        answer: 'Sí. Si realizás tu pedido antes de las 15:00 hs en CABA o primer cordón de AMBA, recibís en el día en la puerta de tu domicilio a través de Dale!QueVoy con seguro de transporte incluido.'
      },
      {
        question: '¿Emiten Factura A con CUIT?',
        answer: 'Sí, emitimos Factura A y B de forma electrónica automática en todas las compras.'
      },
      {
        question: '¿Cuáles son los medios de pago disponibles?',
        answer: 'Efectivo con 15% de descuento especial en el local/entrega, Transferencia bancaria directa con Alias inmediato y Mercado Pago (hasta 6 cuotas con tarjetas bancarias).'
      }
    ]),
    billing_info: {
      cuit_cuil: '30-71556622-1',
      razon_social: 'TECNOMONT GAMING & TECH S.A.',
      condicion_iva: 'Responsable Inscripto',
      direccion_fiscal: 'Av. Cabildo 2420, CABA',
      email_facturacion: 'administracion@tecnomont.com.ar',
      design: {
        brand_style: 'cyber',
        primary_color: '#06B6D4',
        secondary_color: '#0B0F19',
        hero_overlay: 'rgba(11,15,25,0.75)',
        hero_img_opacity: '0.85',
        h1Color: '#FFFFFF',
        h2Color: '#38BDF8',
        descColor: '#E2E8F0'
      }
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 5. BIUTI (Indumentaria Femenina +35 / Palermo, CABA)
  // ─────────────────────────────────────────────────────────────
  {
    store_id: 'biuti',
    business_name: 'Biuti — Moda Femenina Contemporánea',
    tagline: 'Diseño de autor en Palermo Soho: elegancia atemporal, calces perfectos y géneros nobles para mujeres reales',
    wapp: '5491145678900',
    rubro: 'Indumentaria & Calzado',
    subrubro: 'Moda Femenina +35 / Pret-a-Porter & Noche',
    direccion: 'Gurruchaga 1720, Palermo Soho, CABA',
    horario: 'Lun a Sáb 11:00–20:00 hs | Dom 14:00–19:30 hs',
    primary_color: '#BE185D',
    secondary_color: '#18181B',
    logo_url: '/img/logos/biuti-logo.jpg',
    bg: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=85',
    h1: 'ELEGANCIA Y CONFORT',
    h2: 'DISEÑADO PARA TU VIDA REAL',
    desc: 'Colección pensada para mujeres +35 que no negocian estilo por comodidad. Blazers sastreros fluidos, pantalones con tiro impecable, camisería de lino puro italiano y vestidos versátiles del día a la noche. Curva completa del talle 38 al 50. Envíos express y cambio a domicilio sin cargo.',
    emoji: '✨',
    theme: 'dark',
    font: 'Josefin Sans',
    font_body: 'Poppins',
    instagram: '@biuti.palermo',
    facebook: 'facebook.com/biuti.palermo',
    social_web: 'https://biuti.daletepido.com.ar',
    social_ig: '@biuti.palermo',
    social_fb: 'biuti.palermo',
    social_maps: 'https://maps.google.com/?q=Gurruchaga+1720,+Palermo+Soho,+CABA',
    admin_email: 'contacto@biutipalermo.com.ar',
    pay_cash: true,
    pay_transfer: true,
    pay_agreement: true,
    banner1_label: 'NUEVA TEMPORADA OTOÑO/INVIERNO',
    banner1_title: 'Blazers Sastreros Cruzados & Pantalones Palazzo Wide Leg',
    banner1_img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200',
    banner1_cat: 'Sastrería & Abrigos',
    banner1_bg: '#4c0519',
    banner1_active: true,
    banner2_label: 'GÉNEROS NOBLES & LINO',
    banner2_title: 'Vestidos Midi Versátiles & Camisas de Lino Puro',
    banner2_img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200',
    banner2_cat: 'Vestidos & Monos',
    banner2_bg: '#4c0519',
    banner2_active: true,
    status: 'ACTIVE',
    payment_status: 'UP_TO_DATE',
    plan_level: 'pro',
    nosotros: 'Biuti nació en el corazón de Palermo Soho de la mano de dos diseñadoras y amigas de toda la vida. Al superar los 35 años, nos dimos cuenta de que la industria de la moda ofrecía dos extremos: ropa pensada para adolescentes que no resiste un día de reuniones ni respeta cuerpos reales, o prendas clásicas aburridas y acartonadas. En Biuti creamos prendas contemporáneas, sofisticadas y duraderas: telas con caída noble (lino, viscosa pesada, gabardina con spandex, crepé italiano), pinzas estudiadas para estilizar y terminaciones de sastrería que te acompañan de la oficina a una cena con amigas.',
    horarios_data: JSON.stringify([
      { day: 'Lunes a Sábado', hours: '11:00 - 20:00 hs' },
      { day: 'Domingos', hours: '14:00 - 19:30 hs' }
    ]),
    faq_data: JSON.stringify([
      {
        question: '¿Cómo elijo mi talle correctamente?',
        answer: 'En cada prenda disponés de una tabla de medidas exactas en centímetros (busto, cintura, cadera y largo). Si tenés dudas, nuestro equipo te asiste en tiempo real por WhatsApp con fotos y medidas reales de la prenda antes de enviarla.'
      },
      {
        question: '¿Cómo funciona la política de cambios a domicilio?',
        answer: 'Tenés 30 días para cambiar cualquier prenda. Si estás en CABA o AMBA, nuestro servicio de mensajería te lleva el nuevo talle a tu puerta y retira el anterior sin costo extra en tu primer cambio.'
      },
      {
        question: '¿Qué tipo de telas y confección utilizan?',
        answer: 'Priorizamos fibras naturales y mezclas nobles de alto gramaje: lino lavado que no pica, gabardinas de algodón peinado con elastómero para mayor libertad de movimiento y sedas sintéticas de tacto piel de durazno que no se arrugan con facilidad.'
      },
      {
        question: '¿Hacen envíos a todo el país?',
        answer: 'Sí, despachamos en el día a todo el país por Correo Argentino / Andreani y en el día en CABA y AMBA a través de mensajería express.'
      },
      {
        question: '¿Cuáles son las formas de pago y cuotas?',
        answer: 'Ofrecemos 15% de descuento por Transferencia bancaria directa y hasta 3 y 6 Cuotas Sin Interés con todas las tarjetas a través de Mercado Pago.'
      }
    ]),
    billing_info: {
      cuit_cuil: '30-71882299-6',
      razon_social: 'BIUTI ATELIER PALERMO S.R.L.',
      condicion_iva: 'Responsable Inscripto',
      direccion_fiscal: 'Gurruchaga 1720, Palermo, CABA',
      email_facturacion: 'administracion@biutipalermo.com.ar',
      design: {
        brand_style: 'editorial',
        primary_color: '#BE185D',
        secondary_color: '#18181B',
        hero_overlay: 'rgba(24,24,27,0.7)',
        hero_img_opacity: '0.85',
        h1Color: '#FFFFFF',
        h2Color: '#FB7185',
        descColor: '#E4E4E7'
      }
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 6. TODOLISTO (Librería & Papelería / San Justo, AMBA)
  // ─────────────────────────────────────────────────────────────
  {
    store_id: 'todolisto',
    business_name: 'TodoListo — Librería, Papelería & Insumos',
    tagline: 'Todo para el colegio, la facultad, la oficina y el estudio: stock mayorista, listas escolares y precios de distribuidora',
    wapp: '5491122334455',
    rubro: 'Librería & Papelería',
    subrubro: 'Librería Escolar, Comercial & Artística',
    direccion: 'Dr. Ignacio Arieta 3150, San Justo, La Matanza, AMBA',
    horario: 'Lun a Vie 08:30–19:30 hs | Sáb 09:00–14:00 hs',
    primary_color: '#0284C7',
    secondary_color: '#0F172A',
    logo_url: '/img/logos/todolisto-logo.jpg',
    bg: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=85',
    h1: 'TODO PARA ESTUDIAR Y TRABAJAR',
    h2: 'EN UN SOLO LUGAR Y AL MEJOR PRECIO',
    desc: 'Resmas por mayor Autor y Ledesma, cuadernos universitarios, marcadores Posca y Sharpie, mochilas ergonómicas e insumos de oficina completos. Envianos tu lista escolar por WhatsApp y te la armamos en 20 minutos con 15% de descuento. Envíos rápidos en San Justo, zona oeste y CABA.',
    emoji: '📚',
    theme: 'dark',
    font: 'Poppins',
    font_body: 'Poppins',
    instagram: '@todolisto.libreria',
    facebook: 'facebook.com/todolisto.libreria',
    social_web: 'https://todolisto.daletepido.com.ar',
    social_ig: '@todolisto.libreria',
    social_fb: 'todolisto.libreria',
    social_maps: 'https://maps.google.com/?q=Dr.+Ignacio+Arieta+3150,+San+Justo',
    admin_email: 'ventas@todolisto.com.ar',
    pay_cash: true,
    pay_transfer: true,
    pay_agreement: true,
    banner1_label: 'LISTAS ESCOLARES 2026',
    banner1_title: 'Armado Inmediato de tu Lista con 15% OFF en Efectivo o Transferencia',
    banner1_img: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=1200',
    banner1_cat: 'Cuadernos & Carpetas',
    banner1_bg: '#0c4a6e',
    banner1_active: true,
    banner2_label: 'ARTE & DISEÑO TÉCNICO',
    banner2_title: 'Marcadores Posca Japoneses, Acuarelas & Blocks Canson',
    banner2_img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1200',
    banner2_cat: 'Arte & Dibujo',
    banner2_bg: '#0c4a6e',
    banner2_active: true,
    status: 'ACTIVE',
    payment_status: 'UP_TO_DATE',
    plan_level: 'pro',
    nosotros: 'TodoListo nació en San Justo hace 16 años con una misión muy clara: que conseguir los útiles para el colegio o los insumos para la oficina no sea un dolor de cabeza ni una pérdida de tiempo haciendo filas interminables. Crecimos sobre la calle Arieta gracias a la confianza de miles de familias matanceras y empresas de la zona. Contamos con convenio directo de fábrica con primeras marcas (Ledesma, Rivadavia, Faber-Castell, Bic, Mooving) lo que nos permite ofrecer precios de distribuidor tanto al por menor como en compras corporativas por bulto cerrado.',
    horarios_data: JSON.stringify([
      { day: 'Lunes a Viernes', hours: '08:30 - 19:30 hs' },
      { day: 'Sábados', hours: '09:00 - 14:00 hs' },
      { day: 'Domingos y Feriados', hours: 'Cerrado' }
    ]),
    faq_data: JSON.stringify([
      {
        question: '¿Cómo funciona el servicio de armado de lista escolar?',
        answer: 'Le sacás una foto a la lista del colegio y nos la mandás por WhatsApp o la cargás en la tienda. Nosotros te la armamos con productos de primera calidad, te enviamos el presupuesto con 15% OFF y la retirás lista por mostrador o te la enviamos a tu casa.'
      },
      {
        question: '¿Venden resmas y cajas de artículos de librería al por mayor?',
        answer: 'Sí, tenemos lista mayorista especial con precios escalonados para empresas, colegios, institutos y estudios profesionales a partir de 5 resmas o bultos cerrados.'
      },
      {
        question: '¿Emiten Factura A para empresas e instituciones?',
        answer: 'Emitimos Factura A y B electrónica con número de CUIT inmediatamente al procesar la compra.'
      },
      {
        question: '¿Hasta dónde llegan con los envíos?',
        answer: 'Cubrimos todo San Justo, Ramos Mejía, Haedo, Morón, Ciudadela y CABA en el día con servicio express Dale!QueVoy.'
      },
      {
        question: '¿Qué formas de pago aceptan?',
        answer: 'Efectivo con descuento especial, Transferencia bancaria directa con Alias inmediato y todas las tarjetas a través de Mercado Pago.'
      }
    ]),
    billing_info: {
      cuit_cuil: '30-71449988-2',
      razon_social: 'TODOLISTO INSUMOS COMERCIALES S.A.',
      condicion_iva: 'Responsable Inscripto',
      direccion_fiscal: 'Dr. Ignacio Arieta 3150, San Justo, Provincia de Buenos Aires',
      email_facturacion: 'administracion@todolisto.com.ar',
      design: {
        brand_style: 'friendly',
        primary_color: '#0284C7',
        secondary_color: '#0F172A',
        hero_overlay: 'rgba(15,23,42,0.7)',
        hero_img_opacity: '0.85',
        h1Color: '#FFFFFF',
        h2Color: '#38BDF8',
        descColor: '#E2E8F0'
      }
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 7. LUGONES SILVA (Materiales de Construcción & Corralón / San Vicente, AMBA)
  // ─────────────────────────────────────────────────────────────
  {
    store_id: 'lugonessilva',
    business_name: 'Lugones Silva — Materiales de Construcción & Corralón',
    tagline: '25 años abasteciendo obras, barrios cerrados y constructores en San Vicente y Canning con flota pesada propia',
    wapp: '5491144556677',
    rubro: 'Construcción & Corralón',
    subrubro: 'Distribuidor Mayorista & Minorista de Materiales',
    direccion: 'Av. Sarmiento 1240, San Vicente, AMBA',
    horario: 'Lun a Vie 07:30–17:30 hs | Sáb 07:30–13:00 hs',
    primary_color: '#D97706',
    secondary_color: '#18181B',
    logo_url: '/img/logos/lugonessilva-logo.jpg',
    bg: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85',
    h1: 'CIMIENTOS SÓLIDOS',
    h2: 'DIRECTO DE FÁBRICA A TU OBRA',
    desc: 'Cemento Loma Negra y Holcim, áridos a granel y bolsones 1m³, hierros Acindar conformados, mallas electrosoldadas, viguetas pretensadas y ladrillos cerámicos huecos. Flota de camiones volcadores e hidrogrúas para descarga precisa en lote. Acopio garantizado a 90 días.',
    emoji: '🏗️',
    theme: 'dark',
    font: 'Space Grotesk',
    font_body: 'Poppins',
    instagram: '@lugonessilva.corralon',
    facebook: 'facebook.com/lugonessilva.corralon',
    social_web: 'https://lugonessilva.daletepido.com.ar',
    social_ig: '@lugonessilva.corralon',
    social_fb: 'lugonessilva.corralon',
    social_maps: 'https://maps.google.com/?q=Av.+Sarmiento+1240,+San+Vicente',
    admin_email: 'ventas@lugonessilva.com.ar',
    pay_cash: true,
    pay_transfer: true,
    pay_agreement: true,
    banner1_label: 'CEMENTOS & ÁRIDOS A GRANEL',
    banner1_title: 'Cemento Loma Negra CPC40 & Bolsones de Arena Especial 1m³',
    banner1_img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200',
    banner1_cat: 'Cementos & Cales',
    banner1_bg: '#451a03',
    banner1_active: true,
    banner2_label: 'ACERO & ESTRUCTURAS ACINDAR',
    banner2_title: 'Hierros Conformados del 6 al 25 & Mallas Electrosoldadas SIMA',
    banner2_img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200',
    banner2_cat: 'Hierros & Mallas',
    banner2_bg: '#451a03',
    banner2_active: true,
    status: 'ACTIVE',
    payment_status: 'UP_TO_DATE',
    plan_level: 'pro',
    nosotros: 'Lugones Silva Materiales es una empresa familiar fundada en 1999 en San Vicente. Acompañamos el crecimiento histórico de la región, proveyendo materiales pesados y de terminación para cientos de viviendas familiares, locales comerciales y las principales obras en barrios cerrados de San Vicente, Canning, Presidente Perón y Brandsen. Disponemos de un predio de más de 10.000 m², stock permanente bajo galpón cerrado y una flota propia de camiones volcadores y chasis equipados con plumas hidrogrúa de largo alcance para depositar pallets y bolsones exactamente donde tu capataz lo necesita.',
    horarios_data: JSON.stringify([
      { day: 'Lunes a Viernes', hours: '07:30 - 17:30 hs' },
      { day: 'Sábados', hours: '07:30 - 13:00 hs' },
      { day: 'Domingos', hours: 'Cerrado' }
    ]),
    faq_data: JSON.stringify([
      {
        question: '¿Cómo coordinan las entregas y descarga en obra con hidrogrúa?',
        answer: 'Nuestros camiones cuentan con grúas hidráulicas de hasta 12 metros de pluma para descargar bolsones de arena, pallets de ladrillos o cemento sin que tengas que contratar peones de descarga. Coordinamos franja horaria previa por WhatsApp.'
      },
      {
        question: '¿Tienen servicio de acopio de materiales?',
        answer: 'Sí. Podés congelar precio de tus compras y retirar o solicitar despachos parciales hasta por 90 días sin ningún costo adicional de almacenamiento.'
      },
      {
        question: '¿Qué zonas cubren con sus camiones pesados?',
        answer: 'Cubrimos diariamente todo San Vicente, Canning, Ezeiza, Alejandro Korn, Guernica, Brandsen y Monte Grande.'
      },
      {
        question: '¿Emiten Factura A y certificados de calidad de aceros y cementos?',
        answer: 'Emitimos Factura A para constructoras y desarrolladores. Proveemos certificados de ensayo de tracción de aceros Acindar y lotes de cemento IRAM cuando la dirección de obra lo solicita.'
      },
      {
        question: '¿Cuáles son los medios de pago aceptados?',
        answer: 'Transferencia bancaria directa con acreditación inmediata, Efectivo en corralón o contra remito en obra, y cheques al día o diferidos previa calificación crediticia.'
      }
    ]),
    billing_info: {
      cuit_cuil: '30-70883344-7',
      razon_social: 'LUGONES SILVA CORRALON S.A.',
      condicion_iva: 'Responsable Inscripto',
      direccion_fiscal: 'Av. Sarmiento 1240, San Vicente, Provincia de Buenos Aires',
      email_facturacion: 'administracion@lugonessilva.com.ar',
      design: {
        brand_style: 'industrial',
        primary_color: '#D97706',
        secondary_color: '#18181B',
        hero_overlay: 'rgba(24,24,27,0.75)',
        hero_img_opacity: '0.85',
        h1Color: '#FFFFFF',
        h2Color: '#FBBF24',
        descColor: '#E4E4E7'
      }
    }
  }
];
