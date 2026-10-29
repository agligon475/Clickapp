import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const s = fs.readFileSync(path.join(rootDir, 'dashboard.html'), 'utf8');
const lines = s.split('\n');

lines.forEach((l, idx) => {
  if (l.includes('topbar-right') || l.includes('topbar-actions') || l.includes('sync-time') || l.includes('prods-count')) {
    console.log(`L${idx + 1}: ${l.trim().slice(0, 100)}`);
  }
});
