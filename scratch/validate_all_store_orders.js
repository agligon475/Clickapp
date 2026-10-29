import fs from 'fs';

const stores = [
  { id: 'bighouse', fn: 'getBurgerHouseSimulatedOrders', forbidden: ['cal', 'taladro', 'fernet', 'magsafe', 'ryzen', 'blazer', 'posca'] },
  { id: 'lugonessilva', fn: 'getLugonesSilvaSimulatedOrders', forbidden: ['burger', 'taladro', 'fernet', 'magsafe', 'ryzen', 'blazer', 'posca'] },
  { id: 'ferre-now', fn: 'getFerreNowSimulatedOrders', forbidden: ['burger', 'cal', 'fernet', 'magsafe', 'ryzen', 'blazer', 'posca'] },
  { id: 'kioscojulio', fn: 'getKioscoJulioSimulatedOrders', forbidden: ['burger', 'cal', 'taladro', 'magsafe', 'ryzen', 'blazer', 'posca'] },
  { id: 'noutacc', fn: 'getNoutaccSimulatedOrders', forbidden: ['burger', 'cal', 'taladro', 'fernet', 'ryzen', 'blazer', 'posca', 'tacc', 'pan'] },
  { id: 'tecnomont', fn: 'getTecnoMontSimulatedOrders', forbidden: ['burger', 'cal', 'taladro', 'fernet', 'magsafe', 'blazer', 'posca'] },
  { id: 'biuti', fn: 'getBiutiSimulatedOrders', forbidden: ['burger', 'cal', 'taladro', 'fernet', 'magsafe', 'ryzen', 'posca'] },
  { id: 'todolisto', fn: 'getTodoListoSimulatedOrders', forbidden: ['burger', 'cal', 'taladro', 'fernet', 'magsafe', 'ryzen', 'blazer'] }
];

console.log("=== VERIFICACIÓN RIGUROSA DE AISLAMIENTO DE PEDIDOS Y PRODUCTOS ===\n");

const dashCode = fs.readFileSync('dashboard.html', 'utf8');

// Crear módulo de prueba con mock de window
let testScope = {};
try {
  const runner = new Function('testScope', 'window', `
    const now = new Date();
    const fmt = (d) => "26/10/2026 12:00";
    
    // Inyectar funciones
    ${dashCode.slice(dashCode.indexOf('function getNoutaccSimulatedOrders()'), dashCode.indexOf('window.loadDemoOrdersBurgerHouse'))}
    
    testScope.getBurgerHouseSimulatedOrders = getBurgerHouseSimulatedOrders;
    testScope.getNoutaccSimulatedOrders = getNoutaccSimulatedOrders;
    testScope.getLugonesSilvaSimulatedOrders = getLugonesSilvaSimulatedOrders;
    testScope.getFerreNowSimulatedOrders = getFerreNowSimulatedOrders;
    testScope.getKioscoJulioSimulatedOrders = getKioscoJulioSimulatedOrders;
    testScope.getTecnoMontSimulatedOrders = getTecnoMontSimulatedOrders;
    testScope.getBiutiSimulatedOrders = getBiutiSimulatedOrders;
    testScope.getTodoListoSimulatedOrders = getTodoListoSimulatedOrders;
  `);
  runner(testScope, {});
} catch (e) {
  console.error("Error cargando scope:", e.message);
  process.exit(1);
}

let passedAll = true;

for (const s of stores) {
  const fn = testScope[s.fn];
  if (typeof fn !== 'function') {
    console.error(`❌ Función ${s.fn} no encontrada`);
    passedAll = false;
    continue;
  }

  const orders = fn();
  console.log(`[TIENDA: ${s.id.toUpperCase()}]`);
  console.log(`  Cantidad de pedidos de prueba: ${orders.length}`);

  let storeHasError = false;
  orders.forEach((o, idx) => {
    if (o.store_id !== s.id) {
      console.error(`  ❌ Pedido #${idx+1} (${o.id}) tiene store_id incorrecto: "${o.store_id}", esperado: "${s.id}"`);
      storeHasError = true;
      passedAll = false;
    }

    const prodsLower = (o.productos || '').toLowerCase();
    for (const f of s.forbidden) {
      if (prodsLower.includes(f)) {
        console.error(`  ❌ CONTAMINACIÓN CRUZADA DETECTADA en ${o.id}: contiene término prohibido "${f}"!`);
        console.error(`     Texto: "${o.productos}"`);
        storeHasError = true;
        passedAll = false;
      }
    }
  });

  if (!storeHasError) {
    console.log(`  ✓ 100% libre de contaminación cruzada. store_id: '${s.id}' verificado en todos los pedidos.`);
    console.log(`  Muestra: ${orders[0].id} -> ${orders[0].productos}`);
  }
  console.log("---------------------------------------------------------------------------------");
}

if (passedAll) {
  console.log("\n🎉 RESULTADO FINAL: TODAS LAS TIENDAS TIENEN SUS PEDIDOS Y PRODUCTOS 100% AISLADOS.");
} else {
  console.error("\n❌ SE ENCONTRARON FALLAS DE AISLAMIENTO.");
}
