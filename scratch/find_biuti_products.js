import { createClient } from '@supabase/supabase-js';

const sbUrl = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const sbKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzNTA1MTYsImV4cCI6MjA1NTkyNjUxNn0.7n1U1k4tSjX1c-n04l83F5RsmP9bK0Wd3H0CqJ_4w24';
const client = createClient(sbUrl, sbKey);

async function run() {
  const { data, error } = await client.from('products').select('*').eq('store_id', 'biuti');
  if (error) {
    console.error('Error fetching biuti:', error);
    return;
  }
  console.log(`Found ${data.length} products for biuti:`);
  data.forEach(p => {
    console.log(`[${p.id}] ${p.nombre} - img: ${p.img}`);
    if (p.img && p.img.includes('1548624149')) {
      console.log('MATCH:', p);
    }
  });
}
run();
