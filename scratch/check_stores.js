const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`
};

async function checkStores() {
  const storeIds = ['noutacc', 'ferrenow', 'ferre-now', 'kioscojulio'];
  
  for (const id of storeIds) {
    console.log(`\n=================== STORE: ${id} ===================`);
    
    // Check company settings
    const settingsRes = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${id}`, { headers });
    const settings = await settingsRes.json();
    console.log('Company Settings:', settings);
    
    // Check categories
    const catRes = await fetch(`${SUPABASE_URL}/rest/v1/categories?store_id=eq.${id}`, { headers });
    const categories = await catRes.json();
    console.log(`Categories (${categories.length || 0}):`, categories.map(c => c.nombre || c.name || c));
    
    // Check products
    const prodRes = await fetch(`${SUPABASE_URL}/rest/v1/products?store_id=eq.${id}`, { headers });
    const products = await prodRes.json();
    console.log(`Products (${products.length || 0}):`, products.map(p => ({ nombre: p.nombre, cat: p.categoria, precio: p.precio })));
  }
}

checkStores().catch(console.error);
