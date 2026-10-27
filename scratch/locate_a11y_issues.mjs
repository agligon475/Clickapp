import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function auditFile(fileRel) {
  const fullPath = path.join(rootDir, fileRel);
  if (!fs.existsSync(fullPath)) return;
  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');

  console.log(`\n================== DETALLES ACCESIBILIDAD: ${fileRel} ==================`);

  // 1. Img sin alt
  console.log('\n--- IMÁGENES SIN ALT ---');
  lines.forEach((line, idx) => {
    const match = line.match(/<img\b([^>]*)>/gi);
    if (match) {
      match.forEach(tag => {
        if (!/alt\s*=\s*["'][^"']*["']/i.test(tag)) {
          console.log(`L${idx + 1}: ${tag.slice(0, 100)}`);
        }
      });
    }
  });

  // 2. Botones sin texto ni aria
  console.log('\n--- BOTONES SIN TEXTO NI ARIA-LABEL ---');
  // Buscar botones en bloques
  const btnRegex = /<button\b([^>]*)>([\s\S]*?)<\/button>/gi;
  let m;
  while ((m = btnRegex.exec(content)) !== null) {
    const attrs = m[1];
    const inner = m[2].replace(/<[^>]*>/g, '').trim();
    const hasAria = /aria-label\s*=\s*["'][^"']+["']/i.test(attrs) || /aria-labelledby/i.test(attrs) || /title\s*=/i.test(attrs);
    if (!inner && !hasAria) {
      // Encontrar número de línea aproximado
      const lineNum = content.slice(0, m.index).split('\n').length;
      console.log(`L${lineNum}: <button ${attrs.slice(0, 80)}>...`);
    }
  }

  // 3. Inputs sin label ni aria
  console.log('\n--- INPUTS SIN LABEL NI ARIA-LABEL ---');
  lines.forEach((line, idx) => {
    const inpMatch = line.match(/<input\b([^>]*)>/gi);
    if (inpMatch) {
      inpMatch.forEach(tag => {
        if (/type\s*=\s*["'](hidden|submit|button|reset)["']/i.test(tag)) return;
        const idMatch = tag.match(/id\s*=\s*["']([^"']+)["']/i);
        const hasAria = /aria-label\s*=\s*["'][^"']+["']/i.test(tag) || /aria-labelledby/i.test(tag) || /title\s*=/i.test(tag);
        let hasAssociatedLabel = false;
        if (idMatch) {
          const id = idMatch[1];
          hasAssociatedLabel = new RegExp(`<label[^>]*for=["']${id}["']`, 'i').test(content);
        }
        if (!hasAssociatedLabel && !hasAria) {
          console.log(`L${idx + 1}: ${tag.slice(0, 100)}`);
        }
      });
    }
  });
}

auditFile('tienda.html');
auditFile('enviar-comprobante.html');
auditFile('dashboard.html');
