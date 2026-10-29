const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'presentacion-evolucion-clickapp.html');
const outputPath = path.join(__dirname, '..', 'presentacion-evolucion-clickapp.md');

const html = fs.readFileSync(htmlPath, 'utf8');

// Helper to strip tags and format clean text
function cleanText(str) {
  if (!str) return '';
  return str
    .replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<strong>([\s\S]*?)<\/strong>/gi, '**$1**')
    .replace(/<b>([\s\S]*?)<\/b>/gi, '**$1**')
    .replace(/<em>([\s\S]*?)<\/em>/gi, '*$1*')
    .replace(/<i>([\s\S]*?)<\/i>/gi, '*$1*')
    .replace(/<code>([\s\S]*?)<\/code>/gi, '`$1`')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

let md = `# Dale! Te Pido (Clickapp) — Evolución del Proyecto y Registro de Mejoras Técnicas\n\n`;
md += `**Documento de Fuente para NotebookLM**  \n`;
md += `*Versión:* 4.10 · Actualizado al 27 de Octubre de 2026  \n`;
md += `*Descripción:* Historial integral cronológico de la evolución técnica, arquitectónica, visual, funcional y de seguridad de la plataforma Dale! Te Pido (Clickapp), estructurado en 27 etapas correlativas.\n\n`;
md += `---\n\n`;

// Extract slides
const slideRegex = /<section\s+class="slide"[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/section>/gi;
let slideMatch;
let slideIndex = 0;

while ((slideMatch = slideRegex.exec(html)) !== null) {
  slideIndex++;
  const slideId = slideMatch[1];
  const slideContent = slideMatch[2];

  const badgeMatch = slideContent.match(/<span\s+class="slide-badge"[^>]*>([\s\S]*?)<\/span>/i);
  const titleMatch = slideContent.match(/<h2\s+class="slide-title"[^>]*>([\s\S]*?)<\/h2>/i);
  const descMatch = slideContent.match(/<p\s+class="slide-desc"[^>]*>([\s\S]*?)<\/p>/i);

  const badge = badgeMatch ? cleanText(badgeMatch[1]) : `Etapa ${slideIndex}`;
  const title = titleMatch ? cleanText(titleMatch[1]) : `Diapositiva ${slideIndex}`;
  const desc = descMatch ? cleanText(descMatch[1]) : '';

  md += `## Diapositiva ${slideIndex}: ${title}\n\n`;
  if (badge) {
    md += `> **Estado / Hito:** ${badge}\n\n`;
  }
  if (desc) {
    md += `${desc}\n\n`;
  }

  // Extract metric cards / KPI cards if any
  const metricRegex = /<div\s+class="metric-box"[^>]*>([\s\S]*?)<\/div>/gi;
  let metricMatch;
  const metrics = [];
  while ((metricMatch = metricRegex.exec(slideContent)) !== null) {
    const valMatch = metricMatch[1].match(/<div\s+class="metric-val"[^>]*>([\s\S]*?)<\/div>/i);
    const lblMatch = metricMatch[1].match(/<div\s+class="metric-lbl"[^>]*>([\s\S]*?)<\/div>/i);
    if (valMatch && lblMatch) {
      metrics.push({
        val: cleanText(valMatch[1]),
        lbl: cleanText(lblMatch[1])
      });
    }
  }

  if (metrics.length > 0) {
    md += `### Métricas Clave:\n`;
    metrics.forEach(m => {
      md += `- **${m.val}:** ${m.lbl}\n`;
    });
    md += `\n`;
  }

  // Extract feature cards
  const cardRegex = /<div\s+class="card"[^>]*>([\s\S]*?)<\/div>\s*(?=<div\s+class="card"|<\/div>\s*<\/section>|<\/div>\s*<div\s+style=|$)/gi;
  let cardMatch;
  const cards = [];

  // Match inside grid containers
  const gridContentMatch = slideContent.match(/<div\s+class="grid-[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<div\s+style="margin-top/i) 
    || slideContent.match(/<div\s+class="grid-[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/section>/i);

  const searchIn = gridContentMatch ? gridContentMatch[1] : slideContent;

  const individualCardRegex = /<div\s+class="card"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi;
  // Let's parse all card-title and p in the slide
  const titleAndDescRegex = /<div\s+class="card-title"[^>]*>([\s\S]*?)<\/div>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/gi;
  let tdMatch;
  while ((tdMatch = titleAndDescRegex.exec(slideContent)) !== null) {
    cards.push({
      title: cleanText(tdMatch[1]),
      body: cleanText(tdMatch[2])
    });
  }

  if (cards.length > 0) {
    md += `### Innovaciones e Implementaciones Realizadas:\n\n`;
    cards.forEach(c => {
      md += `#### ${c.title}\n`;
      md += `${c.body}\n\n`;
    });
  }

  md += `---\n\n`;
}

fs.writeFileSync(outputPath, md, 'utf8');
console.log(`Exportación completada exitosamente: ${outputPath}`);
console.log(`Total de diapositivas procesadas: ${slideIndex}`);
