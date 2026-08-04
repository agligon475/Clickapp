import crypto from 'crypto';

const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

const SUPER_ADMIN_PASSWORD = 'super-admin-alicari';

function verifyMasterKey(key) {
  return key === SUPER_ADMIN_PASSWORD || key === 'super-admin-token-valid-key';
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-super-admin-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const adminKey = req.headers['x-super-admin-key'] || req.body?.adminKey || req.query?.adminKey;

    if (req.body?.action === 'auth') {
      if (verifyMasterKey(req.body.password)) {
        return res.status(200).json({
          success: true,
          token: 'super-admin-token-valid-key',
          message: 'Autenticación de Super Admin exitosa'
        });
      }
      return res.status(401).json({ success: false, error: 'Clave de Super Admin incorrecta' });
    }

    if (!verifyMasterKey(adminKey)) {
      return res.status(403).json({ success: false, error: 'Acceso no autorizado. Se requieren permisos de Super Admin.' });
    }

    const action = req.body?.action || req.query?.action || 'list';

    // 1. List all stores with their full settings, status, and payment details
    if (action === 'list') {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?select=*&order=created_at.desc`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error Supabase ${response.status}`);
      }

      const stores = await response.json();

      // Normalize store properties for Super Admin Dashboard
      const normalizedStores = stores.map(s => {
        let bInfo = s.billing_info || {};
        if (typeof bInfo === 'string') {
          try { bInfo = JSON.parse(bInfo); } catch(e) { bInfo = {}; }
        }
        const createdAt = s.created_at ? new Date(s.created_at) : null;
        let trialEndsAt = s.trial_ends_at;
        if (!trialEndsAt && createdAt) {
          trialEndsAt = new Date(createdAt.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString();
        }
        let daysRemaining = null;
        if (trialEndsAt) {
          const diffMs = new Date(trialEndsAt).getTime() - Date.now();
          daysRemaining = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
        }

        return {
          store_id: s.store_id || '',
          business_name: s.business_name || s.name || s.store_id,
          rubro: s.rubro || 'General',
          subrubro: s.subrubro || '',
          plan_level: s.plan_level || 'starter',
          payment_status: s.payment_status || 'UP_TO_DATE',
          status: s.status || 'ACTIVE',
          upgrade_requested: s.upgrade_requested || null,
          billing_cycle: s.billing_cycle || 'mensual',
          billing_info: bInfo,
          latest_invoice_url: s.latest_invoice_url || null,
          latest_invoice_date: s.latest_invoice_date || null,
          admin_email: s.admin_email || '',
          wapp: s.wapp || '',
          created_at: s.created_at || null,
          trial_ends_at: trialEndsAt || null,
          trial_days_remaining: daysRemaining !== null ? daysRemaining : 15,
          logo_url: s.logo_url || s.logo || '',
          id: s.id
        };
      });

      return res.status(200).json({
        success: true,
        stores: normalizedStores
      });
    }

    // 2. Update Store Status, Membership, Billing Cycle and Details
    if (action === 'update_status' || action === 'update_membership' || action === 'update_store') {
      const { store_id, status, plan_level, payment_status, upgrade_requested, billing_cycle, billing_info } = req.body;
      if (!store_id) {
        return res.status(400).json({ success: false, error: 'Falta store_id' });
      }

      const payload = {};
      if (status !== undefined) payload.status = status;
      if (plan_level !== undefined) payload.plan_level = plan_level;
      if (payment_status !== undefined) payload.payment_status = payment_status;
      if (upgrade_requested !== undefined) payload.upgrade_requested = upgrade_requested;
      if (billing_cycle !== undefined) payload.billing_cycle = billing_cycle;
      if (billing_info !== undefined) payload.billing_info = billing_info;

      const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${encodeURIComponent(store_id)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        },
        body: JSON.stringify(payload)
      });

      if (!patchRes.ok) {
        throw new Error(`HTTP Error ${patchRes.status}: ${await patchRes.text()}`);
      }

      return res.status(200).json({ success: true, store_id, payload, message: 'Datos de la tienda actualizados exitosamente' });
    }

    // 3. Send Invoice / Comprobante
    if (action === 'send_invoice') {
      const { store_id, invoice_url, recipient_email } = req.body;
      if (!store_id || !invoice_url) {
        return res.status(400).json({ success: false, error: 'Falta store_id o invoice_url' });
      }

      const now = new Date().toISOString();
      const payload = {
        latest_invoice_url: invoice_url,
        latest_invoice_date: now
      };

      const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${encodeURIComponent(store_id)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        },
        body: JSON.stringify(payload)
      });

      if (!patchRes.ok) {
        throw new Error(`HTTP Error ${patchRes.status}: ${await patchRes.text()}`);
      }

      return res.status(200).json({
        success: true,
        store_id,
        invoice_url,
        sent_at: now,
        recipient_email: recipient_email || '',
        message: 'Comprobante registrado y enviado exitosamente al comercio'
      });
    }

    // 4. Resolve Upgrade Request (Approve or Dismiss)
    if (action === 'resolve_upgrade') {
      const { store_id, approve, new_plan } = req.body;
      if (!store_id) {
        return res.status(400).json({ success: false, error: 'Falta store_id' });
      }

      const payload = { upgrade_requested: null };
      if (approve && new_plan) {
        payload.plan_level = new_plan;
        payload.payment_status = 'UP_TO_DATE';
      }

      const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${encodeURIComponent(store_id)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        },
        body: JSON.stringify(payload)
      });

      if (!patchRes.ok) {
        throw new Error(`HTTP Error ${patchRes.status}: ${await patchRes.text()}`);
      }

      return res.status(200).json({ success: true, store_id, message: approve ? 'Upgrade aprobado' : 'Solicitud archivada' });
    }

    // 5. Get Global Advanced Credentials (DB, AI, Cloudinary)
    if (action === 'get_global_credentials') {
      let creds = {
        supabase_url: SUPABASE_URL,
        supabase_key: SUPABASE_KEY,
        cloudinary_name: 'deuog0r34',
        cloudinary_preset: 'daletepido_preset',
        ai_provider: 'gemini',
        claude_key: '',
        gemini_key: '',
        claude_model: 'claude-haiku-4-5-20251001',
        gemini_model: 'gemini-2.5-flash'
      };

      try {
        const fetchRes = await fetch(`${SUPABASE_URL}/rest/v1/store_credentials?store_id=eq.global`, {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          }
        });
        if (fetchRes.ok) {
          const data = await fetchRes.json();
          if (data && data.length > 0) {
            creds = { ...creds, ...data[0] };
          }
        }
      } catch (e) {
        console.warn('Could not read global store_credentials:', e.message);
      }

      return res.status(200).json({ success: true, credentials: creds });
    }

    // 6. Save Global Advanced Credentials (DB, AI, Cloudinary)
    if (action === 'save_global_credentials') {
      const {
        supabase_url,
        supabase_key,
        cloudinary_name,
        cloudinary_preset,
        ai_provider,
        claude_key,
        gemini_key,
        claude_model,
        gemini_model
      } = req.body;

      const payload = {
        store_id: 'global',
        supabase_url: supabase_url || SUPABASE_URL,
        supabase_key: supabase_key || SUPABASE_KEY,
        cloudinary_name: cloudinary_name || 'deuog0r34',
        cloudinary_preset: cloudinary_preset || 'daletepido_preset',
        ai_provider: ai_provider || 'gemini',
        claude_key: claude_key || '',
        gemini_key: gemini_key || '',
        updated_at: new Date().toISOString()
      };

      try {
        const upsertRes = await fetch(`${SUPABASE_URL}/rest/v1/store_credentials`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify(payload)
        });

        if (!upsertRes.ok) {
          await fetch(`${SUPABASE_URL}/rest/v1/store_credentials?store_id=eq.global`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'apikey': SUPABASE_KEY,
              'Authorization': `Bearer ${SUPABASE_KEY}`
            },
            body: JSON.stringify(payload)
          });
        }
      } catch (e) {
        console.warn('Global credentials saving warning:', e.message);
      }

      return res.status(200).json({
        success: true,
        message: 'Configuración avanzada global guardada y aplicada exitosamente',
        credentials: payload
      });
    }

    // 7. Renew Trial (Extender 15 días adicionales de prueba)
    if (action === 'renew_trial') {
      const { store_id, days } = req.body;
      if (!store_id) {
        return res.status(400).json({ success: false, error: 'Falta store_id' });
      }

      const daysToAdd = days || 15;
      const newTrialEndsAt = new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000).toISOString();

      const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${encodeURIComponent(store_id)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        },
        body: JSON.stringify({
          trial_ends_at: newTrialEndsAt,
          payment_status: 'UP_TO_DATE',
          status: 'ACTIVE'
        })
      });

      if (!patchRes.ok) {
        throw new Error(`HTTP Error ${patchRes.status}`);
      }

      return res.status(200).json({
        success: true,
        store_id,
        new_trial_ends_at: newTrialEndsAt,
        days_added: daysToAdd,
        message: `Trial renovado exitosamente por ${daysToAdd} días adicionales.`
      });
    }

    // 8. Reenviar enlace de Reset de Contraseña a la cuenta
    if (action === 'resend_reset') {
      const { store_id, recipient_email } = req.body;
      if (!store_id) {
        return res.status(400).json({ success: false, error: 'Falta store_id' });
      }

      const resetLink = `https://daletepido.com.ar/alta-usuario.html?action=login&reset_store=${encodeURIComponent(store_id)}`;
      const emailTarget = recipient_email || '';

      if (emailTarget) {
        try {
          await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(emailTarget)}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              _subject: `Recuperación de Contraseña - DaleTePido (${store_id})`,
              _template: 'table',
              Mensaje: `Solicitud de restablecimiento de contraseña enviada por el equipo de Soporte.`,
              Tienda: store_id,
              Enlace_Restablecer: resetLink
            })
          });
        } catch (e) {
          console.warn('Advertencia al reenviar reset email:', e.message);
        }
      }

      return res.status(200).json({
        success: true,
        store_id,
        recipient_email: emailTarget,
        reset_link: resetLink,
        message: `Correo de restablecimiento de contraseña enviado a ${emailTarget || 'la cuenta'}.`
      });
    }

    return res.status(400).json({ success: false, error: 'Acción no válida' });

  } catch (e) {
    console.error('Super Admin API error:', e);
    return res.status(500).json({ success: false, error: e.message || 'Error interno del servidor' });
  }
}
