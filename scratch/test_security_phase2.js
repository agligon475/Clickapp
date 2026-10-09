import { signToken, verifyToken, checkRateLimit, validateReceiptUrl, setSecureCors, sanitizeInput } from '../api/security.js';

console.log('🔒 INICIANDO SUITE DE PRUEBAS AUTOMATIZADAS — HARDENING FASE 2 & 3...');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASSED: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAILED: ${message}`);
    failed++;
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// PRUEBA 1 & 2: SEC-04 — Gemini Proxy Autenticación & Prevención de Abuso
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n[PRUEBA 1-3] Verificación SEC-04: Gemini AI Proxy Protection');

// Simulación de handler de Gemini
import geminiHandler from '../api/gemini.js';

// Caso 1: Petición anónima sin x-gemini-key ni token de sesión
const mockResAnon = {
  statusCode: 200,
  headers: {},
  setHeader(k, v) { this.headers[k] = v; },
  status(code) { this.statusCode = code; return this; },
  json(data) { this.data = data; return this; },
  end() { return this; }
};

await geminiHandler({
  method: 'POST',
  headers: {},
  body: { contents: [{ parts: [{ text: 'test' }] }] }
}, mockResAnon);

assert(mockResAnon.statusCode === 401, 'Rechaza petición anónima al proxy de Gemini con HTTP 401');
assert(mockResAnon.data?.code === 'AUTH_REQUIRED_FOR_AI', 'Retorna código de error explicativo AUTH_REQUIRED_FOR_AI');

// Caso 2: Petición con token manipulado
const mockResTampered = {
  statusCode: 200,
  headers: {},
  setHeader(k, v) { this.headers[k] = v; },
  status(code) { this.statusCode = code; return this; },
  json(data) { this.data = data; return this; },
  end() { return this; }
};

await geminiHandler({
  method: 'POST',
  headers: { authorization: 'Bearer token_trucho_forjado_123' },
  body: { contents: [{ parts: [{ text: 'test' }] }] }
}, mockResTampered);

assert(mockResTampered.statusCode === 401, 'Rechaza petición con token JWT manipulado');

// Caso 3: Petición con token JWT legítimo de comercio
const validToken = signToken({ store_id: 'tienda_test', type: 'session' });
const mockResAuth = {
  statusCode: 200,
  headers: {},
  setHeader(k, v) { this.headers[k] = v; },
  status(code) { this.statusCode = code; return this; },
  json(data) { this.data = data; return this; },
  end() { return this; }
};

await geminiHandler({
  method: 'POST',
  headers: { authorization: `Bearer ${validToken}` },
  body: { contents: [{ parts: [{ text: 'test' }] }] }
}, mockResAuth);

// Si tiene sesión legítima, supera la barrera de autenticación (el resultado será 503/502 según si hay key configurada en env)
assert(mockResAuth.statusCode !== 401, 'Sesión de comercio legítima pasa validación de autenticación en Gemini Proxy');

// ══════════════════════════════════════════════════════════════════════════════
// PRUEBA 4: SEC-04 — Rate Limiting de Gemini por Tienda / IP
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n[PRUEBA 4] Verificación SEC-04: Rate Limiting de IA');

const testKey = 'test_store_rl_' + Date.now();
for (let i = 1; i <= 35; i++) {
  checkRateLimit(testKey, 35, 60000);
}
const blockedRl = checkRateLimit(testKey, 35, 60000);
assert(!blockedRl.allowed, 'Bloquea solicitudes que exceden la cuota de rate limit (allowed === false)');
assert(blockedRl.remaining === 0, 'Indica remaining === 0 al agotarse la cuota');

// ══════════════════════════════════════════════════════════════════════════════
// PRUEBA 5: SEC-05 — Validación Estricta de URLs de Comprobantes (Anti-SSRF / Phishing)
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n[PRUEBA 5-7] Verificación SEC-05: Validación de URLs de Comprobantes');

assert(!validateReceiptUrl('http://169.254.169.254/latest/meta-data'), 'Bloquea intento de SSRF a IP de metadata de Cloud');
assert(!validateReceiptUrl('javascript:alert(document.cookie)'), 'Bloquea inyección de pseudo-protocolo javascript:');
assert(!validateReceiptUrl('http://malicious-site.com/exploit.jpg'), 'Bloquea HTTP no cifrado y dominio no autorizado');
assert(validateReceiptUrl('https://res.cloudinary.com/daletepido/image/upload/v1234/recibo.jpg'), 'Acepta URL HTTPS de CDN oficial de Cloudinary');
assert(validateReceiptUrl('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD12345'), 'Acepta Data URL Base64 segura de imagen para fallback');

// ══════════════════════════════════════════════════════════════════════════════
// PRUEBA 8: SEC-05 — Sanitización Defensiva de Entradas
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n[PRUEBA 8] Verificación SEC-05: Sanitización de Texto y Notas');

const dirtyNote = '<script>alert("hack")</script> Transferencia realizada';
const cleanNote = sanitizeInput(dirtyNote, 500);
assert(!cleanNote.includes('<script>'), 'Elimina tags HTML activos del campo notas');
assert(cleanNote.includes('&lt;script&gt;'), 'Escapa entidades HTML peligrosas');

// ══════════════════════════════════════════════════════════════════════════════
// PRUEBA 9 & 10: SEC-06 — Encabezados CORS Restrictivos & Security Headers
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n[PRUEBA 9-10] Verificación SEC-06: CORS Restrictivo y Security Headers');

const mockCorsRes = {
  headers: {},
  setHeader(k, v) { this.headers[k] = v; }
};

setSecureCors({ headers: { origin: 'https://evil-hacker.com' } }, mockCorsRes);
assert(mockCorsRes.headers['Access-Control-Allow-Origin'] !== 'https://evil-hacker.com', 'No refleja origen de sitio atacante no autorizado');
assert(mockCorsRes.headers['X-Content-Type-Options'] === 'nosniff', 'Aplica header X-Content-Type-Options: nosniff');
assert(mockCorsRes.headers['X-Frame-Options'] === 'SAMEORIGIN', 'Aplica header X-Frame-Options: SAMEORIGIN');

const mockCorsAllowed = {
  headers: {},
  setHeader(k, v) { this.headers[k] = v; }
};
setSecureCors({ headers: { origin: 'https://daletepido.com.ar' } }, mockCorsAllowed);
assert(mockCorsAllowed.headers['Access-Control-Allow-Origin'] === 'https://daletepido.com.ar', 'Permite dominio oficial autorizado daletepido.com.ar');

// ══════════════════════════════════════════════════════════════════════════════
// PRUEBA 11: SEC-08 — Protección Anti-Fuerza Bruta en Login
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n[PRUEBA 11] Verificación SEC-08: Prevención de Fuerza Bruta');

const bruteKey = 'login_ip_192.168.1.100_tiendatest';
for (let i = 1; i <= 15; i++) {
  checkRateLimit(bruteKey, 15, 15 * 60 * 1000);
}
const bruteBlocked = checkRateLimit(bruteKey, 15, 15 * 60 * 1000);
assert(!bruteBlocked.allowed, 'Bloquea intentos de autenticación tras alcanzar umbral de 15 intentos');

// ══════════════════════════════════════════════════════════════════════════════
// RESUMEN
// ══════════════════════════════════════════════════════════════════════════════
console.log(`\n======================================================`);
console.log(`RESULTADO DE TESTS DE HARDENING: ${passed} PASSED | ${failed} FAILED`);
console.log(`======================================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🏆 TODAS LAS 11 PRUEBAS DE SEGURIDAD PASARON AL 100% CON ÉXITO.');
}
