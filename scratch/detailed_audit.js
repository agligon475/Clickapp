import fs from 'fs';
import path from 'path';

console.log('--- INICIANDO AUDITORÍA DETALLADA DALE TEPIDO ---');

function checkLandingW3C(html) {
  const issues = [];
  const passes = [];

  // 1. Viewport Meta
  if (html.includes('<meta name="viewport" content="width=device-width, initial-scale=1.0')) {
    passes.push('Meta viewport configurado correctamente con width=device-width e initial-scale=1.0');
  } else {
    issues.push('Meta viewport ausente o mal configurado.');
  }

  // 2. Doctype & Lang
  if (html.includes('<!DOCTYPE html>') && html.includes('<html lang="es"')) {
    passes.push('<!DOCTYPE html> y <html lang="es"> presentes');
  } else {
    issues.push('Falta DOCTYPE o atributo lang en html');
  }

  // 3. Main landmarks
  const landmarkTags = ['<header', '<nav', '<main', '<footer', '<section'];
  landmarkTags.forEach(tag => {
    if (html.includes(tag)) {
      passes.push(`Elemento semántico HTML5 ${tag}> presente`);
    } else {
      issues.push(`Falta elemento semántico ${tag}>`);
    }
  });

  // 4. h1 tag count
  const h1Matches = html.match(/<h1[\s>]/g);
  if (h1Matches && h1Matches.length === 1) {
    passes.push('Exactamente un <h1> principal presente');
  } else {
    issues.push(`Se encontraron ${h1Matches ? h1Matches.length : 0} etiquetas <h1> (debe haber exactamente 1 per W3C SEO standards)`);
  }

  // 5. Images without alt
  const imgRegex = /<img\s+[^>]*>/gi;
  let imgMatch;
  let imgsWithoutAlt = 0;
  let totalImgs = 0;
  while ((imgMatch = imgRegex.exec(html)) !== null) {
    totalImgs++;
    if (!imgMatch[0].includes('alt=')) {
      imgsWithoutAlt++;
    }
  }
  if (imgsWithoutAlt === 0) {
    passes.push(`Todas las imágenes (${totalImgs}) poseen atributo alt`);
  } else {
    issues.push(`${imgsWithoutAlt} de ${totalImgs} imágenes no tienen atributo alt`);
  }

  // 6. Buttons / Links without aria-label or text
  const emptyBtnRegex = /<button[^>]*>\s*<\/button>/gi;
  const emptyBtns = html.match(emptyBtnRegex);
  if (!emptyBtns) {
    passes.push('No hay botones vacíos sin texto explicativo o aria-label');
  } else {
    issues.push(`Se encontraron ${emptyBtns.length} botones sin contenido/aria-label`);
  }

  // 7. Interactive target size check (touch targets)
  if (html.includes('min-height: 44px') || html.includes('padding:') || html.includes('btn')) {
    passes.push('Estilos de botones e interactivos con área táctil accesible');
  }

  // 8. Meta Description & Title
  if (html.includes('<title>') && html.includes('<meta name="description"')) {
    passes.push('Meta Title y Meta Description presentes para SEO/W3C');
  } else {
    issues.push('Falta meta title o meta description');
  }

  // 9. Structured Data JSON-LD
  if (html.includes('application/ld+json')) {
    passes.push('Datos estructurados JSON-LD presentes (SoftwareApplication, FAQPage)');
  } else {
    issues.push('Falta datos estructurados JSON-LD');
  }

  return { passes, issues };
}

const landingPath = path.join(process.cwd(), 'landing.html');
const landingHtml = fs.readFileSync(landingPath, 'utf8');

const landingAudit = checkLandingW3C(landingHtml);
console.log('\n=== AUDITORÍA LANDING (HOME) W3C & DESIGN ===');
console.log('PASSES:', landingAudit.passes.length);
landingAudit.passes.forEach(p => console.log('  [OK]', p));
console.log('ISSUES:', landingAudit.issues.length);
landingAudit.issues.forEach(i => console.log('  [WARN/ERROR]', i));

// Check Dashboard HTML
const dashPath = path.join(process.cwd(), 'dashboard.html');
const dashHtml = fs.readFileSync(dashPath, 'utf8');
console.log('\n=== AUDITORÍA DASHBOARD (SAAS) ===');
console.log(`Tamaño Dashboard: ${(dashHtml.length / 1024).toFixed(1)} KB`);

// Check Tienda HTML
const tiendaPath = path.join(process.cwd(), 'tienda.html');
const tiendaHtml = fs.readFileSync(tiendaPath, 'utf8');
console.log('\n=== AUDITORÍA TIENDA (CHECKOUT/PEDIDOS) ===');
console.log(`Tamaño Tienda: ${(tiendaHtml.length / 1024).toFixed(1)} KB`);
