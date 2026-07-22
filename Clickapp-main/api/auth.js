import crypto from 'crypto';

const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

function verifyPassword(password, storedPassword) {
  if (!storedPassword) return false;
  if (!storedPassword.includes(':')) {
    // Contraseña heredada en texto plano
    return password === storedPassword;
  }
  const [salt, originalHash] = storedPassword.split(':');
  const hash = crypto.createHash('sha256').update(password + salt).digest('hex');
  return hash === originalHash;
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { action, store_id, password } = req.body || {};

    if (!store_id) {
      return res.status(400).json({ success: false, error: 'El nombre de la tienda es requerido' });
    }

    const cleanStoreId = store_id.trim().toLowerCase();

    // Fetch store configuration securely on the server
    const configRes = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${encodeURIComponent(cleanStoreId)}`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });

    if (!configRes.ok) {
      return res.status(500).json({ success: false, error: 'Error al conectar con la base de datos' });
    }

    const data = await configRes.json();
    if (!data || data.length === 0) {
      return res.status(404).json({ success: false, error: 'La tienda ingresada no existe' });
    }

    const settings = data[0];
    let parsedDesign = {};
    try {
      if (settings.email) parsedDesign = JSON.parse(settings.email);
    } catch (e) {}

    const dbPassword = parsedDesign.password || '';

    // Action: Login verification
    if (action === 'login' || !action) {
      if (dbPassword && !verifyPassword((password || '').trim(), dbPassword)) {
        return res.status(401).json({ success: false, error: 'Contraseña incorrecta' });
      }

      // Generate a secure session response token
      const sessionToken = Buffer.from(`${cleanStoreId}:${Date.now()}:authenticated`).toString('base64');

      return res.status(200).json({
        success: true,
        store_id: cleanStoreId,
        token: sessionToken,
        message: 'Autenticación exitosa'
      });
    }

    return res.status(400).json({ success: false, error: 'Acción no válida' });

  } catch (error) {
    console.error('Error in auth handler:', error);
    return res.status(500).json({ success: false, error: 'Error interno en la autenticación' });
  }
}
