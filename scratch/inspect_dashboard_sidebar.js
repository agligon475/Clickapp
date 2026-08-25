import fs from 'fs';

const html = fs.readFileSync('dashboard.html', 'utf8');

// Find onclick attributes inside sidebar items
const sidebarClickMatches = [...html.matchAll(/class="[^"]*sb-item[^"]*"[^>]*onclick="([^"]+)"/gi)];
console.log('Sidebar item onclick handlers:');
sidebarClickMatches.forEach(m => console.log('-', m[1]));
