import fs from 'fs';

const content = fs.readFileSync('dashboard.html', 'utf8');
const lines = content.split('\n');

console.log('--- LOCALSTORAGE EN DASHBOARD.HTML ---');
lines.forEach((l, i) => {
  if (l.includes('localStorage.get') || l.includes('localStorage.set')) {
    // Si no contiene STORE_ID o _${ o _" o _'
    if (!l.includes('STORE_ID') && !l.includes('store_id') && !l.includes('${') && !l.includes('theme') && !l.includes('auth')) {
      console.log(`${i+1}: ${l.trim()}`);
    }
  }
});
