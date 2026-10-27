import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function analyzeFile(name) {
  const content = fs.readFileSync(path.join(rootDir, name), 'utf8');
  console.log(`\n=== ANÁLISIS DE ${name} ===`);
  
  // Img sin alt
  const imgRegex = /<img\b([^>]*)>/gi;
  let m;
  while ((m = imgRegex.exec(content)) !== null) {
    if (!/alt\s*=\s*["'][^"']*["']/i.test(m[1])) {
      const line = content.slice(0, m.index).split('\n').length;
      console.log(`[IMG SIN ALT] L${line}: ${m[0]}`);
    }
  }

  // Button sin texto ni aria
  const btnRegex = /<button\b([^>]*)>([\s\S]*?)<\/button>/gi;
  while ((m = btnRegex.exec(content)) !== null) {
    const inner = m[2].replace(/<[^>]*>/g, '').trim();
    const hasAria = /aria-label\s*=\s*["'][^"']+["']/i.test(m[1]) || /aria-labelledby/i.test(m[1]) || /title\s*=/i.test(m[1]);
    if (!inner && !hasAria) {
      const line = content.slice(0, m.index).split('\n').length;
      console.log(`[BTN SIN LABEL] L${line}: ${m[0].slice(0, 100)}`);
    }
  }

  // Inputs sin label ni aria
  const inpRegex = /<input\b([^>]*)>/gi;
  while ((m = inpRegex.exec(content)) !== null) {
    const attrs = m[1];
    if (/type\s*=\s*["'](hidden|submit|button|reset)["']/i.test(attrs)) continue;
    const idMatch = attrs.match(/id\s*=\s*["']([^"']+)["']/i);
    const hasAria = /aria-label\s*=\s*["'][^"']+["']/i.test(attrs) || /aria-labelledby/i.test(attrs) || /title\s*=/i.test(attrs);
    let hasLabel = false;
    if (idMatch) {
      hasLabel = new RegExp(`<label[^>]*for=["']${idMatch[1]}["']`, 'i').test(content);
    }
    if (!hasLabel && !hasAria) {
      const line = content.slice(0, m.index).split('\n').length;
      console.log(`[INPUT SIN LABEL] L${line}: ${m[0]}`);
    }
  }
}

analyzeFile('tienda.html');
analyzeFile('enviar-comprobante.html');
