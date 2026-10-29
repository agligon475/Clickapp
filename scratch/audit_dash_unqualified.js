import fs from 'fs';

const content = fs.readFileSync('dashboard.html', 'utf8');
const lines = content.split('\n');

const patterns = [
  'storeapp_cfg',
  'storeapp_logo',
  'storeapp_banners',
  'storeapp_categories',
  'storeapp_hero_img',
  'storeapp_pages',
  'storeapp_local_products',
  'storeapp_abm_active'
];

lines.forEach((l, i) => {
  for (const p of patterns) {
    if (l.includes(p) && !l.includes(p + '_') && !l.includes(p + '`') && !l.includes(p + '"') && !l.includes(p + "' + ") && !l.includes('removeItem')) {
      console.log(`L${i+1} [${p}]: ${l.trim()}`);
    }
  }
});
