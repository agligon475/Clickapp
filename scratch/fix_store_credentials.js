const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Prefer': 'return=representation'
};

async function fixCredentialsInSupabase() {
  console.log('Fixing Cloudinary preset in Supabase store_credentials & company_settings...\n');

  // Update store_credentials
  const scRes = await fetch(`${SUPABASE_URL}/rest/v1/store_credentials?select=id,store_id`, { headers });
  if (scRes.ok) {
    const rows = await scRes.json();
    for (const row of rows) {
      const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/store_credentials?id=eq.${row.id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ cloudinary_preset: 'clickapp', cloudinary_name: 'deuog0r34' })
      });
      console.log(`Updated store_credentials for '${row.store_id}': status ${patchRes.status}`);
    }
  }

  // Update company_settings
  const csRes = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?select=id,store_id`, { headers });
  if (csRes.ok) {
    const rows = await csRes.json();
    for (const row of rows) {
      const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?id=eq.${row.id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ cloudinary_preset: 'clickapp', cloudinary_name: 'deuog0r34' })
      });
      console.log(`Updated company_settings for '${row.store_id}': status ${patchRes.status}`);
    }
  }

  console.log('\nSupabase credentials updated to Cloudinary preset "clickapp".');
}

fixCredentialsInSupabase().catch(console.error);
