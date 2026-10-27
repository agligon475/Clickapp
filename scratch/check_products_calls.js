import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const dashContent = fs.readFileSync(path.join(rootDir, 'dashboard.html'), 'utf8');
const lines = dashContent.split('\n');

console.log('--- LLAMADAS A PRODUCTS EN DASHBOARD.HTML ---');
lines.forEach((l, idx) => {
  if (l.includes("updateInSupabase('products'") || l.includes("postToSupabase('products'")) {
    console.log(`L${idx + 1}: ${l.trim()}`);
  }
});
