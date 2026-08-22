import fs from 'fs';

const html = fs.readFileSync('landing.html', 'utf8');
const lines = html.split('\n');

console.log('=== HERO SECTION LINES (100 to 250) ===');
lines.slice(100, 250).forEach((line, idx) => {
  console.log(`L${idx + 101}: ${line}`);
});
