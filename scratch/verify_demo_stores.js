const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`
};

async function verify() {
  const storeIds = ['noutacc', 'ferrenow', 'ferre-now', 'kioscojulio'];

  for (const id of storeIds) {
    console.log(`\n=================== VERIFYING STORE: ${id} ===================`);
    
    // Check Settings & FAQs
    const sRes = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${id}`, { headers });
    const sData = await sRes.json();
    const faqs = sData[0]?.horarios_data ? JSON.parse(sData[0].horarios_data) : [];
    console.log(`✓ Store Name: ${sData[0]?.business_name}`);
    console.log(`✓ FAQs count: ${faqs.length}`);
    if (faqs.length > 0) {
      console.log(`  Sample FAQ: Q: ${faqs[0].question}`);
    }

    // Check Products
    const pRes = await fetch(`${SUPABASE_URL}/rest/v1/products?store_id=eq.${id}`, { headers });
    const pData = await pRes.json();
    console.log(`✓ Products count: ${pData.length}`);

    let missingImages = 0;
    pData.forEach((p, idx) => {
      const imgCount = [p.img, p.img2, p.img3].filter(Boolean).length;
      if (imgCount < 3) {
        missingImages++;
        console.warn(`  ⚠️ Product "${p.nombre}" has only ${imgCount} images!`);
      }
    });

    if (missingImages === 0) {
      console.log(`  🎉 ALL ${pData.length} products have 3 product-specific photos!`);
    }
  }
}

verify().catch(console.error);
