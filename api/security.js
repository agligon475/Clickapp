import crypto from 'node:crypto';

// Clave secreta robusta para HMAC-SHA256
const JWT_SECRET = process.env.AUTH_JWT_SECRET || 'daletepido_jwt_supersecret_hardening_2026_x89a';

/**
 * Firma un payload en formato JWT compacto con HMAC-SHA256 (RFC 7519)
 * @param {Object} payload Datos a incluir en el token
 * @param {number} expiresInSeconds Segundos de vigencia (default 7 días = 604800s)
 * @returns {string} Token firmado: header.payload.signature
 */
export function signToken(payload, expiresInSeconds = 86400 * 7) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const iat = Math.floor(Date.now() / 1000);
  const body = Buffer.from(JSON.stringify({ ...payload, iat, exp })).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

/**
 * Verifica y decodifica un token firmado HMAC-SHA256 con protección contra timing attacks
 * @param {string} token
 * @param {string|null} expectedType Tipo esperado ('session', 'password_reset', etc.)
 * @returns {Object|null} Payload si es válido, null si es inválido, manipulado o expirado
 */
export function verifyToken(token, expectedType = null) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [h, b, sig] = parts;
  try {
    const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(`${h}.${b}`).digest('base64url');

    // Comparación en tiempo constante para evitar Timing Attacks (CWE-208)
    const sigBuf = Buffer.from(sig);
    const expBuf = Buffer.from(expectedSig);
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(b, 'base64url').toString('utf8'));
    const now = Math.floor(Date.now() / 1000);

    // Validación estricta de tiempo de expiración
    if (!payload.exp || payload.exp < now) {
      return null;
    }

    // Validación de tipo si se especificó
    if (expectedType && payload.type !== expectedType) {
      return null;
    }

    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Genera un código OTP numérico seguro de 6 dígitos
 */
export function generateOtpCode() {
  return crypto.randomInt(100000, 999999).toString();
}

/**
 * Memoria volátil para Rate Limiting (por IP, store_id o endpoint)
 */
const rateLimitMap = new Map();

/**
 * Comprueba y aplica cuota de Rate Limiting
 * @param {string} key Identificador único (ej: `gemini_${store_id}`, `auth_${ip}`)
 * @param {number} maxRequests Límite máximo de solicitudes por ventana
 * @param {number} windowMs Duración de la ventana en milisegundos (default 1 hora)
 * @returns {{ allowed: boolean, remaining: number, resetMs: number }}
 */
export function checkRateLimit(key, maxRequests = 30, windowMs = 60 * 60 * 1000) {
  const now = Date.now();
  const record = rateLimitMap.get(key) || { count: 0, resetAt: now + windowMs };

  if (now > record.resetAt) {
    record.count = 1;
    record.resetAt = now + windowMs;
  } else {
    record.count += 1;
  }

  rateLimitMap.set(key, record);

  // Limpieza periódica para evitar fugas de memoria
  if (rateLimitMap.size > 5000) {
    for (const [k, v] of rateLimitMap.entries()) {
      if (now > v.resetAt) rateLimitMap.delete(k);
    }
  }

  const allowed = record.count <= maxRequests;
  const remaining = Math.max(0, maxRequests - record.count);
  const resetMs = Math.max(0, record.resetAt - now);

  return { allowed, remaining, resetMs, current: record.count };
}

/**
 * Orígenes autorizados para CORS en producción y desarrollo
 */
const ALLOWED_ORIGINS = [
  'https://daletepido.com.ar',
  'https://www.daletepido.com.ar',
  'https://clickapp.com.ar',
  'https://www.clickapp.com.ar'
];

/**
 * Aplica encabezados CORS restrictivos y de seguridad HTTP defensiva (CWE-346, CWE-1021)
 * @param {Object} req Objeto de petición HTTP
 * @param {Object} res Objeto de respuesta HTTP
 * @param {string} allowedMethods Métodos HTTP permitidos
 * @param {string} customHeaders Encabezados adicionales permitidos
 * @returns {boolean} True si el origen fue permitido o no requirió CORS
 */
export function setSecureCors(req, res, allowedMethods = 'GET, POST, OPTIONS', customHeaders = '') {
  const origin = req.headers?.origin || '';
  
  // Encabezados de defensa en profundidad
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  let isAllowed = false;

  if (!origin) {
    // Petición interna o same-origin (sin header origin)
    isAllowed = true;
  } else {
    // Verificar si es localhost, Vercel preview o dominio de producción
    const isLocalhost = /^http:\/\/localhost(:\d+)?$/.test(origin) || /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin);
    const isVercelPreview = /^https:\/\/[a-z0-9_-]+\.vercel\.app$/.test(origin);
    const isDomainAllowed = ALLOWED_ORIGINS.includes(origin) || origin.endsWith('.daletepido.com.ar');

    if (isLocalhost || isVercelPreview || isDomainAllowed) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      isAllowed = true;
    } else {
      // Origen no autorizado: restringir a dominio principal
      res.setHeader('Access-Control-Allow-Origin', 'https://daletepido.com.ar');
      isAllowed = false;
    }
  }

  res.setHeader('Access-Control-Allow-Methods', allowedMethods);
  
  const defaultHeaders = 'Content-Type, Authorization, x-gemini-key, x-super-admin-key, x-store-session';
  const fullHeaders = customHeaders ? `${defaultHeaders}, ${customHeaders}` : defaultHeaders;
  res.setHeader('Access-Control-Allow-Headers', fullHeaders);
  res.setHeader('Access-Control-Max-Age', '86400');

  return isAllowed;
}

/**
 * Valida de forma estricta que una URL de comprobante de pago sea HTTPS y provenga de CDN autorizado
 * Protege contra SSRF (CWE-918) y phishing/inyección de esquemas (javascript:, file:)
 * @param {string} url URL del comprobante de pago
 * @returns {boolean} True si es una URL válida y segura
 */
export function validateReceiptUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const clean = url.trim();

  // Permitir Data URLs seguras de imágenes en base64 para fallback local (máx 3MB)
  if (/^data:image\/(jpeg|png|webp|jpg);base64,[A-Za-z0-9+/=]+$/.test(clean)) {
    return clean.length <= 4 * 1024 * 1024;
  }

  if (clean.length > 500) return false;

  try {
    const parsed = new URL(clean);
    // Solo permitir protocolo HTTPS
    if (parsed.protocol !== 'https:') return false;

    // Solo permitir hosts de CDN autorizados (Cloudinary o Supabase Storage de la plataforma)
    const allowedHosts = [
      'res.cloudinary.com',
      'iaylgsthwildjkiiwgfd.supabase.co',
      'images.unsplash.com'
    ];

    const isAllowedHost = allowedHosts.includes(parsed.hostname.toLowerCase());
    return isAllowedHost;
  } catch (err) {
    return false;
  }
}

/**
 * Sanitiza campos de texto para evitar XSS básico o desbordes de longitud
 * @param {string} text Texto a sanitizar
 * @param {number} maxLength Longitud máxima permitida
 * @returns {string} Texto limpio
 */
export function sanitizeInput(text, maxLength = 1000) {
  if (text === null || text === undefined) return '';
  const s = String(text).trim();
  // Truncar al máximo permitido
  const truncated = s.slice(0, maxLength);
  // Reemplazar caracteres peligrosos para contexto HTML
  return truncated
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
