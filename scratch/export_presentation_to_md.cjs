const fs = require('fs');
const path = require('path');

const SECRET_AI_SLUG = 'ai-vault-9f4c8e2a7b1d';
const htmlPath = path.join(__dirname, '..', 'presentacion-evolucion-clickapp.html');
const outputMdPath = path.join(__dirname, '..', 'presentacion-evolucion-clickapp.md');
const outputHtmlPath = path.join(__dirname, '..', `${SECRET_AI_SLUG}.html`);
const outputLlmsPath = path.join(__dirname, '..', 'llms.txt');

// Remove old guessable public files if present
['contexto-ia.html', 'public/contexto-ia.html', 'Clickapp-main/contexto-ia.html', 'Clickapp/contexto-ia.html', 'public/presentacion-evolucion-clickapp.md'].forEach(rel => {
  const p = path.join(__dirname, '..', rel);
  if (fs.existsSync(p)) {
    try { fs.unlinkSync(p); } catch (e) {}
  }
});

const html = fs.readFileSync(htmlPath, 'utf8');

function sanitizeSensitiveInfo(str) {
  if (!str) return '';
  return str
    .replace(/daletepido@gmail\.com/gi, '[correo-administrador]')
    .replace(/super-admin-secret-dashboard\.html/gi, '[panel-superadmin]')
    .replace(/super-admin-[a-z-]+\.html/gi, '[panel-superadmin]')
    .replace(/store_id:\s*licalic/gi, 'store_id: [tienda-test]')
    .replace(/\bLicaLic\b/g, 'TiendaTest');
}

