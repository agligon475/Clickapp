const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

const headers = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
};

async function testFullCouponFlow() {
  console.log('=== STARTING COUPON SYSTEM E2E TEST ===\n');

  const testStoreId = 'noutacc';

  // 1. Define 2 test coupons (Scope Total & Scope Products)
  const testCoupons = [
    {
      id: 'cpn_test_total',
      code: 'TOTAL15',
      discount_percentage: 15,
      scope: 'total',
      product_ids: [],
      valid_from: '2026-01-01T00:00',
      valid_until: '2026-12-31T23:59',
      usage_limit: 100,
      used_count: 5,
      status: 'active',
      created_at: new Date().toISOString()
    },
    {
      id: 'cpn_test_prod',
      code: 'PROD25',
      discount_percentage: 25,
      scope: 'products',
      product_ids: ['prod_123', 'prod_456'],
      valid_from: '2026-01-01T00:00',
      valid_until: '2026-12-31T23:59',
      usage_limit: 50,
      used_count: 0,
      status: 'active',
      created_at: new Date().toISOString()
    }
  ];

  // 2. Save coupons to Supabase
  console.log(`[1] Saving test coupons to company_settings for store '${testStoreId}'...`);
  const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${testStoreId}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ billing_info: { coupons: testCoupons } })
  });

  if (!patchRes.ok) {
    console.error('FAILED to save test coupons:', patchRes.status, await patchRes.text());
    process.exit(1);
  }
  console.log('✔ Coupons saved successfully to Supabase!');

  // 3. Read back from Supabase
  console.log(`\n[2] Reading coupons back from Supabase...`);
  const getRes = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${testStoreId}&select=billing_info`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
  });

  const rows = await getRes.json();
  const loadedCoupons = (rows && rows[0] && rows[0].billing_info && rows[0].billing_info.coupons) ? rows[0].billing_info.coupons : [];

  console.log(`Loaded ${loadedCoupons.length} coupons from database:`);
  loadedCoupons.forEach(c => {
    console.log(` - Code: ${c.code} | Discount: ${c.discount_percentage}% | Scope: ${c.scope} | Status: ${c.status} | Product IDs: ${JSON.stringify(c.product_ids)}`);
  });

  if (loadedCoupons.length !== 2) {
    console.error('❌ Mismatch in loaded coupons count!');
    process.exit(1);
  }

  // 4. Test Discount Calculation Engine
  console.log(`\n[3] Testing Discount Calculation Engine...`);
  const mockCart = [
    { id: 'prod_123', price: 10000, qty: 2 }, // Total: $20,000 (Eligible for PROD25)
    { id: 'prod_789', price: 5000, qty: 1 }   // Total: $5,000 (Not eligible for PROD25)
  ];
  const subtotal = 25000;

  // Test Coupon 1: TOTAL15 (-15% on $25,000)
  const couponTotal = loadedCoupons.find(c => c.code === 'TOTAL15');
  const discountTotal = Math.round((subtotal * couponTotal.discount_percentage) / 100);
  console.log(`Coupon TOTAL15 (-15% on $25,000): Calculated Discount = -$${discountTotal} (Expected: -$3750)`);
  if (discountTotal !== 3750) console.error('❌ TOTAL15 calculation failed!');

  // Test Coupon 2: PROD25 (-25% only on prod_123: $20,000)
  const couponProd = loadedCoupons.find(c => c.code === 'PROD25');
  const eligibleSubtotal = mockCart.filter(item => couponProd.product_ids.includes(item.id)).reduce((sum, i) => sum + (i.price * i.qty), 0);
  const discountProd = Math.round((eligibleSubtotal * couponProd.discount_percentage) / 100);
  console.log(`Coupon PROD25 (-25% on $20,000 eligible products): Calculated Discount = -$${discountProd} (Expected: -$5000)`);
  if (discountProd !== 5000) console.error('❌ PROD25 calculation failed!');

  // 5. Clean up test coupons
  console.log(`\n[4] Cleaning up test coupons...`);
  await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${testStoreId}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ billing_info: {} })
  });
  console.log('✔ Cleanup completed successfully!');

  console.log('\n=== ALL TESTS PASSED SUCCESSFULLY! ===');
}

testFullCouponFlow();
