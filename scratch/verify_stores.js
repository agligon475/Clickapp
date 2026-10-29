const SUPABASE_URL = "https://iaylgsthwildjkiiwgfd.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4";

const storesToTest = [
  'bighouse',
  'lugonessilva',
  'ferre-now',
  'kioscojulio',
  'noutacc',
  'tecnomont',
  'biuti',
  'todolisto'
];

async function verifyAllStores() {
  console.log('=== VERIFICANDO AISLAMIENTO MULTI-TENANT POR TIENDA ===\n');

  for (const store of storesToTest) {
    const prodUrl = `${SUPABASE_URL}/rest/v1/products?store_id=eq.${encodeURIComponent(store)}&oculto=eq.false&select=id,nombre,categoria,precio&limit=5`;
    const cfgUrl = `${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${encodeURIComponent(store)}&select=business_name,rubro,primary_color`;

    const [pRes, cRes] = await Promise.all([
      fetch(prodUrl, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }),
      fetch(cfgUrl, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } })
    ]);

    const prods = await pRes.json();
    const cfgs = await cRes.json();

    const cfg = cfgs[0] || {};
    console.log(`[TIENDA: ${store.toUpperCase()}]`);
    console.log(`  Nombre comercial: ${cfg.business_name} | Rubro: ${cfg.rubro} | Color: ${cfg.primary_color}`);
    console.log(`  Muestra de 3 productos:`);
    prods.slice(0, 3).forEach((p, i) => {
      console.log(`    ${i+1}. ${p.nombre} (${p.categoria}) -> $${p.precio}`);
    });
    console.log('-----------------------------------------------------------');
  }
}

verifyAllStores();
