// scratch/test_super_admin.js
import handler from '../api/super-admin.js';

async function testSuperAdminAPI() {
  console.log('--- TEST SUPER ADMIN API ---');

  // 1. Auth Test
  const mockReqAuth = {
    method: 'POST',
    headers: {},
    body: { action: 'auth', password: 'super-admin-alicari' }
  };
  let authResult = {};
  const mockResAuth = {
    setHeader: () => {},
    status: (code) => ({
      json: (data) => { authResult = { code, data }; }
    })
  };
  await handler(mockReqAuth, mockResAuth);
  console.log('1. Auth Test Result:', authResult);

  // 2. List Stores Test
  const mockReqList = {
    method: 'POST',
    headers: { 'x-super-admin-key': 'super-admin-alicari' },
    body: { action: 'list' }
  };
  let listResult = {};
  const mockResList = {
    setHeader: () => {},
    status: (code) => ({
      json: (data) => { listResult = { code, data }; }
    })
  };
  await handler(mockReqList, mockResList);
  console.log('2. List Stores Count:', listResult.data?.stores?.length);
  if (listResult.data?.stores?.length > 0) {
    console.log('Ejemplo de tienda:', listResult.data.stores[0]);
  }
}

testSuperAdminAPI();
