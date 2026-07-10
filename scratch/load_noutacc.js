const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`
};

async function loadTwoMoreProducts() {
  const storeId = 'noutacc';

  console.log(`Cargando dos artículos adicionales para ${storeId}...`);
  const products = [
    {
      nombre: 'Medialunas de Manteca (Sin TACC)',
      precio: 1200,
      stock: 24,
      categoria: 'Panificados',
      emoji: '🥐',
      detalles: 'Medialunas de manteca esponjosas, dulces y almibaradas, elaboradas con harina sin gluten. Venta por unidad.',
      img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600',
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

  console.log('¡Artículos adicionales cargados con éxito!');
}

loadTwoMoreProducts().catch(console.error);
