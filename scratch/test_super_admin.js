// scratch/test_super_admin.js
import handler from '../api/super-admin.js';

async function testTesterPlanUpdate() {
  console.log('--- TEST SUPER ADMIN TESTER PLAN UPDATE ---');

  const mockReqUpdate = {
    method: 'POST',
    headers: { 'x-super-admin-key': 'super-admin-alicari' },
    body: {
      action: 'update_store',
      store_id: 'elquesabepoco',
      plan_level: 'tester',
      payment_status: 'UP_TO_DATE'
    }
  };
  let result = {};
  const mockRes = { setHeader: () => {}, status: (code) => ({ json: (data) => { result = { code, data }; } }) };
  await handler(mockReqUpdate, mockRes);
  console.log('Update Result:', result);

  // List stores and verify elquesabepoco plan
  const mockReqList = {
    method: 'POST',
    headers: { 'x-super-admin-key': 'super-admin-alicari' },
    body: { action: 'list' }
  };
  let listResult = {};
  const mockResList = { setHeader: () => {}, status: (code) => ({ json: (data) => { listResult = { code, data }; } }) };
  await handler(mockReqList, mockResList);
  const store = listResult.data?.stores?.find(s => s.store_id === 'elquesabepoco');
  console.log('Elquesabepoco plan level in list:', store?.plan_level);
}

testTesterPlanUpdate();
