async function testWelcomeEmail() {
  const url = 'https://www.daletepido.com.ar/api/welcome-email';
  const body = {
    store_id: 'test-resend-store',
    business_name: 'Tienda de Prueba Resend',
    admin_email: 'daletepido@gmail.com',
    wapp: '1122334455'
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    console.log('Status Code:', res.status);
    const data = await res.json();
    console.log('Response Body:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

testWelcomeEmail();
