// api/gemini.js — Vercel Serverless Function
// Hardened Gemini AI Proxy con Autenticación de Comercio y Rate Limiting (SEC-04)

import { verifyToken, checkRateLimit, setSecureCors } from './security.js';

export default async function handler(req, res) {
  // 1. CORS Defensivo y Security Headers
  setSecureCors(req, res, 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 2. Solo método POST permitido
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 3. Extracción de Credenciales y Sesión
  let customGeminiKey = req.headers['x-gemini-key'];
  if (customGeminiKey && (customGeminiKey.trim() === '' || customGeminiKey === 'undefined' || customGeminiKey === 'null')) {
    customGeminiKey = null;
  }

  let storeId = null;
  let isPlatformKeyUsed = false;

  // Extracción del token de sesión (Bearer o header x-store-session)
  const authHeader = req.headers['authorization'] || '';
  const tokenFromHeader = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
  const sessionToken = tokenFromHeader || req.headers['x-store-session'];

  let verifiedSession = null;
  if (sessionToken) {
    verifiedSession = verifyToken(sessionToken, 'session');
    if (verifiedSession && verifiedSession.store_id) {
      storeId = String(verifiedSession.store_id).toLowerCase().trim();
    }
  }

  // Determinar la clave de API a utilizar
  let activeGeminiKey = null;
  if (customGeminiKey) {
    activeGeminiKey = customGeminiKey.trim();
  } else {
    // Si intenta usar la clave global del servidor, EXIGIR autenticación de sesión
    isPlatformKeyUsed = true;
    if (!verifiedSession || !storeId) {
      return res.status(401).json({
        error: 'Acceso no autorizado: Para utilizar el servicio de IA de Dale! Te Pido se requiere una sesión de comercio activa (Token JWT).',
        code: 'AUTH_REQUIRED_FOR_AI'
      });
    }
    activeGeminiKey = process.env.GEMINI_API_KEY;
  }

  if (!activeGeminiKey) {
    return res.status(503).json({
      error: 'Servicio de IA no disponible: Clave GEMINI_API_KEY no configurada en el servidor ni provista por el comercio.',
      code: 'API_KEY_UNAVAILABLE'
    });
  }

  // 4. Rate Limiting Defensivo (Prevención de Denial of Wallet)
  const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown_ip';
  const rateLimitKey = storeId ? `gemini_store_${storeId}` : `gemini_ip_${clientIp}`;
  
  // Límite: 35 peticiones por hora por tienda / IP
  const rateLimitCheck = checkRateLimit(rateLimitKey, 35, 60 * 60 * 1000);
  res.setHeader('X-RateLimit-Limit', '35');
  res.setHeader('X-RateLimit-Remaining', String(rateLimitCheck.remaining));

  if (!rateLimitCheck.allowed) {
    const retrySeconds = Math.ceil(rateLimitCheck.resetMs / 1000);
    res.setHeader('Retry-After', String(retrySeconds));
    return res.status(429).json({
      error: 'Límite de solicitudes de IA excedido (máximo 35 consultas por hora). Por favor intentá nuevamente más tarde.',
      code: 'RATE_LIMIT_EXCEEDED',
      retryAfterSeconds: retrySeconds
    });
  }

  // 5. Validación y Sanitización del Payload
  const body = req.body || {};
  const model = body.model || 'gemini-2.5-flash';
  
  // Limitar modelos permitidos a los modelos seguros soportados
  const allowedModels = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash'];
  const safeModel = allowedModels.includes(model) ? model : 'gemini-2.5-flash';

  if (!body.contents || !Array.isArray(body.contents) || body.contents.length === 0) {
    return res.status(400).json({ error: 'Payload inválido: contents es requerido y debe ser un array' });
  }

  // Verificar longitud total del prompt para evitar sobrecostos masivos
  try {
    const rawContentStr = JSON.stringify(body.contents);
    if (rawContentStr.length > 25000) {
      return res.status(413).json({ error: 'El contenido enviado supera el límite permitido de caracteres (máx. 25.000 bytes).' });
    }
  } catch (e) {
    return res.status(400).json({ error: 'Error al procesar los contenidos enviados.' });
  }

  // 6. Proxy a Google Generative Language API
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${safeModel}:generateContent?key=${encodeURIComponent(activeGeminiKey)}`;

  try {
    const upstream = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        contents: body.contents,
        generationConfig: body.generationConfig
      }),
    });

    const data = await upstream.json();
    return res.status(upstream.status).json(data);
  } catch (err) {
    return res.status(502).json({
      error: 'Error de comunicación con el motor upstream de Gemini',
      detail: err.message
    });
  }
}
