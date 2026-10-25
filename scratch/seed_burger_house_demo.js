const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`
};

const storeBurgerHouse = {
  settings: {
    business_name: 'Burger House - Smash & Street Food',
    rubro: 'Hamburguesería & Gastronomía Artesanal',
    tagline: 'Smash burgers auténticas, papas rústicas y birra tirada',
    h1: 'Sentí el verdadero sabor',
    h2: 'Smash en BURGER HOUSE',
    desc: 'Medallones 100% novillo smash, pan de papa casero, cheddar fundido, delivery express en caliente y retiro en mostrador.',
    emoji: '🍔',
    primary_color: '#E74C3C',
    secondary_color: '#18181B',
    logo_url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&h=300&fit=crop',
    bg: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=1400',
    banner1_label: 'PROMO SMASH DELIVERY',
    banner1_title: 'Doble Cheddar Bacon + Papas Rústicas',
    banner1_img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200',
    banner1_cat: 'Burgers Clásicas',
    banner1_active: true,
    banner2_label: 'SMASH DE LA CASA',
    banner2_title: 'Triple Oklahoma Onion Burger',
    banner2_img: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=1200',
    banner2_cat: 'Burgers Especiales',
    banner2_active: true,
    banner3_label: 'COMBO AMIGOS',
    banner3_title: '4 Burgers + 2 Papas Grandes + 4 Birras',
    banner3_img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200',
    banner3_cat: 'Combos & Promos',
    banner3_active: true,
    direccion: 'Av. Corrientes 1840, CABA (Tribunales / Centro)',
    horario: 'Martes a Domingos de 19:30 a 01:00 hs. (Delivery Dale!QueVoy y Takeaway)',
    wapp: '5491144883322',
    nosotros: 'En Burger House hacemos smash burgers con técnica real: corte 100% roast beef y tapa de asado seleccionados, aplastados sobre plancha de hierro fundido a más de 250°C para lograr la costra Maillard perfecta. Panes de papa horneados a diario y salsas de receta secreta.',
    status: 'ACTIVE',
    payment_status: 'UP_TO_DATE',
    plan_level: 'pro'
  },
  categories: [
    { name: 'Burgers Clásicas', emoji: '🍔' },
    { name: 'Burgers Especiales', emoji: '🥓' },
    { name: 'Papas & Acompañamientos', emoji: '🍟' },
    { name: 'Combos & Promos', emoji: '🔥' },
    { name: 'Bebidas & Gaseosas', emoji: '🥤' },
    { name: 'Cervezas Artesanales', emoji: '🍺' }
  ],
  faqs: [
    { question: '¿Cómo funciona el envío por Delivery Dale!QueVoy?', answer: 'Cuando despachamos tu pedido por Dale!QueVoy, recibís un PIN de 4 dígitos por WhatsApp. Al llegar el repartidor en moto con la caja térmica, le dictás el PIN para garantizar que tu comida caliente fue entregada exclusivamente a vos de forma segura.' },
    { question: '¿Cuentan con cadetes propios o retiro en mostrador?', answer: 'Sí, podés seleccionar Retiro en Mostrador (Takeaway) y pasar a buscar tu pedido caliente por Av. Corrientes 1840 sin hacer fila, o pedir delivery con nuestros repartidores particulares de zona.' },
    { question: '¿Se imprimen las comandas automáticamente en cocina?', answer: 'Sí, la plataforma cuenta con motor de tickets térmicos (58mm/80mm ESC/POS). Al ingresar o pasar el pedido a estado En Cocina, la comanda sale impresa con todos los detalles de personalización del cliente.' },
    { question: '¿Qué medios de pago aceptan?', answer: 'Aceptamos Efectivo al recibir o retirar, Transferencia bancaria directa con Alias/CBU verificado por comprobante, y Mercado Pago (Débito, Crédito, Dinero en cuenta).' },
    { question: '¿Qué carne utilizan para las hamburguesas?', answer: 'Usamos un blend propio 100% novillo seleccionado de roast beef y tapa de asado, picado fresco diariamente sin conservantes ni aditivos químicos.' }
  ],
  products: [
    // 1. Burgers Clásicas
    {
      nombre: 'Cheeseburger Clásica (Simple)',
      precio: 6900,
      stock: 45,
      cat: 'Burgers Clásicas',
      desc: 'Medallón de carne 120g smash sobre plancha de hierro fundido, doble queso cheddar fundido, salsa especial de la casa en pan de papa suave tostado en manteca.',
      img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
      marca: 'Burger House',
      origen: 'AR',
      oculto: false
    },
    {
      nombre: 'Doble Cheeseburger Clásica',
      precio: 8400,
      stock: 50,
      cat: 'Burgers Clásicas',
      desc: 'Doble medallón smash de 110g c/u (220g de novillo), cuatro fetas de cheddar americano fundido, cebollita picada finita y pepinillos agridulces en pan de papa.',
      img: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800',
      marca: 'Burger House',
      origen: 'AR',
      oculto: false
    },
    {
      nombre: 'Hamburguesa Doble Cheddar Bacon',
      precio: 8900,
      stock: 60,
      cat: 'Burgers Clásicas',
      desc: 'Nuestra estrella más pedida: doble smash 110g, cuatro fetas de cheddar fundido y panceta ahumada crujiente en pan de papa con salsa barbacoa ahumada.',
      img: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800',
      marca: 'Burger House',
      origen: 'AR',
      oculto: false
    },
    {
      nombre: 'Triple Cheddar Bacon Monster',
      precio: 10500,
      stock: 35,
      cat: 'Burgers Clásicas',
      desc: 'Triple medallón smash (330g de pura carne), seis fetas de cheddar derretido, doble porción de bacon crocante y mayonesa de ajo asado.',
      img: 'https://images.unsplash.com/photo-1582196016295-f8c8bd4b3e99?w=800',
      marca: 'Burger House',
      origen: 'AR',
      oculto: false
    },

    // 2. Burgers Especiales
    {
      nombre: 'Oklahoma Smash Burger (Doble Cebolla Caramelizada)',
      precio: 8800,
      stock: 40,
      cat: 'Burgers Especiales',
      desc: 'Técnica clásica de Oklahoma: carne smashada directamente con montañas de cebolla finísima sobre el hierro ardiente, cheddar inglés y mostaza spicy.',
      img: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800',
      marca: 'Burger House',
      origen: 'AR',
      oculto: false
    },
    {
      nombre: 'Blue Cheese & Cebolla Caramelizada',
      precio: 9200,
      stock: 30,
      cat: 'Burgers Especiales',
      desc: 'Doble smash, reducción de queso azul intenso con crema, cebollas caramelizadas al malbec, rúcula fresca hidropónica y nueces tostadas.',
      img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
      marca: 'Burger House',
      origen: 'AR',
      oculto: false
    },
    {
      nombre: 'Crispy Fried Chicken Burger',
      precio: 8200,
      stock: 35,
      cat: 'Burgers Especiales',
      desc: 'Pechuga de pollo marinada en buttermilk 24hs, rebozado estilo sureño ultra crujiente, ensalada coleslaw fresca, pickles y mayonesa kewpie.',
      img: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=800',
      marca: 'Burger House',
      origen: 'AR',
      oculto: false
    },
    {
      nombre: 'Veggie Mushroom & Truffle Burger',
      precio: 8500,
      stock: 25,
      cat: 'Burgers Especiales',
      desc: 'Medallón artesanal de gírgolas, portobellos y garbanzos al hierro, queso provoleta ahumado a la chapa, rúcula y alioli de trufas negras.',
      img: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800',
      marca: 'Burger House',
      origen: 'AR',
      oculto: false
    },

    // 3. Papas & Acompañamientos
    {
      nombre: 'Papas Fritas Rústicas Grandes',
      precio: 3800,
      stock: 80,
      cat: 'Papas & Acompañamientos',
      desc: 'Papas bastón corte rústico con piel, doble cocción para máxima crocancia exterior y corazón suave, sazonadas con sal marina y pimentón ahumado.',
      img: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=800',
      marca: 'Burger House',
      origen: 'AR',
      oculto: false
    },
    {
      nombre: 'Papas Cheddar & Bacon Fundido',
      precio: 5200,
      stock: 65,
      cat: 'Papas & Acompañamientos',
      desc: 'Papas rústicas bañadas en generosa salsa de queso cheddar artesanal fundido caliente, lluvia de ciboulette y crocante de panceta ahumada.',
      img: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=800',
      marca: 'Burger House',
      origen: 'AR',
      oculto: false
    },
    {
      nombre: 'Nuggets de Pollo Caseros (8 unidades)',
      precio: 4600,
      stock: 45,
      cat: 'Papas & Acompañamientos',
      desc: 'Bocaditos de puro pollo tierno rebozados en panko crujiente, servidos con salsa barbacoa casera y alioli de ciboulette.',
      img: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=800',
      marca: 'Burger House',
      origen: 'AR',
      oculto: false
    },
    {
      nombre: 'Aros de Cebolla Rebozados (10 unidades)',
      precio: 4200,
      stock: 40,
      cat: 'Papas & Acompañamientos',
      desc: 'Aros enteros de cebolla dulce marinados en cerveza rubia y dorados a la perfección. Acompañados con salsa honey mustard.',
      img: 'https://images.unsplash.com/photo-1639024471287-0351860db52e?w=800',
      marca: 'Burger House',
      origen: 'AR',
      oculto: false
    },

    // 4. Combos & Promos
    {
      nombre: 'Combo Smash Doble + Papas + Bebida',
      precio: 12500,
      stock: 50,
      cat: 'Combos & Promos',
      desc: '1 Hamburguesa Doble Cheddar Bacon + 1 porción individual de Papas Rústicas + 1 Lata de Gaseosa o Agua 354ml a elección.',
      img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800',
      marca: 'Burger House',
      origen: 'AR',
      oculto: false
    },
    {
      nombre: 'Combo Dúo Burger House (Para 2 Personas)',
      precio: 22800,
      stock: 35,
      cat: 'Combos & Promos',
      desc: '2 Hamburguesas a elección (Doble Cheddar Bacon u Oklahoma) + 1 Papas Cheddar & Bacon grandes para compartir + 2 Bebidas a elección.',
      img: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800',
      marca: 'Burger House',
      origen: 'AR',
      oculto: false
    },

    // 5. Bebidas & Gaseosas
    {
      nombre: 'Lata Coca-Cola Original 354ml',
      precio: 1800,
      stock: 120,
      cat: 'Bebidas & Gaseosas',
      desc: 'Gaseosa Coca-Cola sabor original bien helada.',
      img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800',
      marca: 'Coca-Cola',
      origen: 'AR',
      oculto: false
    },
    {
      nombre: 'Lata Coca-Cola Zero 354ml',
      precio: 1800,
      stock: 100,
      cat: 'Bebidas & Gaseosas',
      desc: 'Gaseosa Coca-Cola Zero azúcar helada.',
      img: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800',
      marca: 'Coca-Cola',
      origen: 'AR',
      oculto: false
    },

    // 6. Cervezas Artesanales
    {
      nombre: 'Cerveza IPA Artesanal Lata 473ml',
      precio: 3200,
      stock: 75,
      cat: 'Cervezas Artesanales',
      desc: 'India Pale Ale con triple lupulado americano, notas cítricas y a maracuyá, amargor persistente pero muy refrescante (IBU 55).',
      img: 'https://images.unsplash.com/photo-1608270119280-5b128549303d?w=800',
      marca: 'Cervecería de la Casa',
      origen: 'AR',
      oculto: false
    },
    {
      nombre: 'Cerveza Honey Artesanal Lata 473ml',
      precio: 3000,
      stock: 60,
      cat: 'Cervezas Artesanales',
      desc: 'Cerveza dorada suave elaborada con miel pura de pradera. Notas dulces sutiles y final balanceado (IBU 18).',
      img: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800',
      marca: 'Cervecería de la Casa',
      origen: 'AR',
      oculto: false
    }
  ]
};

async function seedTargetStore(targetStoreId) {
  console.log(`\n=================== SEEDING TARGET: ${targetStoreId} ===================`);
  
  // 1. Limpiar datos viejos
  console.log(`[1/4] Limpiando productos y categorías viejas para '${targetStoreId}'...`);
  await fetch(`${SUPABASE_URL}/rest/v1/products?store_id=eq.${targetStoreId}`, { method: 'DELETE', headers });
  await fetch(`${SUPABASE_URL}/rest/v1/categories?store_id=eq.${targetStoreId}`, { method: 'DELETE', headers });

  // 2. Upsert Company Settings
  console.log(`[2/4] Guardando company_settings para '${targetStoreId}'...`);
  const settingsData = {
    ...storeBurgerHouse.settings,
    store_id: targetStoreId,
    horarios_data: JSON.stringify(storeBurgerHouse.faqs)
  };

  const check = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${targetStoreId}`, { headers }).then(r => r.json());
  if (check && check.length > 0) {
    await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${targetStoreId}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(settingsData)
    });
  } else {
    await fetch(`${SUPABASE_URL}/rest/v1/company_settings`, {
      method: 'POST',
      headers,
      body: JSON.stringify(settingsData)
    });
  }

  // 3. Crear Categorías
  console.log(`[3/4] Insertando categorías para '${targetStoreId}'...`);
  const catPayload = storeBurgerHouse.categories.map((c, idx) => ({
    store_id: targetStoreId,
    name: c.name,
    emoji: c.emoji,
    display_order: idx + 1,
    active: true
  }));
  const resC = await fetch(`${SUPABASE_URL}/rest/v1/categories`, {
    method: 'POST',
    headers,
    body: JSON.stringify(catPayload)
  });
  console.log(`✓ Insertadas categorías: status ${resC.status} ${resC.status >= 300 ? await resC.text() : ''}`);

  // 4. Crear Productos
  console.log(`[4/4] Insertando ${storeBurgerHouse.products.length} productos para '${targetStoreId}'...`);
  const prodsPayload = storeBurgerHouse.products.map(p => ({
    store_id: targetStoreId,
    nombre: p.nombre,
    precio: p.precio,
    stock: p.stock,
    categoria: p.cat,
    detalles: p.desc,
    img: p.img,
    marca: p.marca,
    origen: p.origen,
    oculto: p.oculto,
    emoji: '🍔',
    variants: p.cat.includes('Burgers') ? 'Simple,Doble,Triple' : (p.cat.includes('Papas') ? 'Mediana,Grande' : '')
  }));
  const resP = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
    method: 'POST',
    headers,
    body: JSON.stringify(prodsPayload)
  });
  const resText = await resP.text();
  console.log(`✓ Insertados productos: status ${resP.status} ${resP.status >= 300 ? resText : ''}`);
}

async function run() {
  await seedTargetStore('gastronomia-demo');
  await seedTargetStore('burgerhouse');
  await seedTargetStore('gastronomia');
  console.log('\n🎉 ¡SEED BURGER HOUSE COMPLETADO CON ÉXITO PARA TODAS LAS DEMOS!');
}

run().catch(console.error);
