const SUPABASE_URL = "https://iaylgsthwildjkiiwgfd.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4";

async function auditOrders() {
  console.log("=== AUDITANDO TABLA ORDERS EN SUPABASE ===");
  const res = await fetch(`${SUPABASE_URL}/rest/v1/orders?select=*&order=created_at.desc&limit=50`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
  });
  if (!res.ok) {
    console.error("Error al consultar orders:", res.status, await res.text());
    return;
  }
  const orders = await res.json();
  console.log(`Total de pedidos encontrados: ${orders.length}\n`);
  
  orders.forEach((o, i) => {
    console.log(`[Pedido #${i+1}] ID: ${o.id} | Store: ${o.store_id} | Fecha: ${o.created_at} | Total: ${o.total} | Estado: ${o.estado || o.status}`);
    console.log(`  Cliente: ${o.cliente || o.customer_name || 'N/A'} | Tel: ${o.telefono || o.phone || 'N/A'}`);
    let items = o.items || o.productos || o.items_data;
    if (typeof items === 'string') {
      try { items = JSON.parse(items); } catch(e) {}
    }
    console.log(`  Items/Productos:`, JSON.stringify(items));
    console.log("----------------------------------------------------------------------------------");
  });
}

auditOrders();
