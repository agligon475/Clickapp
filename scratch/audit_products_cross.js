import fs from 'fs';

console.log('--- BUSCANDO PRODUCT FALLBACKS Y STORAGE EN DASHBOARD.HTML ---');
const dashLines = fs.readFileSync('dashboard.html', 'utf8').split('\n');
dashLines.forEach((l, i) => {
  if (l.includes('localStorage') && (l.includes('prod') || l.includes('sheet') || l.includes('item'))) {
    if (!l.includes('storeapp_prods_' + '') && !l.includes('storeapp_products_' + '')) {
      console.log(`DASH ${i+1}: ${l.trim()}`);
    }
  }
});

console.log('\n--- BUSCANDO PRODUCT FALLBACKS Y STORAGE EN TIENDA.HTML ---');
const tiendaLines = fs.readFileSync('tienda.html', 'utf8').split('\n');
tiendaLines.forEach((l, i) => {
  if (l.includes('localStorage') && (l.includes('prod') || l.includes('sheet') || l.includes('catalog') || l.includes('item'))) {
    console.log(`TIENDA ${i+1}: ${l.trim()}`);
  }
});
