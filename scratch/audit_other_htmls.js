import fs from 'fs';

const files = ['pedidos.html', 'seguimiento.html', 'checkout.html', 'alta-usuario.html', 'dejar-resena.html'];
const patterns = [
  'storeapp_cfg',
  'storeapp_logo',
  'storeapp_banners',
  'storeapp_categories',
  'storeapp_hero_img',
  'storeapp_pages',
  'storeapp_local_products',
  'storeapp_abm_active',
  'storeapp_orders',
  'storeapp_pickups',
  'storeapp_horarios'
];

for (const f of files) {
  if (fs.existsSync(f)) {
    const lines = fs.readFileSync(f, 'utf8').split('\n');
    lines.forEach((l, i) => {
      for (const p of patterns) {
        if (l.includes(p) && !l.includes(p + '_') && !l.includes(p + '`') && !l.includes(p + '"') && !l.includes(p + "' + ") && !l.includes('removeItem')) {
          console.log(`${f} L${i+1} [${p}]: ${l.trim()}`);
        }
      }
    });
  }
}
