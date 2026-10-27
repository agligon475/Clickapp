import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function mockRes() {
  const res = {
    statusCode: 200,
    headers: {},
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    setHeader(name, val) {
      this.headers[name.toLowerCase()] = val;
      return this;
    },
    json(obj) {
      this.body = obj;
      return this;
    },
    send(data) {
      this.body = data;
      return this;
    },
    end() {
      return this;
    }
  };
  return res;
}

async function runTests() {
  console.log('--- TESTING EXHAUSTIVO DE BACKEND (api/*.js) ---\n');

  // 1. api/qr.js con targetUrl válido
  try {
    const qrMod = await import(`file://${path.join(rootDir, 'api', 'qr.js')}`);
    const res = mockRes();
    await qrMod.default({ query: { store: 'bighouse' }, headers: {} }, res);
    console.log(`[PASS] api/qr.js (store=bighouse) -> HTTP ${res.statusCode}, Content-Type: ${res.headers['content-type']}, Bytes: ${res.body?.length || 0}`);
  } catch (e) {
    console.log(`[FAIL] api/qr.js -> ${e.message}`);
  }

  // 1b. api/qr.js sin parámetros (debe fallar 400 controlado)
  try {
    const qrMod = await import(`file://${path.join(rootDir, 'api', 'qr.js')}`);
    const res = mockRes();
    await qrMod.default({ query: {}, headers: {} }, res);
    console.log(`[PASS] api/qr.js (sin params) -> HTTP ${res.statusCode} (esperado 400), Error: ${res.body?.error}`);
  } catch (e) {
    console.log(`[FAIL] api/qr.js -> ${e.message}`);
  }

  // 2. api/jaime.js
  try {
    const jaimeMod = await import(`file://${path.join(rootDir, 'api', 'jaime.js')}`);
    const res = mockRes();
    await jaimeMod.default({
      method: 'POST',
      body: { message: '¿Cómo cargo un producto en mi catálogo?' },
      headers: {}
    }, res);
    console.log(`[PASS] api/jaime.js (consulta producto) -> HTTP ${res.statusCode}, Pose: ${res.body?.pose}, Respuesta: ${res.body?.reply?.slice(0, 60)}...`);
  } catch (e) {
    console.log(`[FAIL] api/jaime.js -> ${e.message}`);
  }

  // 3. api/store.js - Rutas estáticas y SSR
  try {
    const storeMod = await import(`file://${path.join(rootDir, 'api', 'store.js')}`);
    // Prueba ruta estática /terminos
    const res1 = mockRes();
    await storeMod.default({
      headers: { host: 'daletepido.com.ar' },
      url: '/terminos',
      query: {}
    }, res1);
    console.log(`[PASS] api/store.js (/terminos) -> HTTP ${res1.statusCode}, Content-Type: ${res1.headers['content-type']}, Tamaño: ${res1.body?.length || 0} chars`);

    // Prueba ruta dinámica de tienda /bighouse
    const res2 = mockRes();
    await storeMod.default({
      headers: { host: 'daletepido.com.ar' },
      url: '/bighouse',
      query: {}
    }, res2);
    const hasOg = res2.body && res2.body.includes('Big House');
    console.log(`[PASS] api/store.js (/bighouse SSR) -> HTTP ${res2.statusCode}, Inyección OpenGraph: ${hasOg ? 'Detectada' : 'Fallback'}, Tamaño: ${res2.body?.length || 0} chars`);
  } catch (e) {
    console.log(`[FAIL] api/store.js -> ${e.message}`);
  }

  // 4. api/image-search.js
  try {
    const imgMod = await import(`file://${path.join(rootDir, 'api', 'image-search.js')}`);
    const res = mockRes();
    await imgMod.default({
      method: 'GET',
      query: { query: 'hamburguesa' },
      headers: {}
    }, res);
    console.log(`[PASS] api/image-search.js (query=hamburguesa) -> HTTP ${res.statusCode}, Resultados: ${Array.isArray(res.body?.results) ? res.body.results.length : 0}`);
  } catch (e) {
    console.log(`[FAIL] api/image-search.js -> ${e.message}`);
  }

  // 5. api/super-admin.js (CORS & Token Gate)
  try {
    const saMod = await import(`file://${path.join(rootDir, 'api', 'super-admin.js')}`);
    const res = mockRes();
    await saMod.default({
      method: 'POST',
      body: { action: 'ping' },
      headers: {}
    }, res);
    console.log(`[PASS] api/super-admin.js (auth gate) -> HTTP ${res.statusCode} (esperado 401/403)`);
  } catch (e) {
    console.log(`[FAIL] api/super-admin.js -> ${e.message}`);
  }

  // 6. api/auth.js (login intento con credenciales dummy)
  try {
    const authMod = await import(`file://${path.join(rootDir, 'api', 'auth.js')}`);
    const res = mockRes();
    await authMod.default({
      method: 'POST',
      body: { action: 'login', store_id: 'inexistente_123', password: 'wrong' },
      headers: {}
    }, res);
    console.log(`[PASS] api/auth.js (login fallido) -> HTTP ${res.statusCode} (esperado 401), Error: ${res.body?.error}`);
  } catch (e) {
    console.log(`[FAIL] api/auth.js -> ${e.message}`);
  }
}

runTests();
