import fs from 'fs';

const content = fs.readFileSync('dashboard.html', 'utf8');
const lines = content.split('\n');

console.log('=== LINEAS CON storeapp_orders SIN STORE_ID ===');
lines.forEach((l, i) => {
  if (l.includes("localStorage.getItem('storeapp_orders')") || 
      l.includes('localStorage.getItem("storeapp_orders")') ||
      l.includes("localStorage.setItem('storeapp_orders'") ||
      l.includes('localStorage.setItem("storeapp_orders"')) {
    console.log(`${i+1}: ${l.trim()}`);
  }
});

console.log('\n=== LINEAS CON storeapp_pickups SIN STORE_ID ===');
lines.forEach((l, i) => {
  if (l.includes("localStorage.getItem('storeapp_pickups')") || 
      l.includes('localStorage.getItem("storeapp_pickups")') ||
      l.includes("localStorage.setItem('storeapp_pickups'") ||
      l.includes('localStorage.setItem("storeapp_pickups"')) {
    console.log(`${i+1}: ${l.trim()}`);
  }
});

console.log('\n=== BOTONES O ELEMENTOS CON NOMBRES DE OTRAS TIENDAS ===');
lines.forEach((l, i) => {
  if ((l.includes('Noutacc') || l.includes('BigHouse') || l.includes('BurgerHouse')) && 
      (l.includes('<button') || l.includes('onclick=') || l.includes('btn-load'))) {
    console.log(`${i+1}: ${l.trim()}`);
  }
});
