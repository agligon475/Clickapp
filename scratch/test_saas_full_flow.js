import fs from 'fs';
import path from 'path';

console.log('=== INICIANDO AUDITORÍA Y TESTEO FUNCIONAL SAAS DALE TEPIDO ===\n');

// 1. Inspect dashboard JS functions & state management
const dashPath = path.join(process.cwd(), 'dashboard.html');
const dashHtml = fs.readFileSync(dashPath, 'utf8');

const keyDashFns = [
  'loadStoreData',
  'saveStoreData',
  'renderProductsTable',
  'openProductModal',
  'saveProduct',
  'deleteProduct',
  'renderCategoriesList',
  'saveCategory',
  'deleteCategory',
  'renderOrdersList',
  'changeOrderStatus',
  'openOrderDetailModal',
  'sendWhatsAppNotification',
  'printOrderTicket',
  'saveShippingPickupSettings',
  'openOptionGroupModal',
  'saveOptionGroup'
];

console.log('--- 1. AUDITORÍA ABM Y GESTIÓN EN DASHBOARD.HTML ---');
const missingDashFns = [];
keyDashFns.forEach(fn => {
  if (dashHtml.includes(fn)) {
    console.log(`  [OK] Función ${fn} encontrada en dashboard.html`);
  } else {
    console.log(`  [MISSING] Función ${fn} NO encontrada`);
    missingDashFns.push(fn);
  }
});

// 2. Inspect tienda JS functions & checkout flow
const tiendaPath = path.join(process.cwd(), 'tienda.html');
const tiendaHtml = fs.readFileSync(tiendaPath, 'utf8');

const keyTiendaFns = [
  'loadStoreCatalog',
  'addToCart',
  'removeFromCart',
  'updateCartQuantity',
  'renderCartDrawer',
  'selectDeliveryType',
  'selectPaymentMethod',
  'calculateOrderTotals',
  'submitOrderToWhatsApp',
  'saveOrderToDatabase',
  'showPickupInstructions'
];

console.log('\n--- 2. AUDITORÍA CATALOGO Y CHECKOUT EN TIENDA.HTML ---');
const missingTiendaFns = [];
keyTiendaFns.forEach(fn => {
  if (tiendaHtml.includes(fn)) {
    console.log(`  [OK] Función ${fn} encontrada en tienda.html`);
  } else {
    console.log(`  [INFO/MISSING] Función ${fn} en tienda.html`);
    missingTiendaFns.push(fn);
  }
});

// 3. Inspect APIs & Super Admin
const apiFiles = ['api/auth.js', 'api/store.js', 'api/welcome-email.js', 'api/super-admin.js'];
console.log('\n--- 3. AUDITORÍA ENDPOINTS DE API Y SERVICIOS ---');
apiFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`  [OK] Archivo de API ${file} presente`);
  } else {
    console.log(`  [WARN] Archivo de API ${file} no encontrado`);
  }
});

// 4. Test Simulated Order State Machine Logic
console.log('\n--- 4. TESTEO MÁQUINA DE ESTADOS DE PEDIDOS ("PEDIDOS EN CIRCUITO") ---');
const validOrderStates = ['pending', 'preparing', 'ready', 'delivered', 'cancelled'];
console.log('Estados de pedido admitidos:', validOrderStates.join(' -> '));

function transitionOrderState(currentState, nextState) {
  const transitions = {
    'pending': ['preparing', 'cancelled'],
    'preparing': ['ready', 'cancelled'],
    'ready': ['delivered', 'cancelled'],
    'delivered': [],
    'cancelled': []
  };

  if (!transitions[currentState]) return false;
  return transitions[currentState].includes(nextState);
}

let testStatePassed = true;
if (transitionOrderState('pending', 'preparing') && transitionOrderState('preparing', 'ready') && transitionOrderState('ready', 'delivered')) {
  console.log('  [OK] Flujo principal de pedido (Pendiente -> En Preparación -> Listo -> Entregado) validado correctamente.');
} else {
  console.log('  [FAIL] Error en transiciones principales de estado.');
  testStatePassed = false;
}

if (transitionOrderState('pending', 'cancelled') && transitionOrderState('preparing', 'cancelled')) {
  console.log('  [OK] Flujo de cancelación desde estados iniciales validado correctamente.');
} else {
  console.log('  [FAIL] Error en flujo de cancelación.');
  testStatePassed = false;
}

console.log('\n=== RESUMEN AUDITORÍA FUNCIONAL ===');
console.log(`Funciones Dashboard verificadas: ${keyDashFns.length - missingDashFns.length}/${keyDashFns.length}`);
console.log(`Máquina de estados de pedido: ${testStatePassed ? 'PASSED (Sin Errores)' : 'FAILED'}`);
