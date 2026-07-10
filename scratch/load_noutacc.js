const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`
};

async function reloadAllNoutaccProducts() {
  const storeId = 'noutacc';

  console.log('Paso 1: Limpiando productos existentes para ' + storeId + '...');
  const deleteRes = await fetch(`${SUPABASE_URL}/rest/v1/products?store_id=eq.${storeId}`, {
    method: 'DELETE',
    headers
  });
  if (deleteRes.ok) {
    console.log('Productos antiguos eliminados.');
  }

  console.log('Paso 2: Insertando los 4 productos oficiales...');
  const products = [
    {
      nombre: 'Pan de Molde Lactal (Sin TACC)',
      precio: 3200,
      stock: 15,
      categoria: 'Panadería',
      emoji: '🍞',
      detalles: 'Pan de molde blanco, súper esponjoso y 100% libre de gluten. Ideal para sandwiches y tostadas.',
      img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600',
      marca: 'Casero',
      origen: 'AR',
      oculto: false,
      store_id: storeId
    },
    {
      nombre: 'Medialunas de Manteca (Sin TACC)',
      precio: 1200,
      stock: 24,
      categoria: 'Panadería',
      emoji: '🥐',
      detalles: 'Medialunas de manteca esponjosas, dulces y almibaradas, elaboradas con harina sin gluten. Venta por unidad.',
      img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600',
      marca: 'Casero',
      origen: 'AR',
      oculto: false,
      store_id: storeId
    },
    {
      nombre: 'Hamburguesa Doble Cheddar (Sin TACC)',
      precio: 7900,
      stock: 50,
      categoria: 'Rotisería',
      emoji: '🍔',
      detalles: 'Doble medallón de carne casero, doble queso cheddar, aderezos sin TACC y pan artesanal libre de gluten.',
      img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
      marca: 'Casero',
      origen: 'AR',
      oculto: false,
      store_id: storeId
    },
    {
      nombre: 'Tarta Individual de Jamón y Queso (Sin TACC)',
      precio: 3800,
      stock: 10,
      categoria: 'Rotisería',
      emoji: '🥧',
      detalles: 'Tarta individual salada, elaborada con masa casera sin gluten y un relleno abundante de jamón cocido picado y muzzarella derretida.',
      img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600',
      marca: 'Casero',
      origen: 'AR',
      oculto: false,
      store_id: storeId
    }
  ];

  for (const prod of products) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
      method: 'POST',
      headers,
      body: JSON.stringify(prod)
    });
    if (!res.ok) {
      console.error(`Error al insertar producto ${prod.nombre}: ${res.status} - ${await res.text()}`);
    } else {
      console.log(`Producto ${prod.nombre} insertado correctamente.`);
    }
  }

  console.log('¡Todos los productos han sido cargados y asociados correctamente en la base de datos!');
}

reloadAllNoutaccProducts().catch(console.error);
