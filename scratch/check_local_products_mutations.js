import fs from 'fs';

const content = fs.readFileSync('dashboard.html', 'utf8');
const lines = content.split('\n');

console.log('--- USOS DE localProducts ---');
lines.forEach((l, i) => {
  if (l.includes('localProducts =') || l.includes('localProducts.push') || l.includes('localProducts.splice') || l.includes('localProducts.map') || l.includes('localProducts.filter')) {
    console.log(`${i+1}: ${l.trim().slice(0, 100)}`);
  }
});
