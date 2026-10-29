const SUPABASE_URL = "https://iaylgsthwildjkiiwgfd.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4";

async function checkProductsInSupabase() {
  const url = `${SUPABASE_URL}/rest/v1/products?select=id,nombre,store_id,categoria,precio&limit=1000`;
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`
    }
  });

  if (!res.ok) {
    console.error('Error fetching products:', res.status, await res.text());
    return;
  }

  const products = await res.json();
  console.log(`Total productos encontrados en Supabase: ${products.length}`);

  const storeCounts = {};
  const sampleByStore = {};

  products.forEach(p => {
    const s = p.store_id || 'NULL_OR_EMPTY';
    storeCounts[s] = (storeCounts[s] || 0) + 1;
    if (!sampleByStore[s]) sampleByStore[s] = [];
    if (sampleByStore[s].length < 3) sampleByStore[s].push(p.nombre);
  });

  console.log('\n--- CONTEO DE PRODUCTOS POR STORE_ID ---');
  for (const [store, count] of Object.entries(storeCounts)) {
    console.log(`Store [${store}]: ${count} productos. Ejemplos: ${sampleByStore[store].join(' | ')}`);
  }
}

checkProductsInSupabase();
