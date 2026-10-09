import crypto from 'node:crypto';

// Clave secreta robusta de respaldo en caso de que AUTH_JWT_SECRET no esté provista en entorno
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
