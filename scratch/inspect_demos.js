import fs from 'fs';

const html = fs.readFileSync('landing.html', 'utf8');
const lines = html.split('\n');

console.log('=== DEMO STORES SECTION (LINES 480 to 600) ===');
lines.slice(480, 600).forEach((line, idx) => {
  console.log(`L${idx + 481}: ${line}`);
});
