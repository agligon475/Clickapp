import fs from 'fs';

const html = fs.readFileSync('landing.html', 'utf8');
const lines = html.split('\n');

console.log('=== PRICING SECTION LINES (785 to 950) ===');
lines.slice(785, 950).forEach((line, idx) => {
  console.log(`L${idx + 786}: ${line}`);
});
