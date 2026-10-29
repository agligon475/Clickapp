const SUPABASE_URL = "https://iaylgsthwildjkiiwgfd.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4";

async function inspectAllProducts() {
  const url = `${SUPABASE_URL}/rest/v1/products?select=id,nombre,store_id,categoria,precio&order=store_id.asc,id.asc`;
  const res = await fetch(url, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
  });
  const prods = await res.json();
  
  const byStore = {};
  prods.forEach(p => {
    byStore[p.store_id] = byStore[p.store_id] || [];
    byStore[p.store_id].push(p);
  });

  for (const [store, list] of Object.entries(byStore)) {
    console.log(`\n================ STORE: ${store} (${list.length} productos) ================`);
    list.forEach((p, idx) => {
      console.log(`  ${idx+1}. [${p.id}] ${p.nombre} | Cat: ${p.categoria} | $${p.precio}`);
    });
  }
}

inspectAllProducts();
