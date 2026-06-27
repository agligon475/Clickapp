const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`
};

async function deleteExisting(store_id) {
  console.log(`Limpiando datos para ${store_id}...`);
  const r2 = await fetch(`${SUPABASE_URL}/rest/v1/products?store_id=eq.${store_id}`, { method: 'DELETE', headers });
  if (!r2.ok) console.error(`Error deleting products: ${r2.status} - ${await r2.text()}`);
  
  const r1 = await fetch(`${SUPABASE_URL}/rest/v1/categories?store_id=eq.${store_id}`, { method: 'DELETE', headers });
  if (!r1.ok) console.error(`Error deleting categories: ${r1.status} - ${await r1.text()}`);
  
  const r3 = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${store_id}`, { method: 'DELETE', headers });
  if (!r3.ok) console.error(`Error deleting settings: ${r3.status} - ${await r3.text()}`);
}

async function insertData(store_id, cfg, cats, prods) {
  console.log(`Insertando datos para ${store_id}...`);
  
  // 1. Insert Company Settings
  if (cfg) {
    const settings = {
      business_name: cfg.name,
      primary_color: cfg.color,
      secondary_color: cfg.color,
      banner1_label: 'NUEVAS',
      banner1_title: 'Ver novedades',
      banner1_img: '',
      banner1_cat: cats[0]?.name || '',
      banner2_label: 'PROMO',
      banner2_title: 'Imperdibles',
      banner2_img: '',
      banner2_cat: cats[1]?.name || '',
      store_id: store_id
    };
    const res = await fetch(`${SUPABASE_URL}/rest/v1/company_settings`, {
      method: 'POST',
      headers,
      body: JSON.stringify(settings)
    });
    if (!res.ok) {
      console.error(`Error settings: ${res.status} - ${await res.text()}`);
    }
  }

  // 2. Insert Categories
  if (cats.length > 0) {
    const dbCats = cats.map((c, idx) => ({
      name: c.name,
      emoji: c.icon,
      display_order: idx + 1,
      active: true,
      store_id: store_id
    }));
    const res = await fetch(`${SUPABASE_URL}/rest/v1/categories`, {
      method: 'POST',
      headers,
      body: JSON.stringify(dbCats)
    });
    if (!res.ok) {
      console.error(`Error categories: ${res.status} - ${await res.text()}`);
    }
  }

  // 3. Insert Products
  if (prods.length > 0) {
    const dbProds = prods.map(p => ({
      nombre: p.name,
      precio: p.price,
      stock: p.stock,
      categoria: p.cat,
      emoji: p.emoji,
      detalles: p.desc,
      oculto: false,
      store_id: store_id
    }));
    const res = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
      method: 'POST',
      headers,
      body: JSON.stringify(dbProds)
    });
    if (!res.ok) {
      console.error(`Error products: ${res.status} - ${await res.text()}`);
    }
  }
  console.log(`¡Store ${store_id} completado con éxito!`);
}

