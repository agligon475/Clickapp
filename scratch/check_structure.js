import fs from 'fs';
const code = fs.readFileSync('dashboard.html', 'utf8');
const lines = code.split('\n');

lines.forEach((l, i) => {
  if (l.includes('class="main"') || l.includes('class="sidebar"') || l.includes('id="view-categories"') || l.includes('id="view-pickups"') || l.includes('<main') || l.includes('<aside')) {
    console.log(`${i+1}: ${l.trim().substring(0, 100)}`);
  }
});
