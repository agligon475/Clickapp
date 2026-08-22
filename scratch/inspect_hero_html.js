import fs from 'fs';

const html = fs.readFileSync('landing.html', 'utf8');
const lines = html.split('\n');

console.log('=== LINES 250 to 480 IN LANDING.HTML ===');
lines.slice(250, 480).forEach((line, idx) => {
  if (line.includes('<section') || line.includes('class="hero') || line.includes('<h1>') || line.includes('<nav')) {
    console.log(`L${idx + 251}: ${line.trim()}`);
  }
});
