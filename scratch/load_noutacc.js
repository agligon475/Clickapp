const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`
};

async function loadSecondProduct() {
  const storeId = 'noutacc';

  console.log(`Insertando el segundo producto para ${storeId}...`);
  const prod = {
    nombre: 'Hamburguesa Doble Cheddar (Sin TACC)',
    precio: 7900,
    stock: 50,
    categoria: 'Hamburguesas',
    emoji: '🍔',
    detalles: 'Doble medallón de carne casero, doble queso cheddar, aderezos sin TACC y pan artesanal libre de gluten.',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
    marca: 'Casero',
    origen: 'AR',
    oculto: false,
    store_id: storeId
  };

  const res = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
    method: 'POST',
    headers,
    body: JSON.stringify(prod)
  });
  
  if (!res.ok) {
    console.error(`Error al insertar producto ${prod.nombre}: ${res.status} - ${await res.text()}`);
  } else {
    console.log(`Producto ${prod.nombre} insertado correctamente.`);
  }
}

loadSecondProduct().catch(console.error);