async function run() {
  // ── 1. FERRETERIA DEMO ──
  await deleteExisting('ferreteria-demo');
  await insertData('ferreteria-demo', 
    { name: 'FerreApp Demo', color: '#D72638' },
    [
      { name: 'Herramientas', icon: '🔧' },
      { name: 'Electricidad y Cables', icon: '⚡' },
      { name: 'Pintura', icon: '🎨' },
      { name: 'Construcción', icon: '🧱' }
    ],
    [
      { name: 'Taladro Percutor 500W', price: 45000, stock: 5, cat: 'Herramientas', emoji: '🔨', desc: 'Ideal para uso doméstico. Mandril 13mm.' },
      { name: 'Amoladora Angular 115mm', price: 38000, stock: 3, cat: 'Herramientas', emoji: '🔧', desc: '800W de potencia. Incluye disco.' },
      { name: 'Cable Taller 2x1.5 (10m)', price: 12000, stock: 12, cat: 'Electricidad y Cables', emoji: '🔌', desc: 'Rollo x 10 metros normalizado.' },
      { name: 'Cinta Aisladora 3M', price: 1500, stock: 50, cat: 'Electricidad y Cables', emoji: '⚡', desc: '19mm x 20m. Color negro.' },
      { name: 'Látex Interior Blanco 20L', price: 28000, stock: 8, cat: 'Pintura', emoji: '🎨', desc: 'Blanco mate. Alto poder cubritivo.' },
      { name: 'Cemento Loma Negra 50kg', price: 7500, stock: 100, cat: 'Construcción', emoji: '🧱', desc: 'Cemento portland normal.' }
    ]
  );

  // ── 2. KIOSCO DEMO ──
  await deleteExisting('kiosco-demo');
  await insertData('kiosco-demo',
    { name: 'MaxiKiosco El Sol Demo', color: '#F39C12' },
    [
      { name: 'Bebidas', icon: '🥤' },
      { name: 'Cervezas', icon: '🍺' },
      { name: 'Golosinas', icon: '🍫' },
      { name: 'Snacks', icon: '🍿' }
    ],
    [
      { name: 'Coca Cola 2.25L', price: 2500, stock: 24, cat: 'Bebidas', emoji: '🥤', desc: 'Sabor original' },
      { name: 'Agua Mineral 1.5L', price: 900, stock: 30, cat: 'Bebidas', emoji: '💧', desc: 'Sin gas' },
      { name: 'Cerveza Quilmes 1L', price: 1800, stock: 40, cat: 'Cervezas', emoji: '🍺', desc: 'Retornable bien fría' },
      { name: 'Gomitas Mogul 100g', price: 1200, stock: 20, cat: 'Golosinas', emoji: '🍬', desc: 'Sabores frutales surtidos' },
      { name: 'Alfajor Triple', price: 900, stock: 50, cat: 'Golosinas', emoji: '🍫', desc: 'Sabor chocolate' },
      { name: 'Papas Lays Clásicas 140g', price: 1500, stock: 15, cat: 'Snacks', emoji: '🍿', desc: 'Paquete grande' }
    ]
  );

  // ── 3. GASTRONOMIA DEMO ──
  await deleteExisting('gastronomia-demo');
  await insertData('gastronomia-demo',
    { name: 'Burger House Demo', color: '#E74C3C' },
    [
      { name: 'Hamburguesas', icon: '🍔' },
      { name: 'Papas & Snacks', icon: '🍟' },
      { name: 'Bebidas y Gaseosas', icon: '🥤' },
      { name: 'Postres', icon: '🍰' }
    ],
    [
      { name: 'Doble Cheddar Bacon', price: 8500, stock: 100, cat: 'Hamburguesas', emoji: '🍔', desc: 'Doble medallón 120g, doble cheddar, panceta crocante y salsa de la casa.' },
      { name: 'Onion Smash', price: 7900, stock: 100, cat: 'Hamburguesas', emoji: '🍔', desc: 'Medallón 150g, cebolla crispy, queso provolone.' },
      { name: 'Papas Fritas Grandes', price: 4000, stock: 100, cat: 'Papas & Snacks', emoji: '🍟', desc: 'Porción grande para compartir' },
      { name: 'Nuggets de Pollo (x10)', price: 4500, stock: 50, cat: 'Papas & Snacks', emoji: '🍗', desc: 'Acompañados con salsa barbacoa' },
      { name: 'Lata Coca Cola 354ml', price: 1200, stock: 200, cat: 'Bebidas y Gaseosas', emoji: '🥤', desc: 'Bien fría' },
      { name: 'Chocotorta', price: 3500, stock: 15, cat: 'Postres', emoji: '🍰', desc: 'Porción individual casera' }
    ]
  );

  // ── 4. ELECTRONICA DEMO ──
  await deleteExisting('electronica-demo');
  await insertData('electronica-demo',
    { name: 'Electro Store Demo', color: '#3498DB' },
    [
      { name: 'Smartphones', icon: '📱' },
      { name: 'Auriculares', icon: '🎧' },
      { name: 'Accesorios', icon: '🔌' },
      { name: 'Gaming', icon: '🎮' }
    ],
    [
      { name: 'iPhone 13 128GB', price: 900000, stock: 5, cat: 'Smartphones', emoji: '📱', desc: 'Cerrado en caja, garantía oficial Apple' },
      { name: 'Samsung Galaxy S23', price: 850000, stock: 4, cat: 'Smartphones', emoji: '📱', desc: 'Color negro, 256GB' },
      { name: 'AirPods Pro 2', price: 250000, stock: 5, cat: 'Auriculares', emoji: '🎧', desc: 'Cancelación de ruido activa' },
      { name: 'Cargador Rápido 20W', price: 15000, stock: 30, cat: 'Accesorios', emoji: '🔌', desc: 'Ficha tipo C' },
      { name: 'Funda Silicona', price: 8000, stock: 50, cat: 'Accesorios', emoji: '🛡️', desc: 'Consultar colores por WhatsApp' },
      { name: 'Joystick PS5 DualSense', price: 120000, stock: 8, cat: 'Gaming', emoji: '🎮', desc: 'Original en caja sellada' }
    ]
  );

  // ── 5. FERRETERIA VACIA ──
  await deleteExisting('ferreteria-vacia');
  await insertData('ferreteria-vacia',
    { name: 'Mi Ferretería', color: '#D72638' },
    [{ name: 'General', icon: '📦' }],
    []
  );

  // ── 6. KIOSCO VACIA ──
  await deleteExisting('kiosco-vacia');
  await insertData('kiosco-vacia',
    { name: 'Mi Kiosco', color: '#F39C12' },
    [{ name: 'General Kiosco', icon: '📦' }],
    []
  );

  // ── 7. GASTRONOMIA VACIA ──
  await deleteExisting('gastronomia-vacia');
  await insertData('gastronomia-vacia',
    { name: 'Mi Local Gastronómico', color: '#E74C3C' },
    [{ name: 'General Gastro', icon: '📦' }],
    []
  );

  // ── 8. ELECTRONICA VACIA ──
  await deleteExisting('electronica-vacia');
  await insertData('electronica-vacia',
    { name: 'Mi Tienda Electrónica', color: '#3498DB' },
    [{ name: 'General Electro', icon: '📦' }],
    []
  );

  console.log('¡Las 8 bases de datos (tiendas) en Supabase han sido inicializadas exitosamente!');
}

run().catch(console.error);
