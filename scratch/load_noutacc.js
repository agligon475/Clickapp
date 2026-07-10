const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`
};

async function syncNoutaccDatabase() {
  const storeId = 'noutacc';

  console.log(`Paso 1: Insertando categoría Panificados para ${storeId}...`);
  const cat = { name: 'Panificados', emoji: '🍞', display_order: 1, active: true, store_id: storeId };

  const catRes = await fetch(`${SUPABASE_URL}/rest/v1/categories`, {
    method: 'POST',
    headers,
    body: JSON.stringify(cat)
  });
  if (!catRes.ok) {
    console.error(`Error al insertar categoría ${cat.name}: ${catRes.status} - ${await catRes.text()}`);
  } else {
    console.log(`Categoría ${cat.name} insertada correctamente.`);
  }

  console.log(`Paso 2: Actualizando productos para asociarlos a Panificados y Rotisería...`);
  const rProds = await fetch(`${SUPABASE_URL}/rest/v1/products?store_id=eq.${storeId}`, { headers });
  const prods = await rProds.json();

  for (const p of prods) {
    let updatedCat = p.categoria;
    if (p.nombre.includes('Pan')) {
      updatedCat = 'Panificados';
    } else if (p.nombre.includes('Hamburguesa')) {
      updatedCat = 'Rotisería';
    }

    if (updatedCat !== p.categoria) {
      console.log(`Actualizando producto "${p.nombre}" a la categoría "${updatedCat}"...`);
      const updateRes = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${p.id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ categoria: updatedCat })
      });
      if (!updateRes.ok) {
        console.error(`Error al actualizar producto ${p.nombre}: ${updateRes.status} - ${await updateRes.text()}`);
      } else {
        console.log(`Producto "${p.nombre}" actualizado con éxito.`);
      }
    }
  }

  console.log('¡Sincronización de base de datos finalizada!');
}

syncNoutaccDatabase().catch(console.error);
