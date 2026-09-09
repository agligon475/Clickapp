import fs from 'fs';
import path from 'path';

console.log('=== TESTEO DE FUNCIONES EXACTAS DEL SAAS DALE TEPIDO ===\n');

const dashHtml = fs.readFileSync(path.join(process.cwd(), 'dashboard.html'), 'utf8');
const tiendaHtml = fs.readFileSync(path.join(process.cwd(), 'tienda.html'), 'utf8');

const dashFnsToCheck = [
  'renderProducts',
  'openModal',
  'saveModal',
  'deleteProduct',
  'loadCategories',
  'saveCategory',
  'deleteCategory',
  'openCategoryModal',
  'loadPickupsList',
  'openPickupForm',
  'savePickup',
  'deletePickup',
  'loadOrders',
  'renderOrdersTable',
  'renderAllOrders',
  'updateOrderEstado',
  'changeOrderEstado',
  'deleteOrder',
  'enviarMensajeRetiro',
  'enviarMensajeEnCamino',
  'saveConfig',
  'uploadLogo',
  'saveBannersConfig'
];

console.log('--- AUDITORÍA DASHBOARD (ABM, PICKUPS, PEDIDOS Y CONFIGURACIÓN) ---');
let dashPassed = 0;
dashFnsToCheck.forEach(fn => {
  if (dashHtml.includes(`function ${fn}`) || dashHtml.includes(`${fn} =`)) {
    console.log(`  [OK] ${fn} está definida correctamente.`);
    dashPassed++;
  } else {
    console.log(`  [FAIL] ${fn} NO encontrada.`);
  }
});

const tiendaFnsToCheck = [
  'loadLocalProducts',
  'render',
  'openProductDrawer',
  'renderDrawer',
  'addToCart',
  'removeFromCart',
  'changeQty',
  'openCart',
  'closeCart',
  'updateCartUI',
  'showCheckout',
  'hideCheckout',
  'registrarPedido',
  'enviarWhatsApp'
];

console.log('\n--- AUDITORÍA TIENDA (CATÁLOGO, CARRITO, CHECKOUT Y REGISTRO DE PEDIDO) ---');
let tiendaPassed = 0;
tiendaFnsToCheck.forEach(fn => {
  if (tiendaHtml.includes(`function ${fn}`) || tiendaHtml.includes(`${fn} =`)) {
    console.log(`  [OK] ${fn} está definida correctamente.`);
    tiendaPassed++;
  } else {
    console.log(`  [FAIL] ${fn} NO encontrada.`);
  }
});

console.log('\n=== RESULTADO AUDITORÍA DE FUNCIONES ===');
console.log(`Dashboard: ${dashPassed}/${dashFnsToCheck.length} verificadas`);
console.log(`Tienda: ${tiendaPassed}/${tiendaFnsToCheck.length} verificadas`);
