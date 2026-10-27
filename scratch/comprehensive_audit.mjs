import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. CARGA DE VARIABLES DE ENTORNO
function loadEnv() {
  const envPath = path.join(rootDir, '.env');
  const env = {};
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx > 0) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim();
        env[key] = val;
      }
    }
  }
  return env;
}

const env = loadEnv();

console.log('='.repeat(70));
console.log('🚀 INICIANDO AUDITORÍA INTEGRAL DE LA PLATAFORMA CLICKAPP');
console.log('='.repeat(70));

const results = {
  connectivity: [],
  functionality: [],
  accessibility: []
};

// ----------------------------------------------------
// SECCIÓN 1: CONNECTIVITY (DB & AUTH)
// ----------------------------------------------------
async function testConnectivity() {
  console.log('\n📡 [1/3] EVALUANDO CONNECTIVITY (DB & AUTH)...');

  const sbUrl = env.SUPABASE_URL || 'https://iaylgsthwildjkiiwgfd.supabase.co';
  const sbKey = env.SUPABASE_KEY;

  if (!sbKey) {
    results.connectivity.push({
      item: 'Supabase Env Config',
      status: 'FAIL',
      detail: 'Falta SUPABASE_KEY en .env'
    });
    return;
  }

  // 1.1 Ping Supabase REST API
  try {
    const t0 = Date.now();
    const res = await fetch(`${sbUrl}/rest/v1/`, {
      headers: {
        'apikey': sbKey,
        'Authorization': `Bearer ${sbKey}`
      }
    });
    const latency = Date.now() - t0;
    results.connectivity.push({
      item: 'Supabase REST Root Endpoint',
      status: res.ok ? 'PASS' : 'WARN',
      detail: `HTTP ${res.status} (${latency}ms) - URL: ${sbUrl}`
    });
  } catch (err) {
    results.connectivity.push({
      item: 'Supabase REST Root Endpoint',
      status: 'FAIL',
      detail: err.message
    });
  }

  // 1.2 Consulta a tablas críticas
  const tables = [
    { name: 'company_settings', query: '?select=store_id,business_name,plan_level&limit=3' },
    { name: 'products', query: '?select=id,nombre,precio,store_id&limit=3' },
    { name: 'categories', query: '?select=id,name,store_id&limit=3' },
    { name: 'orders', query: '?select=id,store_id,created_at&limit=3' },
    { name: 'faqs', query: '?select=id,store_id&limit=3' }
  ];

  for (const t of tables) {
    try {
      const t0 = Date.now();
      const res = await fetch(`${sbUrl}/rest/v1/${t.name}${t.query}`, {
        headers: {
          'apikey': sbKey,
          'Authorization': `Bearer ${sbKey}`
        }
      });
      const latency = Date.now() - t0;
      if (res.ok) {
        const data = await res.json();
        results.connectivity.push({
          item: `Tabla DB: ${t.name}`,
          status: 'PASS',
          detail: `HTTP 200 (${latency}ms) - Filas retornadas: ${Array.isArray(data) ? data.length : 1}`
        });
      } else {
        const text = await res.text();
        results.connectivity.push({
          item: `Tabla DB: ${t.name}`,
          status: res.status === 401 || res.status === 403 ? 'WARN' : 'FAIL',
          detail: `HTTP ${res.status} - ${text.slice(0, 150)}`
        });
      }
    } catch (err) {
      results.connectivity.push({
        item: `Tabla DB: ${t.name}`,
        status: 'FAIL',
        detail: err.message
      });
    }
  }

  // 1.3 Storage Buckets
  try {
    const t0 = Date.now();
    const res = await fetch(`${sbUrl}/storage/v1/bucket`, {
      headers: {
        'apikey': sbKey,
        'Authorization': `Bearer ${sbKey}`
      }
    });
    const latency = Date.now() - t0;
    if (res.ok) {
      const buckets = await res.json();
      const bNames = Array.isArray(buckets) ? buckets.map(b => b.name).join(', ') : 'OK';
      results.connectivity.push({
        item: 'Supabase Storage Buckets',
        status: 'PASS',
        detail: `HTTP 200 (${latency}ms) - Buckets encontrados: [${bNames}]`
      });
    } else {
      results.connectivity.push({
        item: 'Supabase Storage Buckets',
        status: 'WARN',
        detail: `HTTP ${res.status} (Storage público no listable por RLS/anon)`
      });
    }
  } catch (err) {
    results.connectivity.push({
      item: 'Supabase Storage Buckets',
      status: 'FAIL',
      detail: err.message
    });
  }

  // 1.4 Dale!QueVoy Shared Supabase
  const sharedUrl = env.SHARED_SUPABASE_URL || 'https://ppqfvnexetuwldovpjlq.supabase.co';
  const sharedKey = env.SHARED_SUPABASE_ANON_KEY;
  if (sharedKey) {
    try {
      const t0 = Date.now();
      const res = await fetch(`${sharedUrl}/rest/v1/`, {
        headers: { 'apikey': sharedKey, 'Authorization': `Bearer ${sharedKey}` }
      });
      const latency = Date.now() - t0;
      results.connectivity.push({
        item: 'Dale!QueVoy Shared DB (Logística)',
        status: res.ok ? 'PASS' : 'WARN',
        detail: `HTTP ${res.status} (${latency}ms) - URL: ${sharedUrl}`
      });
    } catch (err) {
      results.connectivity.push({
        item: 'Dale!QueVoy Shared DB (Logística)',
        status: 'FAIL',
        detail: err.message
      });
    }
  }
}

