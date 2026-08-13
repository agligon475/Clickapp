const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`
};

async function testFull() {
  const storeId = 'noutacc';
  console.log(`[1] Inserting categories for ${storeId}...`);
  const catRes = await fetch(`${SUPABASE_URL}/rest/v1/categories`, {
    method: 'POST',
    headers,
    body: JSON.stringify([
      { name: 'Panadería & Desayuno', emoji: '🍞', store_id: storeId },
      { name: 'Pastelería & Dulces', emoji: '🍰', store_id: storeId },
      { name: 'Rotisería & Salados', emoji: '🥐', store_id: storeId },
      { name: 'Café & Bebidas', emoji: '☕', store_id: storeId }
    ])
  });
  console.log('Categories Status:', catRes.status);

  console.log(`[2] Inserting product with 3 images for ${storeId}...`);
  const prodRes = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
    method: 'POST',
    headers,
    body: JSON.stringify([
      {
        nombre: 'Pan de Molde Lactal (Sin TACC)',
        precio: 4500,
        stock: 20,
        categoria: 'Panadería & Desayuno',
        emoji: '🍞',
        detalles: 'Pan de molde blanco lactal súper esponjoso y miga suave. (500g)',
        img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
        img2: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800',
        img3: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800',
        marca: 'Noutacc',
        origen: 'AR',
        oculto: false,
        store_id: storeId
      }
    ])
  });
  console.log('Product Status:', prodRes.status, await prodRes.text());
}

testFull();
