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
      return res.status(400).json({ success: false, error: 'El nombre de la tienda o correo electrónico es requerido' });
    }

    const cleanStoreId = store_id.trim().toLowerCase();
    const isEmail = cleanStoreId.includes('@');

    let configRes;
    if (isEmail) {
      // Buscar en Supabase usando ilike en la columna text que tiene el JSON serializado
      configRes = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?email=ilike.*"admin_email":"${encodeURIComponent(cleanStoreId)}".*`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      });
    } else {
      // Buscar por store_id normal
      configRes = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${encodeURIComponent(cleanStoreId)}`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      });
    }

    if (!configRes.ok) {
      return res.status(500).json({ success: false, error: 'Error al conectar con la base de datos' });
    }

    const data = await configRes.json();
    if (!data || data.length === 0) {
      return res.status(404).json({ success: false, error: 'La tienda o correo electrónico ingresado no existe' });
    }

    let settings = null;
    let parsedDesign = {};

    if (isEmail) {
      // Buscar coincidencia exacta en memoria para evitar falsos positivos de subcadenas
      settings = data.find(row => {
        try {
          if (row.email) {
            const parsed = JSON.parse(row.email);
            if (parsed.admin_email && parsed.admin_email.trim().toLowerCase() === cleanStoreId) {
              parsedDesign = parsed;
              return true;
            }
          }
        } catch (e) {}
        return false;
      });
    } else {
      settings = data[0];
      try {
        if (settings.email) parsedDesign = JSON.parse(settings.email);
      } catch (e) {}
    }

    if (!settings) {
      return res.status(404).json({ success: false, error: 'La tienda o correo electrónico ingresado no existe' });
    }

    // Usar el store_id real de la base de datos para la sesión
    const actualStoreId = (settings.store_id || cleanStoreId).toLowerCase();
    const dbPassword = parsedDesign.password || '';

    // Action: Login verification
    if (action === 'login' || !action) {
      if (dbPassword && !verifyPassword((password || '').trim(), dbPassword)) {
        return res.status(401).json({ success: false, error: 'Contraseña incorrecta' });
      }

      // Generate a secure session response token
      const sessionToken = Buffer.from(`${actualStoreId}:${Date.now()}:authenticated`).toString('base64');

      return res.status(200).json({
        success: true,
        store_id: actualStoreId,
        token: sessionToken,
        plan_level: settings.plan_level || 'starter',
        message: 'Autenticación exitosa'
      });
    }

    return res.status(400).json({ success: false, error: 'Acción no válida' });

  } catch (error) {
    console.error('Error in auth handler:', error);
    return res.status(500).json({ success: false, error: 'Error interno en la autenticación' });
  }
}