// ----------------------------------------------------
// SECCIÓN 2: FUNCIONALIDAD (BACKEND & APIS)
// ----------------------------------------------------
async function testFunctionality() {
  console.log('\n⚙️ [2/3] EVALUANDO FUNCIONALIDAD (BACKEND & APIS)...');

  const apiDir = path.join(rootDir, 'api');
  const apiFiles = fs.readdirSync(apiDir).filter(f => f.endsWith('.js'));

  for (const file of apiFiles) {
    const filePath = path.join(apiDir, file);
    try {
      // 2.1 Verificación de Import y Sintaxis
      const module = await import(`file://${filePath}`);
      results.functionality.push({
        item: `Sintaxis API: api/${file}`,
        status: 'PASS',
        detail: `Export por defecto: ${typeof module.default}`
      });

      // 2.2 Test funcional por archivo
      if (file === 'store.js' && typeof module.default === 'function') {
        let statusCode = 200;
        let responseData = null;
        const mockReq = {
          method: 'GET',
          url: '/bighouse',
          headers: { host: 'daletepido.com.ar' },
          query: {}
        };
        const mockRes = {
          status: (code) => { statusCode = code; return mockRes; },
          setHeader: () => mockRes,
          json: (data) => { responseData = data; return mockRes; },
          send: (data) => { responseData = data; return mockRes; },
          end: () => mockRes
        };

        try {
          await module.default(mockReq, mockRes);
          const hasContent = responseData && (typeof responseData === 'string' && responseData.length > 1000);
          results.functionality.push({
            item: 'Funcionalidad api/store.js (SSR /bighouse)',
            status: statusCode === 200 && hasContent ? 'PASS' : 'WARN',
            detail: `HTTP ${statusCode} - HTML entregado: ${hasContent ? responseData.length + ' chars' : 'vacío'}`
          });
        } catch (callErr) {
          results.functionality.push({
            item: 'Funcionalidad api/store.js',
            status: 'FAIL',
            detail: `Excepción en ejecución: ${callErr.message}`
          });
        }
      }

      if (file === 'qr.js' && typeof module.default === 'function') {
        let statusCode = 200;
        let responseData = null;
        const mockReq = {
          method: 'GET',
          query: { store: 'bighouse' },
          headers: {}
        };
        const mockRes = {
          status: (code) => { statusCode = code; return mockRes; },
          setHeader: () => mockRes,
          send: (data) => { responseData = data; return mockRes; },
          json: (data) => { responseData = data; return mockRes; },
          end: () => mockRes
        };

        try {
          await module.default(mockReq, mockRes);
          const isBuffer = Buffer.isBuffer(responseData) && responseData.length > 500;
          results.functionality.push({
            item: 'Funcionalidad api/qr.js (generador QR)',
            status: statusCode === 200 && isBuffer ? 'PASS' : 'WARN',
            detail: `HTTP ${statusCode} - PNG generado: ${responseData ? responseData.length + ' bytes' : 'no'}`
          });
        } catch (callErr) {
          results.functionality.push({
            item: 'Funcionalidad api/qr.js',
            status: 'FAIL',
            detail: callErr.message
          });
        }
      }

      if (file === 'super-admin.js' && typeof module.default === 'function') {
        // Test de seguridad: rechazo de request sin token
        let statusCode = 200;
        let responseData = null;
        const mockReq = {
          method: 'POST',
          body: { action: 'list_companies' },
          headers: {}
        };
        const mockRes = {
          status: (code) => { statusCode = code; return mockRes; },
          setHeader: () => mockRes,
          json: (data) => { responseData = data; return mockRes; },
          end: () => mockRes
        };

        try {
          await module.default(mockReq, mockRes);
          const isProtected = statusCode === 401 || statusCode === 403;
          results.functionality.push({
            item: 'Seguridad api/super-admin.js (Token Auth Gate)',
            status: isProtected ? 'PASS' : 'WARN',
            detail: `HTTP ${statusCode} al invocar sin auth header (Esperado: 401/403)`
          });
        } catch (callErr) {
          results.functionality.push({
            item: 'Seguridad api/super-admin.js',
            status: 'WARN',
            detail: `Excepción controlada: ${callErr.message}`
          });
        }
      }

    } catch (err) {
      results.functionality.push({
        item: `Sintaxis API: api/${file}`,
        status: 'FAIL',
        detail: `Error al importar o compilar: ${err.message}`
      });
    }
  }
}

