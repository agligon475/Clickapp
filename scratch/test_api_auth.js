async function testLogin() {
  const res = await fetch('https://www.daletepido.com.ar/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'login', store_id: 'larebardie', password: 'rucucu26' })
  });
  console.log('Status:', res.status);
  const data = await res.json();
  console.log('Response:', JSON.stringify(data, null, 2));
}

testLogin();
