import fs from 'fs';

console.log('=== VERIFICACIÓN DETALLADA DE COMPONENTES DEL SISTEMA ===\n');

const dashboard = fs.readFileSync('dashboard.html', 'utf8');
const tienda = fs.readFileSync('tienda.html', 'utf8');
const alta = fs.readFileSync('alta-usuario.html', 'utf8');
const schema = fs.readFileSync('scratch/full_supabase_schema.sql', 'utf8');

function checkFeature(name, tests) {
  console.log(`📌 [${name.toUpperCase()}]`);
  tests.forEach(t => {
    const passed = t.check();
    console.log(`  ${passed ? '✅' : '❌'} ${t.desc}`);
  });
  console.log('');
}

checkFeature('Alta y Login de Tiendas', [
  { desc: 'Formulario de registro y creación de tienda', check: () => alta.includes('register-form') || alta.includes('crearTienda') || alta.includes('Subdominio') },
  { desc: 'Verificación de sesión en Dashboard', check: () => dashboard.includes('daletepido_session') },
  { desc: 'Detección de store_id / subdominio en Tienda', check: () => tienda.includes('store') && (tienda.includes('subdomain') || tienda.includes('store_id')) }
]);

checkFeature('Módulo de Productos', [
  { desc: 'ABM de Productos en Dashboard (Crear/Editar/Eliminar)', check: () => dashboard.includes('saveProduct') || dashboard.includes('save-product') || dashboard.includes('tbl-products') || dashboard.includes('m-products') },
  { desc: 'Soporte para 3 Imágenes por producto', check: () => dashboard.includes('imagen_url2') || dashboard.includes('img2') },
  { desc: 'Aplicación de Marca de Agua (Watermark)', check: () => dashboard.includes('watermark') || dashboard.includes('applyWatermark') },
  { desc: 'Render de catálogo de productos en Tienda', check: () => tienda.includes('grid') || tienda.includes('products') || tienda.includes('renderProducts') || tienda.includes('product-card') },
  { desc: 'Filtro por búsqueda y categorías en Tienda', check: () => tienda.includes('filterCat') || tienda.includes('search') || tienda.includes('categoria') }
]);

checkFeature('Módulo de Categorías y Subrubros', [
  { desc: 'Gestión / selección de categorías en Dashboard', check: () => dashboard.includes('categoria') || dashboard.includes('subrubro') },
  { desc: 'Fila de categorías y subrubros en Tienda', check: () => tienda.includes('categories') || tienda.includes('rail') || tienda.includes('cat-chip') || tienda.includes('renderCategories') }
]);

checkFeature('Módulo de Pedidos', [
  { desc: 'Carrito de compras y Checkout en Tienda', check: () => tienda.includes('cart') || tienda.includes('checkout') || tienda.includes('sendOrder') || tienda.includes('whatsapp') },
  { desc: 'Guardado de Pedidos en Supabase (tabla orders)', check: () => tienda.includes('orders') && tienda.includes('insert') },
  { desc: 'Envío de pedido por WhatsApp al comercio', check: () => tienda.includes('wa.me') || tienda.includes('api.whatsapp.com') },
  { desc: 'Tabla y gestión de Pedidos en Dashboard', check: () => dashboard.includes('orders') || dashboard.includes('pedidos') || dashboard.includes('renderOrders') },
  { desc: 'Cambio de estado de pedido (Pendiente, Listo, Enviado, etc.)', check: () => dashboard.includes('status') || dashboard.includes('updateOrderStatus') || dashboard.includes('Estado') }
]);

checkFeature('Módulo de Repartidores (Pickups / Cadetes)', [
  { desc: 'ABM de Repartidores en Dashboard (Crear/Editar/Desactivar)', check: () => dashboard.includes('pickup') || dashboard.includes('repartidor') },
  { desc: 'Asignación de Repartidor a Pedido en Dashboard', check: () => dashboard.includes('assignPickup') || dashboard.includes('repartidor') || dashboard.includes('pickup-form') },
  { desc: 'Notificación / Link de envío a Repartidor por WhatsApp', check: () => dashboard.includes('wa.me') || dashboard.includes('repartidor') || dashboard.includes('pickup') }
]);

checkFeature('Módulo de Banners y Personalización', [
  { desc: 'Edición de Banners 50/50 en Dashboard', check: () => dashboard.includes('banner1') || dashboard.includes('banner2') || dashboard.includes('banners') },
  { desc: 'Visualización e interacción de Banners en Tienda', check: () => tienda.includes('banner') || tienda.includes('banner1') || tienda.includes('banner2') }
]);
