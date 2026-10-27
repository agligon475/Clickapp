import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

async function testLugonesSilvaPatch() {
  console.log('--- TEST DE PATCH PRODUCTO LUGONES SILVA EN SUPABASE ---');

  // Obtener producto de lugonessilva
  const getRes = await fetch(`${SUPABASE_URL}/rest/v1/products?store_id=eq.lugonessilva&limit=1`, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
  });

  const products = await getRes.json();
  if (!products || products.length === 0) {
    console.error('No se encontraron productos para lugonessilva');
    return;
  }

  const prod = products[0];
  console.log('Producto encontrado:', prod.id, prod.nombre);

  // Simular el payload saneado
  const patchPayload = {
    nombre: prod.nombre,
    precio: prod.precio,
    stock: prod.stock,
    categoria: prod.categoria,
    emoji: prod.emoji,
    marca: prod.marca,
    detalles: prod.detalles,
    variants: prod.variants,
    origen: prod.origen,
    oculto: prod.oculto,
    pills: prod.pills,
    store_id: 'lugonessilva'
  };

  const patchUrl = `${SUPABASE_URL}/rest/v1/products?id=eq.${prod.id}&store_id=eq.lugonessilva`;
  const patchRes = await fetch(patchUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(patchPayload)
  });

  console.log('PATCH Status Code:', patchRes.status);
  if (patchRes.ok) {
    console.log('✅ ¡PATCH exitoso! Código:', patchRes.status, '(204 No Content)');
  } else {
    const errText = await patchRes.text();
    console.error('❌ Error en PATCH:', patchRes.status, errText);
  }
}

testLugonesSilvaPatch();
