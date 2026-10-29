import fs from 'fs';

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') || f.endsWith('.js'));

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('storeapp_local_products') || l.includes('storeapp_abm_active')) {
      console.log(`${file}:${i+1}: ${l.trim()}`);
    }
  });
}
