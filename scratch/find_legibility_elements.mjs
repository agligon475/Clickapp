import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const s = fs.readFileSync(path.join(rootDir, 'dashboard.html'), 'utf8');
const lines = s.split('\n');

function findTerms(terms) {
  lines.forEach((l, idx) => {
    terms.forEach(t => {
      if (l.includes(t)) {
        console.log(`[${t}] L${idx + 1}: ${l.trim().slice(0, 120)}`);
      }
    });
  });
}

findTerms([
  'sc-card-desc',
  'PLAN ENTERPRISE',
  'VERIFICACIÓN PENDIENTE',
  'PRUEBA GRATUITA',
  '¿Qué vamos a hacer hoy?',
  'plan-badge',
  'trial-banner',
  'verification-banner'
]);
