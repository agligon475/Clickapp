import fs from 'fs';

const content = fs.readFileSync('tienda.html', 'utf8');
const lines = content.split('\n');

console.log('--- LOCALSTORAGE EN TIENDA.HTML ---');
lines.forEach((l, i) => {
  if (l.includes('localStorage.')) {
    console.log(`${i+1}: ${l.trim()}`);
  }
});
