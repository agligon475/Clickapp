import fs from 'fs';

const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

async function testFetch() {
  const res1 = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?select=*&apikey=${SUPABASE_KEY}`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
  });
  const data1 = await res1.json();
  console.log('company_settings sample:', data1.slice(0, 2));

  const res2 = await fetch(`${SUPABASE_URL}/rest/v1/stores?select=*&apikey=${SUPABASE_KEY}`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
  });
  const data2 = await res2.json();
  console.log('stores sample:', data2.slice(0, 2));
}

testFetch();
