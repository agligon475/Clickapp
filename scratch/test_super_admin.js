// scratch/test_super_admin.js
import handler from '../api/super-admin.js';

async function testFullSuspensionFlow() {
  console.log('--- TEST SUSPENSION FLOW ---');

  // 1. Suspend store elquesabepoco
  const mockReqSuspend = {
    method: 'POST',
    headers: { 'x-super-admin-key': 'super-admin-alicari' },
    body: {
      action: 'update_store',
      store_id: 'elquesabepoco',
      status: 'SUSPENDED_PAYMENT',
      payment_status: 'OVERDUE'
    }
  };
  let suspendRes = {};
  const mockResSuspend = { setHeader: () => {}, status: (code) => ({ json: (data) => { suspendRes = { code, data }; } }) };
  await handler(mockReqSuspend, mockResSuspend);
  console.log('1. Suspend Result:', suspendRes);

  // 2. Read stores list and check status of elquesabepoco
  const mockReqList = {
    method: 'POST',
    headers: { 'x-super-admin-key': 'super-admin-alicari' },
    body: { action: 'list' }
  };
  let listRes = {};
  const mockResList = { setHeader: () => {}, status: (code) => ({ json: (data) => { listRes = { code, data }; } }) };
  await handler(mockReqList, mockResList);
  const elque = listRes.data?.stores?.find(s => s.store_id === 'elquesabepoco');
  console.log('2. Listed Store status:', elque?.status, 'payment_status:', elque?.payment_status);

  // 3. Reactivate store
  mockReqSuspend.body.status = 'ACTIVE';
  mockReqSuspend.body.payment_status = 'UP_TO_DATE';
  await handler(mockReqSuspend, mockResSuspend);
  console.log('3. Reactivated Store.');
}

testFullSuspensionFlow();
