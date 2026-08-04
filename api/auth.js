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

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.createHash('sha256').update(password + salt).digest('hex');
  return `${salt}:${hash}`;
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
    const { action, store_id, password, new_password } = req.body || {};

    if (!store_id) {
      return res.status(400).json({ success: false, error: 'El nombre de la tienda o correo electrónico es requerido' });
    }

    const cleanStoreId = store_id.trim().toLowerCase();
    const isEmail = cleanStoreId.includes('@');

    let queryParam = '';
    if (isEmail) {
      queryParam = `admin_email=eq.${encodeURIComponent(cleanStoreId)}`;
    } else {
      queryParam = `store_id=eq.${encodeURIComponent(cleanStoreId)}`;
    }

    // Consulta directa a la base de datos mediante el parámetro correspondiente
    const configRes = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?${queryParam}`, {
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
      return res.status(404).json({ success: false, error: 'La tienda o correo electrónico ingresado no existe' });
    }

    const settings = data[0];
    
    // Obtener la contraseña desde la columna dedicada 'password'
    // Fallback al JSON de 'email' en caso de que sea un comercio antiguo no migrado
    let dbPassword = settings.password || '';
    if (!dbPassword && settings.email) {
      try {
        const parsed = JSON.parse(settings.email);
        dbPassword = parsed.password || '';
      } catch(e) {}
    }

    // Usar el store_id real de la base de datos para la sesión
    const actualStoreId = (settings.store_id || cleanStoreId).toLowerCase();
    const adminEmail = settings.admin_email || (isEmail ? cleanStoreId : '');

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
        admin_email: adminEmail,
        token: sessionToken,
        plan_level: settings.plan_level || 'starter',
        message: 'Autenticación exitosa'
      });
    }

    // Action: Forgot Password (Solicitud de recuperación de usuario / contraseña)
    if (action === 'forgot_password') {
      const resetLink = `https://daletepido.com.ar/alta-usuario.html?action=login&reset_store=${encodeURIComponent(actualStoreId)}`;

      if (adminEmail) {
        try {
          await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(adminEmail)}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              _subject: `Recuperación de Datos de Acceso - DaleTePido (${settings.business_name || actualStoreId})`,
              _template: 'table',
              Mensaje: `Solicitaste la recuperación de tu cuenta en DaleTePido.`,
              Tienda: actualStoreId,
              Email: adminEmail,
              Enlace_Restablecer: resetLink
            })
          });
        } catch (e) {
          console.warn('Advertencia al enviar email de recuperación:', e);
        }
      }

      return res.status(200).json({
        success: true,
        store_id: actualStoreId,
        admin_email: adminEmail,
        message: `Te hemos enviado un correo de recuperación a ${adminEmail || 'tu email registrado'}.`
      });
    }

    // Action: Reset Password (Establecer nueva contraseña)
    if (action === 'reset_password') {
      if (!new_password || new_password.trim().length < 4) {
        return res.status(400).json({ success: false, error: 'La nueva contraseña debe tener al menos 4 caracteres' });
      }

      const hashedPassword = hashPassword(new_password.trim());

      const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${encodeURIComponent(actualStoreId)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        },
        body: JSON.stringify({ password: hashedPassword })
      });

      if (!patchRes.ok) {
        throw new Error(`HTTP Error ${patchRes.status}`);
      }

      return res.status(200).json({
        success: true,
        store_id: actualStoreId,
        message: 'Tu contraseña ha sido restablecida exitosamente. Ya podés ingresar.'
      });
    }

    return res.status(400).json({ success: false, error: 'Acción no válida' });

  } catch (error) {
    console.error('Error in auth handler:', error);
    return res.status(500).json({ success: false, error: 'Error interno en la autenticación' });
  }
}
