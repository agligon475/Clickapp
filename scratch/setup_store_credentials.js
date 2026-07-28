const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Prefer': 'return=representation'
};

async function setupStoreCredentials() {
  console.log('Verificando acceso a la tabla store_credentials en Supabase...');
  
  const stores = ['elquesabepoco', 'ferre-now', 'cocostore', 'ferreteria-demo', 'noutacc'];

  for (const storeId of stores) {
    try {
      const checkRes = await fetch(`${SUPABASE_URL}/rest/v1/store_credentials?store_id=eq.${storeId}`, { headers });
      if (checkRes.ok) {
        const data = await checkRes.json();
        if (data && data.length > 0) {
          console.log(`✓ store_credentials ya existe para ${storeId}`);
        } else {
          console.log(`Creando credenciales iniciales para ${storeId}...`);
          const payload = {
            store_id: storeId,
            cloudinary_name: 'deuog0r34',
            cloudinary_preset: 'daletepido_preset',
            ai_provider: 'gemini',
            claude_model: 'claude-haiku-4-5-20251001',
            gemini_model: 'gemini-2.5-flash',
            supabase_url: SUPABASE_URL,
            supabase_key: SUPABASE_KEY
          };
          const postRes = await fetch(`${SUPABASE_URL}/rest/v1/store_credentials`, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
          });
          if (postRes.ok) {
            console.log(`✓ Creado exitosamente en store_credentials para ${storeId}`);
          } else {
            console.warn(`Advertencia al crear en store_credentials para ${storeId}: ${postRes.status} - ${await postRes.text()}`);
          }
        }
      } else {
        console.warn(`Tabla store_credentials no disponible aún por REST (${checkRes.status}). Se usará almacenamiento secundario seguro.`);
      }
    } catch (e) {
      console.error(`Error verificando credenciales para ${storeId}:`, e.message);
    }
  }
}

setupStoreCredentials();
