import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

async function testRealDB() {
  console.log('--- TEST DE CONECTIVIDAD DIRECTA A TABLAS ACTIVAS SUPABASE ---\n');

  const queries = [
    { name: 'company_settings', path: '/rest/v1/company_settings?select=store_id,business_name,plan_level&limit=3' },
    { name: 'products', path: '/rest/v1/products?select=id,nombre,precio,store_id&limit=3' },
    { name: 'categories', path: '/rest/v1/categories?select=id,name,store_id&limit=3' },
    { name: 'orders', path: '/rest/v1/orders?select=id,store_id,created_at&limit=3' },
    { name: 'faqs', path: '/rest/v1/faqs?select=id,store_id&limit=3' }
  ];

  for (const q of queries) {
    const t0 = Date.now();
    try {
      const res = await fetch(`${SUPABASE_URL}${q.path}`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      });
      const latency = Date.now() - t0;
      if (res.ok) {
        const rows = await res.json();
        console.log(`✅ [PASS] Tabla: ${q.name.padEnd(18)} -> HTTP ${res.status} (${latency}ms) | Filas: ${rows.length}`);
      } else {
        const err = await res.text();
        console.log(`❌ [FAIL] Tabla: ${q.name.padEnd(18)} -> HTTP ${res.status} (${latency}ms) | Error: ${err.slice(0, 100)}`);
      }
    } catch (e) {
      console.log(`❌ [FAIL] Tabla: ${q.name.padEnd(18)} -> Error de red: ${e.message}`);
    }
  }

  // Comprobar inserción y rollback o consulta de un comercio puntual
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.bighouse&select=store_id,business_name,plan_level`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });
    const data = await res.json();
    console.log(`\n✅ [PASS] Consulta comercio específico (bighouse):`, data);
  } catch (e) {
    console.log(`\n❌ [FAIL] Consulta comercio bighouse:`, e.message);
  }
}

testRealDB();
