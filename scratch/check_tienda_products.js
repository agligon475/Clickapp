import fs from 'fs';

const content = fs.readFileSync('tienda.html', 'utf8');
const lines = content.split('\n');

lines.forEach((l, i) => {
  if (l.includes('fetchFromSupabase') || l.includes('products') && (l.includes('fetch') || l.includes('load') || l.includes('get') || l.includes('rest/v1/products'))) {
    console.log(`${i+1}: ${l.trim()}`);
  }
});
