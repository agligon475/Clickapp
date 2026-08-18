const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`
};

const tables = [
  'company_settings',
  'categories',
  'products',
  'orders',
  'store_credentials',
  'faqs'
];

async function checkAllTables() {
  console.log('Testing Supabase Connection & Table Health...\n');
  for (const table of tables) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*&limit=1`, { headers });
      console.log(`Table '${table}': Status ${res.status} ${res.statusText}`);
      if (!res.ok) {
        const text = await res.text();
        console.log(`  -> Error details: ${text}`);
      } else {
        const data = await res.json();
        console.log(`  -> OK! Sample count: ${data.length}`);
      }
    } catch (err) {
      console.error(`  -> Network/Fetch Error for '${table}':`, err.message);
    }
  }
}

checkAllTables();
