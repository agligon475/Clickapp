import fs from 'fs';
import path from 'path';

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f.startsWith('.') || f === 'node_modules') continue;
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (f !== 'Clickapp' && f !== 'Clickapp-main') searchDir(full);
    } else if (f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.json')) {
      const c = fs.readFileSync(full, 'utf8');
      if (c.includes('1548624149')) {
        console.log('Found in', full);
      }
    }
  }
}
searchDir('.');
