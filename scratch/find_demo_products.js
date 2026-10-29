import fs from 'fs';

const content = fs.readFileSync('dashboard.html', 'utf8');
const lines = content.split('\n');

lines.forEach((l, i) => {
  if (l.includes('SUBRUBRO_PRODUCTS_MAP') || l.includes('defaultProducts') || l.includes('demoProducts') || l.includes('p1') && l.includes('name:')) {
    console.log(`${i+1}: ${l.trim().slice(0, 100)}`);
  }
});
