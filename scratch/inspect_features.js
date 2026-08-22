import fs from 'fs';

const html = fs.readFileSync('landing.html', 'utf8');
const lines = html.split('\n');

console.log('=== LINES 620 to 785 IN LANDING.HTML ===');
lines.slice(620, 785).forEach((line, idx) => {
  console.log(`L${idx + 621}: ${line}`);
});
