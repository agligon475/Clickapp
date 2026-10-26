import fs from 'fs';

const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`
};

const STORES_TO_DELETE = [
  'gastronomia',
  'burgerhouse',
  'test-store-1786047945925',
  'tecnomon',
  'gastronomia-vacia',
  'electronica-vacia',
  'kiosco-vacia',
  'ferreteria-vacia',
  'electronica-demo',
  'gastronomia-demo',
  'kiosco-demo',
  'ferreteria-demo',
  'ferrenow'
];

async function deleteAccounts() {
  console.log(`Iniciando eliminación de ${STORES_TO_DELETE.length} cuentas solicitadas...`);

  for (const storeId of STORES_TO_DELETE) {
    console.log(`\n--- Eliminando cuenta: ${storeId} ---`);

    // 1. Eliminar productos
    try {
      const pRes = await fetch(`${SUPABASE_URL}/rest/v1/products?store_id=eq.${encodeURIComponent(storeId)}`, {
        method: 'DELETE',
        headers
      });
      console.log(`  [products] DELETE status: ${pRes.status}`);
    } catch (e) {
      console.error(`  [products] error:`, e.message);
    }

    // 2. Eliminar categorías
    try {
      const cRes = await fetch(`${SUPABASE_URL}/rest/v1/categories?store_id=eq.${encodeURIComponent(storeId)}`, {
        method: 'DELETE',
        headers
      });
      console.log(`  [categories] DELETE status: ${cRes.status}`);
    } catch (e) {
      console.error(`  [categories] error:`, e.message);
    }

    // 3. Eliminar órdenes
    try {
      const oRes = await fetch(`${SUPABASE_URL}/rest/v1/orders?store_id=eq.${encodeURIComponent(storeId)}`, {
        method: 'DELETE',
        headers
      });
      console.log(`  [orders] DELETE status: ${oRes.status}`);
    } catch (e) {
      console.error(`  [orders] error:`, e.message);
    }

    // 4. Eliminar company_settings
    try {
      const csRes = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${encodeURIComponent(storeId)}`, {
        method: 'DELETE',
        headers
      });
      console.log(`  [company_settings] DELETE status: ${csRes.status}`);
    } catch (e) {
      console.error(`  [company_settings] error:`, e.message);
    }
  }

  console.log('\nVerificando tiendas restantes en company_settings:');
  const verifyRes = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?select=store_id,business_name,rubro`, { headers });
  const remaining = await verifyRes.json();
  console.log(`Total tiendas restantes: ${remaining.length}`);
  remaining.forEach(r => console.log(`  - ${r.store_id} (${r.business_name || 'Sin nombre'})`));
}

deleteAccounts().catch(console.error);
