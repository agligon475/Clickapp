const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`
};

async function check() {
  console.log('=== STORE CREDENTIALS ===');
  const scRes = await fetch(`${SUPABASE_URL}/rest/v1/store_credentials?select=*`, { headers });
  console.log('store_credentials status:', scRes.status);
  const sc = await scRes.json();
  console.log(sc);

  console.log('\n=== COMPANY SETTINGS (Cloudinary fields) ===');
  const csRes = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?select=store_id,business_name,logo_url,banner1_img,banner2_img`, { headers });
  const cs = await csRes.json();
  console.log(cs);
}

check().catch(console.error);
