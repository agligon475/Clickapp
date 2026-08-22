import fs from 'fs';

const html = fs.readFileSync('landing.html', 'utf8');
const lines = html.split('\n');

console.log('=== FAQ SECTION LINES (953 to 1020) ===');
lines.slice(953, 1020).forEach((line, idx) => {
  console.log(`L${idx + 954}: ${line}`);
});