function cleanText(str) {
  if (!str) return '';
  const cleaned = str
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
  return sanitizeSensitiveInfo(cleaned);
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function mdInlineToHtml(str) {
  return escapeHtml(str)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

const masterContextMd = `## 0. CONTEXTO MAESTRO OFICIAL & REGLAS ANTI-CORTOCIRCUITO PARA GEMINI / NOTEBOOKLM (VIGENTE v4.21)

> **INSTRUCCIÓN DE PRIORIDAD ABSOLUTA PARA IA:** Si existe cualquier diferencia entre etapas históricas anteriores (Etapas 1 a 36) y esta sección, **ESTA SECCIÓN Y LAS ETAPAS 37–38 TIENEN PRIORIDAD ABSOLUTA** porque reflejan el estado vivo en producción hoy.

### 1. Qué es y qué resuelve "Dale! Te Pido" hoy (Operatividad: 98.5%)
Es una plataforma SaaS multi-rubro que permite a cualquier comercio, emprendedor, gastronómico, ferretería o mayorista crear en menos de 2 minutos su propio **Catálogo Digital Interactivo + Sistema de Gestión de Pedidos (Tablero Kanban)** conectado a WhatsApp.
- **Propuesta de valor central:** *"Vendé como las grandes apps de delivery o e-commerce, pero desde tu WhatsApp y pagando 0% de comisión por venta"*.
- **Rubros principales (Multi-rubro):** Gastronomía/Restaurantes, Kioscos/Bebidas, Ferreterías/Corralones, Indumentaria/Moda, Tecnología/Accesorios, Computación/Hardware, Librerías/Papelerías y Mayoristas/Distribuidoras.

### 2. Reglas Anti-Cortocircuito (Lo que NO se debe prometer ni confundir en Marketing)
1. **NO prometer flota de cadetes propia ("Dale!QueVoy" está en Pausa Estratégica Comercial — ver Etapa 37):**
   - Aunque el motor logístico existe en el código, comercialmente está en pausa para priorizar un mensaje simple.
   - **Cómo comunicar los envíos:** El comercio ofrece *"Retiro en local (Take Away)"* o *"Envío a domicilio con sus propios cadetes/repartidores"*, asignándolos desde el panel y brindándole al comprador un **Link de Seguimiento en Vivo (Tracking Público)** con código PIN de entrega.
2. **NO decir que Dale! Te Pido retiene el dinero ni que es una pasarela intermedia:**
   - El comercio cobra el 100% directo en su cuenta (**0% comisión por venta**). Soporta **Efectivo** (con cálculo de vuelto), **Transferencia Bancaria** (el cliente copia el Alias/CBU en 1 clic desde la tienda y adjunta el comprobante) y **Mercado Pago** propio del comercio.
3. **NO hablar de facturación fiscal AFIP/ARCA:**
   - El sistema imprime comandas térmicas de 58mm/80mm llamadas **"Tickets de Pedido Interno"** (Etapa 37), diseñadas para la cocina, el mostrador, el armado de pedidos o como recordatorio físico para reponer mercadería agotada con proveedores.
4. **NO decir que el comprador necesita descargar una App para comprar:**
   - El comprador final entra desde un link web ultra-rápido (\`daletepido.com/tienda?store=nombre\`) o escaneando un QR en el mostrador, sin instalar nada ni registrarse.

### 3. Diferenciales Reales ("Efecto ¡Wow!") listos para Campañas de Marketing
1. **Onboarding sin fricción en 2 minutos (Etapa 38):** Todos los botones de *"Crear Catálogo Gratis"* abren directo el Paso 1 del creador de tienda (\`alta-usuario.html?mode=register\`), emiten sesión automática y dejan al comerciante dentro de su panel con su catálogo 100% limpio (o con opción opt-in de precargar 5 categorías sugeridas).
2. **Doble impacto del Pedido (WhatsApp + Tablero Kanban en Tiempo Real):**
   - Cuando un cliente compra desde su celular, el pedido llega estructurado al WhatsApp del comercio y **al mismo tiempo entra en vivo como tarjeta al Tablero Kanban** en la PC o tablet del local, haciendo sonar la campanita de caja registradora.
3. **Tracking Público en Vivo para el Comprador (\`tracking.html\`):**
   - Cada compra genera un link único con 4 pasos en tiempo real (*Recibido ➔ En Preparación ➔ En Camino ➔ Entregado*). Cuando el comerciante arrastra la tarjeta en su Kanban (con mouse o con el dedo en pantalla táctil), el comprador ve avanzar su pedido en su celular sin preguntar *"¿Por dónde viene?"*.
4. **Video Commerce (Micro-Videos en Productos):**
   - Permite mostrar videos cortos en las tarjetas de producto que se reproducen al instante sin frenar la carga móvil.
5. **Kit Imprimible QR HD para Mostrador y Vidriera (\`kit-imprimible.html\`):**
   - Generador automático de carteles A4/A5 listos para imprimir con el logo y QR de la tienda.
6. **Asistente IA Integrado (jAIme / Gemini):**
   - Redacta descripciones vendedoras, sugiere precios y busca fotos de productos desde adentro del panel.
7. **Gestión de Precios Anti-Inflación:**
   - Aumentos masivos por porcentaje, por rubro/categoría o importación/exportación Excel/CSV en segundos.

### 4. URLs Oficiales de Campaña y Tiendas Demo (Blindadas en Producción)
- **Landing Principal:** \`https://www.daletepido.com.ar\`
- **Registro Directo (Paso 1):** \`https://www.daletepido.com.ar/alta-usuario.html?mode=register\`
- **7 Tiendas Demo Públicas (Solo lectura):**
  - Gastronomía: \`bighouse\` (\`https://www.daletepido.com.ar/tienda?store=bighouse\`)
  - Kiosco / Bebidas: \`kioscojulio\` (\`https://www.daletepido.com.ar/tienda?store=kioscojulio\`)
  - Ferretería: \`ferre-now\` (\`https://www.daletepido.com.ar/tienda?store=ferre-now\`)
  - Tecnología: \`noutacc\` (\`https://www.daletepido.com.ar/tienda?store=noutacc\`)
  - Computación: \`tecnomont\` (\`https://www.daletepido.com.ar/tienda?store=tecnomont\`)
  - Indumentaria: \`biuti\` (\`https://www.daletepido.com.ar/tienda?store=biuti\`)
  - Librería / Corralón: \`todolisto\` y \`lugonessilva\`
`;

let md = `# Dale! Te Pido (Clickapp) — Evolución Integral de Plataforma & Contexto Maestro para IA\n\n`;
md += `**Documento Privado de Fuente Viva para Google NotebookLM y Gemini**  \n`;
md += `*Fecha de Corte:* 29 de Octubre de 2026 · Versión de Plataforma: v4.21 · Operatividad Global: 98.5% (Ready for Paid Social Ads)  \n`;
md += `*Resumen:* Registro maestro cronológico, comercial, arquitectónico y técnico de Dale! Te Pido (Clickapp) a lo largo de sus 38 etapas correlativas. Incluye las reglas comerciales vigentes anti-cortocircuito para campañas de marketing y el detalle funcional de la plataforma.\n\n`;
md += `---\n\n`;
md += masterContextMd + `\n\n---\n\n`;

const slideRegex = /<section\s+class="slide[^"]*"[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/section>/gi;
let slideMatch;
let slideIndex = 0;
const parsedSlides = [];

while ((slideMatch = slideRegex.exec(html)) !== null) {
  slideIndex++;
  const slideContent = slideMatch[2];

  const h1Match = slideContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h2Match = slideContent.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  const title = h1Match ? cleanText(h1Match[1]) : (h2Match ? cleanText(h2Match[1]) : `Etapa ${slideIndex}`);

  const badgeMatch = slideContent.match(/<span\s+class="slide-badge"[^>]*>([\s\S]*?)<\/span>/i);
  const pillMatch = slideContent.match(/<span style="font-family:var\(--font-mono\)[^>]*>([\s\S]*?)<\/span>/i);
  const badge = badgeMatch ? cleanText(badgeMatch[1]) : (pillMatch ? cleanText(pillMatch[1]) : `Etapa ${slideIndex}`);

  const descMatch = slideContent.match(/<p\s+class="slide-desc"[^>]*>([\s\S]*?)<\/p>/i);
  const heroDescMatch = slideContent.match(/<p style="font-size:clamp[^>]*>([\s\S]*?)<\/p>/i);
  const desc = descMatch ? cleanText(descMatch[1]) : (heroDescMatch ? cleanText(heroDescMatch[1]) : '');

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

  const titleAndDescRegex = /<div\s+class="card-title"[^>]*>([\s\S]*?)<\/div>[\s\S]*?(?:<p[^>]*>|<div\s+class="card-text"[^>]*>)([\s\S]*?)(?:<\/p>|<\/div>)/gi;
  let tdMatch;
  const cards = [];
  while ((tdMatch = titleAndDescRegex.exec(slideContent)) !== null) {
    cards.push({
      title: cleanText(tdMatch[1]),
      body: cleanText(tdMatch[2])
    });
  }

  const listMatch = slideContent.match(/<ul[^>]*>([\s\S]*?)<\/ul>/i);
  const items = [];
  if (listMatch) {
    const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
    let liMatch;
    while ((liMatch = liRegex.exec(listMatch[1])) !== null) {
      items.push(cleanText(liMatch[1]));
    }
  }

  parsedSlides.push({
    index: slideIndex,
    title,
    badge,
    desc,
    heroCards,
    mboxes,
    cards,
    items
  });

  md += `## Diapositiva ${slideIndex}: ${title}\n\n`;
  if (badge) md += `> **Hito / Estado:** ${badge}\n\n`;
  if (desc) md += `${desc}\n\n`;

  if (heroCards.length > 0) {
    md += `### Métricas Clave de la Plataforma:\n`;
    heroCards.forEach(c => {
      md += `- **${c.num} ${c.sub}:** ${c.text}\n`;
    });
    md += `\n`;
  }

  if (mboxes.length > 0) {
    md += `### Indicadores Numéricos:\n`;
    mboxes.forEach(m => {
      md += `- **${m.val}:** ${m.lbl}\n`;
    });
    md += `\n`;
  }

  if (cards.length > 0) {
    md += `### Componentes e Innovaciones Implementadas:\n\n`;
    cards.forEach(c => {
      md += `#### ${c.title}\n`;
      md += `${c.body}\n\n`;
    });
  }

  if (items.length > 0) {
    md += `### Puntos Destacados:\n`;
    items.forEach(it => {
      md += `- ${it}\n`;
    });
    md += `\n`;
  }

  md += `---\n\n`;
}

fs.writeFileSync(outputMdPath, md, 'utf8');

// Generate unlisted, noindex semantic HTML for private NotebookLM & Gemini URL ingestion
let semanticHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dale! Te Pido — Contexto Maestro IA v4.21 (Etapas 1 a ${slideIndex})</title>
  <meta name="robots" content="noindex, nofollow" />
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0F172A;
      color: #F8FAFC;
      line-height: 1.65;
      max-width: 960px;
      margin: 0 auto;
      padding: 40px 24px 80px;
    }
    header {
      border-bottom: 2px solid #F59E0B;
      padding-bottom: 24px;
      margin-bottom: 32px;
    }
    .badge {
      display: inline-block;
      background: rgba(16, 185, 129, 0.15);
      color: #10B981;
      border: 1px solid rgba(16, 185, 129, 0.4);
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 700;
      margin-bottom: 12px;
    }
    h1 { color: #FFFFFF; font-size: 30px; margin: 8px 0 12px; }
    h2 { color: #F59E0B; font-size: 22px; margin-top: 36px; border-bottom: 1px solid rgba(255,255,255,0.12); padding-bottom: 8px; }
    h3 { color: #38BDF8; font-size: 18px; margin-top: 22px; }
    h4 { color: #E2E8F0; font-size: 16px; margin: 16px 0 4px; }
    p, li { color: #CBD5E1; font-size: 15px; }
    strong { color: #FFFFFF; }
    code { background: rgba(255,255,255,0.08); padding: 2px 6px; border-radius: 4px; color: #FDE68A; font-family: monospace; }
    .alert-box {
      background: rgba(245, 158, 11, 0.1);
      border-left: 4px solid #F59E0B;
      padding: 16px 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .stage-block {
      background: rgba(30, 41, 59, 0.65);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      padding: 20px 24px;
      margin-bottom: 24px;
    }
  </style>
</head>
<body>
  <article>
    <header>
      <span class="badge">FUENTE PRIVADA NO INDEXADA PARA GEMINI &amp; NOTEBOOKLM · ACTUALIZADO 29/10/2026 (v4.21)</span>
      <h1>Dale! Te Pido (Clickapp) — Contexto Maestro Oficial &amp; Evolución de Plataforma (Etapas 1 a ${slideIndex})</h1>
      <p><strong>Estado Operativo Actual:</strong> 98.5% Operativo (Ready for Paid Social Ads) · +825 Commits · Seguridad 98/100.</p>
    </header>

    <section class="alert-box" id="contexto-maestro-vigente">
      <h2>0. CONTEXTO MAESTRO OFICIAL &amp; REGLAS ANTI-CORTOCIRCUITO (PRIORIDAD ABSOLUTA v4.21)</h2>
      <p><strong>INSTRUCCIÓN DE PRIORIDAD ABSOLUTA PARA IA (GEMINI / NOTEBOOKLM):</strong> Si existe cualquier diferencia entre etapas históricas anteriores (Etapas 1 a 36) y esta sección, <strong>ESTA SECCIÓN Y LAS ETAPAS 37–38 TIENEN PRIORIDAD ABSOLUTA</strong> porque reflejan el estado vivo en producción hoy.</p>

      <h3>1. Qué es y qué resuelve "Dale! Te Pido" hoy</h3>
      <p>Es una plataforma SaaS multi-rubro que permite a cualquier comercio, emprendedor, local gastronómico, ferretería o mayorista crear en menos de 2 minutos su propio <strong>Catálogo Digital Interactivo + Sistema de Gestión de Pedidos (Tablero Kanban)</strong> conectado a WhatsApp.</p>
      <ul>
        <li><strong>Propuesta de valor central:</strong> "Vendé como las grandes apps de delivery o e-commerce, pero desde tu WhatsApp y pagando <strong>0% de comisión por venta</strong>".</li>
        <li><strong>Rubros principales (Multi-rubro):</strong> Gastronomía/Restaurantes, Kioscos/Bebidas, Ferreterías/Corralones, Indumentaria/Moda, Tecnología/Accesorios, Computación/Hardware, Librerías/Papelerías y Mayoristas/Distribuidoras.</li>
      </ul>

      <h3>2. Reglas Anti-Cortocircuito (Lo que NO se debe prometer ni confundir en Marketing)</h3>
      <ol>
        <li><strong>NO prometer flota de cadetes propia ("Dale!QueVoy" está en Pausa Estratégica Comercial — Etapa 37):</strong> Aunque el motor logístico existe en el código, comercialmente está en pausa para priorizar un mensaje simple. Comunicá que el comercio puede ofrecer <em>"Retiro en local (Take Away)"</em> o <em>"Envío a domicilio con sus propios cadetes/repartidores"</em>, asignándolos desde el panel y brindándole al comprador un <strong>Link de Seguimiento en Vivo (Tracking Público)</strong> con código PIN de entrega.</li>
        <li><strong>NO decir que Dale! Te Pido retiene el dinero ni que somos intermediarios de pago:</strong> El comercio cobra el 100% directo en su cuenta (0% comisión por venta). Soporta <strong>Efectivo</strong> (con cálculo de vuelto), <strong>Transferencia Bancaria</strong> (el cliente copia el Alias/CBU en 1 clic desde la tienda y adjunta el comprobante) y <strong>Mercado Pago</strong> propio del comercio.</li>
        <li><strong>NO hablar de facturación fiscal AFIP/ARCA:</strong> El sistema imprime comandas térmicas de 58mm/80mm llamadas <strong>"Tickets de Pedido Interno"</strong> (Etapa 37), diseñadas para cocina, mostrador, armado de pedidos o como recordatorio físico para reponer mercadería agotada con proveedores.</li>
        <li><strong>NO decir que el comprador necesita descargar una App para comprar:</strong> El comprador final entra desde un link web ultra-rápido (<code>daletepido.com/tienda?store=nombre</code>) o escaneando un QR en el mostrador, sin instalar nada ni registrarse.</li>
      </ol>

      <h3>3. Diferenciales Reales ("Efecto ¡Wow!") listos para Campañas de Marketing</h3>
      <ul>
        <li><strong>Onboarding sin fricción en 2 minutos (Etapa 38):</strong> Todos los botones de "Crear Catálogo Gratis" abren directo el Paso 1 del creador de tienda (<code>alta-usuario.html?mode=register</code>), emiten sesión automática y dejan al comerciante dentro de su panel con su catálogo 100% limpio (con opción opt-in de precargar 5 categorías sugeridas).</li>
        <li><strong>Doble impacto del Pedido (WhatsApp + Tablero Kanban en Tiempo Real):</strong> Cuando un cliente compra desde su celular, el pedido llega estructurado al WhatsApp del comercio y al mismo tiempo entra en vivo como tarjeta al Tablero Kanban en la PC o tablet del local, haciendo sonar la campanita de caja registradora.</li>
        <li><strong>Tracking Público en Vivo para el Comprador (<code>tracking.html</code>):</strong> Cada compra genera un link único con 4 pasos en tiempo real (Recibido ➔ En Preparación ➔ En Camino ➔ Entregado). Cuando el comerciante arrastra la tarjeta en su Kanban (con mouse o dedo en pantalla táctil), el comprador ve avanzar su pedido en vivo.</li>
        <li><strong>Video Commerce (Micro-Videos en Productos):</strong> Videos cortos en tarjetas de producto con reproducción instantánea.</li>
        <li><strong>Kit Imprimible QR HD para Mostrador y Vidriera (<code>kit-imprimible.html</code>):</strong> Carteles A4/A5 listos para imprimir en 1 clic con el logo y QR del comercio.</li>
        <li><strong>Asistente IA Integrado (jAIme / Gemini):</strong> Redacta descripciones vendedoras, sugiere configuraciones y busca fotos de productos desde adentro del panel.</li>
        <li><strong>Gestión de Precios Anti-Inflación:</strong> Aumentos masivos por porcentaje, por categoría o vía Excel/CSV en segundos.</li>
      </ul>

      <h3>4. URLs Oficiales de Campaña y las 7 Tiendas Demo Blindadas</h3>
      <ul>
        <li><strong>Landing Principal:</strong> <code>https://www.daletepido.com.ar</code></li>
        <li><strong>Registro Directo (Paso 1):</strong> <code>https://www.daletepido.com.ar/alta-usuario.html?mode=register</code></li>
        <li><strong>7 Tiendas Demo Públicas (Solo lectura):</strong> <code>bighouse</code> (Gastronomía), <code>kioscojulio</code> (Kiosco/Bebidas), <code>ferre-now</code> (Ferretería), <code>noutacc</code> (Tecnología), <code>tecnomont</code> (Hardware/Computación), <code>biuti</code> (Indumentaria), <code>todolisto</code> y <code>lugonessilva</code> (Librería/Corralón).</li>
      </ul>
    </section>

    <section id="historial-etapas">
      <h2>REGISTRO CRONOLÓGICO DE LAS ${slideIndex} ETAPAS DE EVOLUCIÓN</h2>
`;

parsedSlides.forEach(s => {
  semanticHtml += `      <div class="stage-block" id="etapa-${s.index}">\n`;
  semanticHtml += `        <h2>Diapositiva ${s.index}: ${mdInlineToHtml(s.title)}</h2>\n`;
  if (s.badge) semanticHtml += `        <p><strong>Hito / Estado:</strong> ${mdInlineToHtml(s.badge)}</p>\n`;
  if (s.desc) semanticHtml += `        <p>${mdInlineToHtml(s.desc)}</p>\n`;

  if (s.heroCards.length > 0) {
    semanticHtml += `        <h3>Métricas Clave de la Plataforma</h3>\n        <ul>\n`;
    s.heroCards.forEach(c => {
      semanticHtml += `          <li><strong>${mdInlineToHtml(c.num)} ${mdInlineToHtml(c.sub)}:</strong> ${mdInlineToHtml(c.text)}</li>\n`;
    });
    semanticHtml += `        </ul>\n`;
  }

  if (s.mboxes.length > 0) {
    semanticHtml += `        <h3>Indicadores Numéricos</h3>\n        <ul>\n`;
    s.mboxes.forEach(m => {
      semanticHtml += `          <li><strong>${mdInlineToHtml(m.val)}:</strong> ${mdInlineToHtml(m.lbl)}</li>\n`;
    });
    semanticHtml += `        </ul>\n`;
  }

  if (s.cards.length > 0) {
    semanticHtml += `        <h3>Componentes e Innovaciones Implementadas</h3>\n`;
    s.cards.forEach(c => {
      semanticHtml += `        <h4>${mdInlineToHtml(c.title)}</h4>\n`;
      semanticHtml += `        <p>${mdInlineToHtml(c.body)}</p>\n`;
    });
  }

  if (s.items.length > 0) {
    semanticHtml += `        <h3>Puntos Destacados</h3>\n        <ul>\n`;
    s.items.forEach(it => {
      semanticHtml += `          <li>${mdInlineToHtml(it)}</li>\n`;
    });
    semanticHtml += `        </ul>\n`;
  }

  semanticHtml += `      </div>\n`;
});

semanticHtml += `    </section>
  </article>
</body>
</html>`;

fs.writeFileSync(outputHtmlPath, semanticHtml, 'utf8');

// Public llms.txt: strictly commercial public overview (no secret links, no internal strategy)
const publicLlmsContent = `# Dale! Te Pido - Catálogo Digital Interactivo y Gestión de Pedidos por WhatsApp

> Dale! Te Pido es la plataforma SaaS multi-rubro que permite a comercios, gastronómicos, ferreterías, tiendas de indumentaria y mayoristas crear su catálogo digital interactivo en 2 minutos con 0% de comisión por venta.

## Características Comerciales Principales
- **0% Comisión por Venta:** Cobrás el 100% directo en tu Efectivo, Transferencia Bancaria (con copia de Alias en 1 clic) o Mercado Pago.
- **Doble Recepción (WhatsApp + Tablero Kanban en Tiempo Real):** El pedido llega estructurado al WhatsApp del comercio y al Tablero Kanban en vivo.
- **Seguimiento en Vivo para Compradores (Tracking Público):** Link en tiempo real con las 4 etapas del pedido (Recibido, En Preparación, En Camino, Entregado).
- **Video Commerce:** Soporte para micro-videos en tarjetas de producto.
- **Kit Imprimible QR HD:** Cartelería A4/A5 lista para imprimir para mostrador y vidriera.
- **Asistente IA Integrado:** Redacción automática de descripciones y búsqueda inteligente de fotos de productos.

## Enlaces Públicos Oficiales
- [Sitio Principal](https://www.daletepido.com)
- [Crear Catálogo Gratis](https://www.daletepido.com/alta-usuario.html?mode=register)
- [Centro de Ayuda](https://www.daletepido.com/ayuda)
`;
fs.writeFileSync(outputLlmsPath, publicLlmsContent, 'utf8');

['public', 'Clickapp-main', 'Clickapp'].forEach(dir => {
  const dirPath = path.join(__dirname, '..', dir);
  if (fs.existsSync(dirPath)) {
    fs.writeFileSync(path.join(dirPath, `${SECRET_AI_SLUG}.html`), semanticHtml, 'utf8');
    fs.writeFileSync(path.join(dirPath, 'llms.txt'), publicLlmsContent, 'utf8');
  }
});

console.log(`Exportación privada completada exitosamente:`);
console.log(`- Slug secreto no listado: /${SECRET_AI_SLUG}`);
console.log(`- Total de diapositivas procesadas: ${slideIndex}`);