// ----------------------------------------------------
// SECCIÓN 3: ACCESIBILIDAD (UI / A11Y)
// ----------------------------------------------------
function testAccessibility() {
  console.log('\n♿ [3/3] EVALUANDO ACCESIBILIDAD (UI & WCAG)...');

  const htmlFiles = [
    'landing.html',
    'tienda.html',
    'dashboard.html',
    'super-admin-secret-dashboard.html',
    'alta-usuario.html',
    'kit-imprimible.html',
    'enviar-comprobante.html'
  ];

  for (const fileName of htmlFiles) {
    const filePath = path.join(rootDir, fileName);
    if (!fs.existsSync(filePath)) continue;

    const html = fs.readFileSync(filePath, 'utf8');

    // 3.1 Lang attribute
    const hasLang = /<html[^>]*lang=["'][a-zA-Z\-]+["']/i.test(html);
    // 3.2 Viewport
    const hasViewport = /<meta[^>]*name=["']viewport["']/i.test(html);
    // 3.3 H1 tag
    const h1Matches = html.match(/<h1[\s>]/gi) || [];
    // 3.4 Img tags without alt
    const imgMatches = html.match(/<img[^>]*>/gi) || [];
    let imgWithoutAlt = 0;
    for (const img of imgMatches) {
      if (!/alt\s*=\s*["'][^"']*["']/i.test(img)) {
        imgWithoutAlt++;
      }
    }

    // 3.5 Buttons without aria or text
    const btnMatches = html.match(/<button[\s\S]*?<\/button>/gi) || [];
    let emptyBtns = 0;
    for (const btn of btnMatches) {
      const text = btn.replace(/<[^>]*>/g, '').trim();
      const hasAria = /aria-label\s*=\s*["'][^"']+["']/i.test(btn) || /aria-labelledby/i.test(btn) || /title\s*=/i.test(btn);
      if (!text && !hasAria) {
        emptyBtns++;
      }
    }

    // 3.6 Form inputs without label or aria-label
    // Excluir inputs hidden, submit, button
    const inputMatches = html.match(/<input[^>]*>/gi) || [];
    let unlabelledInputs = 0;
    for (const inp of inputMatches) {
      if (/type\s*=\s*["'](hidden|submit|button|reset)["']/i.test(inp)) continue;
      const idMatch = inp.match(/id\s*=\s*["']([^"']+)["']/i);
      const hasAria = /aria-label\s*=\s*["'][^"']+["']/i.test(inp) || /aria-labelledby/i.test(inp) || /title\s*=/i.test(inp) || /placeholder\s*=/i.test(inp);
      let hasAssociatedLabel = false;
      if (idMatch) {
        const id = idMatch[1];
        hasAssociatedLabel = new RegExp(`<label[^>]*for=["']${id}["']`, 'i').test(html);
      }
      if (!hasAssociatedLabel && !hasAria) {
        unlabelledInputs++;
      }
    }

    results.accessibility.push({
      file: fileName,
      hasLang,
      hasViewport,
      h1Count: h1Matches.length,
      imgTotal: imgMatches.length,
      imgWithoutAlt,
      btnTotal: btnMatches.length,
      emptyBtns,
      inputTotal: inputMatches.length,
      unlabelledInputs
    });
  }
}

// ----------------------------------------------------
// EJECUCIÓN Y REPORTE
// ----------------------------------------------------
async function run() {
  await testConnectivity();
  await testFunctionality();
  testAccessibility();

  console.log('\n' + '='.repeat(70));
  console.log('📊 REPORTE DE RESULTADOS DE LA AUDITORÍA');
  console.log('='.repeat(70));

  console.log('\n📡 [CONNECTIVITY]');
  for (const r of results.connectivity) {
    const icon = r.status === 'PASS' ? '✅' : r.status === 'WARN' ? '⚠️' : '❌';
    console.log(`${icon} [${r.status}] ${r.item.padEnd(35)} : ${r.detail}`);
  }

  console.log('\n⚙️ [FUNCIONALIDAD & APIS]');
  for (const r of results.functionality) {
    const icon = r.status === 'PASS' ? '✅' : r.status === 'WARN' ? '⚠️' : '❌';
    console.log(`${icon} [${r.status}] ${r.item.padEnd(45)} : ${r.detail}`);
  }

  console.log('\n♿ [ACCESIBILIDAD (UI & WCAG)]');
  console.table(results.accessibility.map(a => ({
    Archivo: a.file,
    'Lang?': a.hasLang ? '✅' : '❌',
    'Viewport?': a.hasViewport ? '✅' : '❌',
    'H1s': a.h1Count,
    'Img sin Alt': `${a.imgWithoutAlt}/${a.imgTotal}`,
    'Btn sin Label': `${a.emptyBtns}/${a.btnTotal}`,
    'Input sin Label': `${a.unlabelledInputs}/${a.inputTotal}`
  })));

  // Guardar resultado JSON en scratch para análisis
  fs.writeFileSync(path.join(__dirname, 'audit_results.json'), JSON.stringify(results, null, 2));
  console.log('\n💾 Resultados guardados en scratch/audit_results.json');
}

run();
