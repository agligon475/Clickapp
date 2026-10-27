const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'presentacion-evolucion-clickapp.html');
const outputPath = path.join(__dirname, '..', 'presentacion-evolucion-clickapp.md');

const html = fs.readFileSync(htmlPath, 'utf8');

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
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
}

let md = `# Dale! Te Pido (Clickapp) — Evolución Integral de Plataforma & Registro de Hitos Técnicos\n\n`;
md += `**Documento de Fuente Optimizado para Google NotebookLM**  \n`;
md += `*Fecha de Corte:* 27 de Octubre de 2026 · Versión de Plataforma: v4.10  \n`;
md += `*Resumen:* Registro maestro cronológico y técnico de la evolución de Dale! Te Pido (Clickapp) a lo largo de sus 27 etapas correlativas. Cubre arquitectura cloud serverless, persistencia relacional en Supabase, seguridad bancaria HMAC & RLS, suite integral de comercio (Storefront + Dashboard + SuperAdmin), logística multimodal Dale!QueVoy, video commerce y sincronización en tiempo real.\n\n`;
md += `---\n\n`;

const slideRegex = /<section\s+class="slide[^"]*"[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/section>/gi;
let slideMatch;
let slideIndex = 0;

while ((slideMatch = slideRegex.exec(html)) !== null) {
  slideIndex++;
  const slideId = slideMatch[1];
  const slideContent = slideMatch[2];

  // Title: h1 or h2
  const h1Match = slideContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h2Match = slideContent.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  const title = h1Match ? cleanText(h1Match[1]) : (h2Match ? cleanText(h2Match[1]) : `Etapa ${slideIndex}`);

  // Badge / subtitle
  const badgeMatch = slideContent.match(/<span\s+class="slide-badge"[^>]*>([\s\S]*?)<\/span>/i);
  const pillMatch = slideContent.match(/<span style="font-family:var\(--font-mono\)[^>]*>([\s\S]*?)<\/span>/i);
  const badge = badgeMatch ? cleanText(badgeMatch[1]) : (pillMatch ? cleanText(pillMatch[1]) : `Etapa ${slideIndex}`);

  // Description
  const descMatch = slideContent.match(/<p\s+class="slide-desc"[^>]*>([\s\S]*?)<\/p>/i);
  const heroDescMatch = slideContent.match(/<p style="font-size:clamp[^>]*>([\s\S]*?)<\/p>/i);
  const desc = descMatch ? cleanText(descMatch[1]) : (heroDescMatch ? cleanText(heroDescMatch[1]) : '');

  md += `## Diapositiva ${slideIndex}: ${title}\n\n`;
  if (badge) {
    md += `> **Hito / Estado:** ${badge}\n\n`;
  }
  if (desc) {
    md += `${desc}\n\n`;
  }

  // Hero metrics (Slide 1 style)
  const heroCardRegex = /<div\s+class="metric-hero">([\s\S]*?)<\/div>\s*<div\s+class="card-text">([\s\S]*?)<\/div>/gi;
  let heroCardMatch;
  const heroCards = [];
  while ((heroCardMatch = heroCardRegex.exec(slideContent)) !== null) {
    const numMatch = heroCardMatch[1].match(/<span\s+class="metric-num"[^>]*>([\s\S]*?)<\/span>/i);
    const subMatch = heroCardMatch[1].match(/<span\s+class="metric-sub"[^>]*>([\s\S]*?)<\/span>/i);
    const textContent = heroCardMatch[2];
    if (numMatch && subMatch) {
      heroCards.push({
        num: cleanText(numMatch[1]),
        sub: cleanText(subMatch[1]),
        text: cleanText(textContent)
      });
    }
  }

  if (heroCards.length > 0) {
    md += `### Métricas Clave de la Plataforma:\n`;
    heroCards.forEach(c => {
      md += `- **${c.num} ${c.sub}:** ${c.text}\n`;
    });
    md += `\n`;
  }

  // Standard metric boxes
  const metricBoxRegex = /<div\s+class="metric-box"[^>]*>([\s\S]*?)<\/div>/gi;
  let mboxMatch;
  const mboxes = [];
  while ((mboxMatch = metricBoxRegex.exec(slideContent)) !== null) {
    const valMatch = mboxMatch[1].match(/<div\s+class="metric-val"[^>]*>([\s\S]*?)<\/div>/i);
    const lblMatch = mboxMatch[1].match(/<div\s+class="metric-lbl"[^>]*>([\s\S]*?)<\/div>/i);
    if (valMatch && lblMatch) {
      mboxes.push({
        val: cleanText(valMatch[1]),
        lbl: cleanText(lblMatch[1])
      });
    }
  }

  if (mboxes.length > 0) {
    md += `### Indicadores Numéricos:\n`;
    mboxes.forEach(m => {
      md += `- **${m.val}:** ${m.lbl}\n`;
    });
    md += `\n`;
  }

  // Cards with card-title and text
  const cardRegex = /<div\s+class="card"[^>]*>([\s\S]*?)<\/div>/gi;
  const titleAndDescRegex = /<div\s+class="card-title"[^>]*>([\s\S]*?)<\/div>[\s\S]*?(?:<p[^>]*>|<div\s+class="card-text"[^>]*>)([\s\S]*?)(?:<\/p>|<\/div>)/gi;
  let tdMatch;
  const cards = [];
  while ((tdMatch = titleAndDescRegex.exec(slideContent)) !== null) {
    cards.push({
      title: cleanText(tdMatch[1]),
      body: cleanText(tdMatch[2])
    });
  }

  if (cards.length > 0) {
    md += `### Componentes e Innovaciones Implementadas:\n\n`;
    cards.forEach(c => {
      md += `#### ${c.title}\n`;
      md += `${c.body}\n\n`;
    });
  }

  // Extract lists (if slide has <ul> or <ol>)
  const listMatch = slideContent.match(/<ul[^>]*>([\s\S]*?)<\/ul>/i);
  if (listMatch) {
    const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
    let liMatch;
    const items = [];
    while ((liMatch = liRegex.exec(listMatch[1])) !== null) {
      items.push(cleanText(liMatch[1]));
    }
    if (items.length > 0) {
      md += `### Puntos Destacados:\n`;
      items.forEach(it => {
        md += `- ${it}\n`;
      });
      md += `\n`;
    }
  }

  md += `---\n\n`;
}

fs.writeFileSync(outputPath, md, 'utf8');
console.log(`Exportación completada exitosamente: ${outputPath}`);
console.log(`Total de diapositivas procesadas: ${slideIndex}`);
