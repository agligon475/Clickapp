// run_full_migration.js - Ejecuta la eliminación de cuentas viejas y la carga exhaustiva de las 7 tiendas demo
const https = require('https');
const profiles = require('./stores_data.cjs');
const catalogs = require('./catalogs_data.cjs');

const SUPABASE_HOST = 'iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const dataString = body ? JSON.stringify(body) : null;
    const options = {
      hostname: SUPABASE_HOST,
      port: 443,
      path: path,
      method: method,
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    };
    if (dataString) {
      options.headers['Content-Length'] = Buffer.byteLength(dataString);
    }

    const req = https.request(options, (res) => {
      let respBody = '';
      res.on('data', chunk => respBody += chunk);
      res.on('end', () => {
        try {
          const parsed = respBody ? JSON.parse(respBody) : null;
          resolve({ status: res.statusCode, data: parsed, raw: respBody });
        } catch (e) {
          resolve({ status: res.statusCode, raw: respBody });
        }
      });
    });

    req.on('error', reject);
    if (dataString) req.write(dataString);
    req.end();
  });
}

const DEPRECATED_STORES = [
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

async function main() {
  console.log('--- 1. Neutralizando y eliminando cuentas obsoletas ---');
  for (const depId of DEPRECATED_STORES) {
    try {
      // 1. Borrar productos y categorias
      await request('DELETE', `/rest/v1/products?store_id=eq.${depId}`);
      await request('DELETE', `/rest/v1/categories?store_id=eq.${depId}`);
      await request('DELETE', `/rest/v1/orders?store_id=eq.${depId}`);

      // 2. Renombrar store_id y vaciar compañia para que la url devuelva 404 / vacío
      const patchRes = await request('PATCH', `/rest/v1/company_settings?store_id=eq.${depId}`, {
        store_id: `deleted-${depId}-${Date.now().toString().slice(-4)}`,
        business_name: 'Cuenta Eliminada',
        tagline: 'Esta cuenta ha sido desactivada',
        status: 'DELETED',
        banner_url: '',
        logo_url: ''
      });
      console.log(`[DELETED] ${depId}: status ${patchRes.status}`);
    } catch (err) {
      console.error(`Error neutralizando ${depId}:`, err.message);
    }
  }

  console.log('\n--- 2. Guardando perfiles completos en company_settings ---');
  for (const profile of profiles) {
    const sId = profile.store_id;
    console.log(`\nProcesando tienda: ${sId} (${profile.business_name})`);

    // Verificar si ya existe en company_settings
    const checkRes = await request('GET', `/rest/v1/company_settings?store_id=eq.${sId}&select=store_id`);
    const exists = Array.isArray(checkRes.data) && checkRes.data.length > 0;

    let compRes;
    if (exists) {
      console.log(`-> Tienda ${sId} ya existe. Actualizando con PATCH...`);
      compRes = await request('PATCH', `/rest/v1/company_settings?store_id=eq.${sId}`, profile);
    } else {
      console.log(`-> Tienda ${sId} no existe. Insertando con POST...`);
      compRes = await request('POST', `/rest/v1/company_settings`, profile);
    }
    console.log(`-> Resultado company_settings: status ${compRes.status}`);

    // --- 3. Cargar Categorías y Productos ---
    const catalog = catalogs[sId];
    if (!catalog) {
      console.log(`-> No hay catálogo para ${sId}, saltando.`);
      continue;
    }

    // Limpiar categorías y productos previos
    await request('DELETE', `/rest/v1/products?store_id=eq.${sId}`);
    await request('DELETE', `/rest/v1/categories?store_id=eq.${sId}`);

    // Insertar categorías
    const categoriesToInsert = catalog.categories.map((c, idx) => ({
      store_id: sId,
      name: c.name,
      slug: c.slug,
      icon: c.icon || '📦',
      sort_order: idx + 1,
      is_active: true
    }));

    const catRes = await request('POST', `/rest/v1/categories`, categoriesToInsert);
    console.log(`-> Categorías insertadas (${categoriesToInsert.length}): status ${catRes.status}`);

    // Insertar productos
    const productsToInsert = catalog.products.map(p => ({
      store_id: sId,
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      category_name: p.category,
      brand: p.brand || '',
      stock: p.stock || 20,
      sku: p.sku || '',
      image_url: p.image,
      image: p.image,
      is_featured: !!p.featured,
      is_available: true,
      status: 'active'
    }));

    const prodRes = await request('POST', `/rest/v1/products`, productsToInsert);
    console.log(`-> Productos insertados (${productsToInsert.length}): status ${prodRes.status}`);
  }

  console.log('\n=== MIGRACIÓN Y LIMPIEZA FINALIZADA EXITOSAMENTE ===');
}

main().catch(err => {
  console.error('Fallo general en la migración:', err);
});
