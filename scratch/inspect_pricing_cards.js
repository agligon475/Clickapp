import fs from 'fs';

const html = fs.readFileSync('landing.html', 'utf8');
const lines = html.split('\n');

console.log('=== PRICING CARDS LINES (785 to 870) ===');
lines.slice(785, 870).forEach((line, idx) => {
  console.log(`L${idx + 786}: ${line}`);
});
