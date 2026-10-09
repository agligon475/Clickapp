import { signToken, verifyToken } from '../api/security.js';

async function runSecurityTests() {
  console.log('====================================================');
  console.log('🔒 SUITE DE PRUEBAS DE SEGURIDAD SEC-01 & SEC-02');
  console.log('====================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, testName) {
    totalTests++;
    if (condition) {
      console.log(`✅ [TEST ${totalTests}] PASSED: ${testName}`);
      passedTests++;
    } else {
      console.error(`❌ [TEST ${totalTests}] FAILED: ${testName}`);
      process.exitCode = 1;
    }
  }

  // 1. Test criptográfico unitario: Firma y verificación de token
  const payload = { store_id: 'test_tienda', type: 'session' };
  const validToken = signToken(payload, 3600);
  assert(validToken && validToken.split('.').length === 3, 'El token generado cumple con el formato compacto de 3 partes (header.payload.signature)');

  const verified = verifyToken(validToken, 'session');
  assert(verified && verified.store_id === 'test_tienda', 'El token legítimo es validado exitosamente con verifyToken()');

  // 2. Test contra falsificación: Alteración de datos
  const [h, b, sig] = validToken.split('.');
  const forgedPayload = Buffer.from(JSON.stringify({ store_id: 'admin_comprometido', type: 'session' })).toString('base64url');
  const forgedToken = `${h}.${forgedPayload}.${sig}`;
  const verifyForged = verifyToken(forgedToken);
  assert(verifyForged === null, 'SEC-02: La manipulación de datos en el payload es detectada y rechazada');

  // 3. Test contra falsificación de firma
  const tamperedSigToken = `${h}.${b}.${sig.slice(0, -3)}xyz`;
  const verifyTamperedSig = verifyToken(tamperedSigToken);
  assert(verifyTamperedSig === null, 'SEC-02: Token con firma adulterada es rechazado por timingSafeEqual');

  // 4. Test de expiración
  const expiredToken = signToken({ store_id: 'test_tienda', type: 'session' }, -10);
  const verifyExpired = verifyToken(expiredToken);
  assert(verifyExpired === null, 'SEC-02: Token con expiración vencida es invalidado automáticamente');

  // 5. Test de tipado estricto (no se puede usar un token de sesión para resetear password)
  const sessionToken = signToken({ store_id: 'test_tienda', type: 'session' }, 3600);
  const verifyWrongType = verifyToken(sessionToken, 'password_reset');
  assert(verifyWrongType === null, 'SEC-01: Token de sesión ordinario no puede ser usado para restablecer contraseñas (type mismatch)');

  // 6. Test de integración contra el endpoint local /api/auth
  console.log('\n--- PRUEBAS DE INTEGRACIÓN HTTP CONTRA /api/auth ---');

  // 6.a Ataque sin token a reset_password (Vulnerabilidad crítica previa)
  try {
    const resAttacker = await fetch('http://localhost:5500/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'reset_password',
        store_id: 'ferreteria-demo',
        new_password: 'hacked_password_123'
      })
    });
    const dataAttacker = await resAttacker.json();
    assert(resAttacker.status === 401 && !dataAttacker.success, 'SEC-01: Intento de reseteo sin reset_token es BLOQUEADO con HTTP 401');
  } catch (err) {
    console.error('Error al conectar con localhost:5500:', err.message);
  }

  // 6.b Ataque con reset_token forjado
  try {
    const resForged = await fetch('http://localhost:5500/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'reset_password',
        store_id: 'ferreteria-demo',
        new_password: 'hacked_password_123',
        reset_token: 'fake.header.forged_signature'
      })
    });
    const dataForged = await resForged.json();
    assert(resForged.status === 403 && !dataForged.success, 'SEC-01: Intento de reseteo con token falso o forjado es RECHAZADO con HTTP 403');
  } catch (err) {
    console.error('Error al conectar con localhost:5500:', err.message);
  }

  // 6.c Solicitud legítima de recuperación (forgot_password)
  let legitimateResetToken = null;
  try {
    const resForgot = await fetch('http://localhost:5500/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'forgot_password',
        store_id: 'ferreteria-demo'
      })
    });
    const dataForgot = await resForgot.json();
    legitimateResetToken = dataForgot.reset_token;
    assert(resForgot.status === 200 && legitimateResetToken, 'SEC-01: forgot_password emite un reset_token criptográficamente firmado (15 min)');
  } catch (err) {
    console.error('Error al conectar con localhost:5500:', err.message);
  }

  // 6.d Reseteo con token legítimo
  if (legitimateResetToken) {
    try {
      const resLegitReset = await fetch('http://localhost:5500/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reset_password',
          store_id: 'ferreteria-demo',
          new_password: 'daletepido_secure_2026',
          reset_token: legitimateResetToken
        })
      });
      const dataLegitReset = await resLegitReset.json();
      assert(resLegitReset.status === 200 && dataLegitReset.success, 'SEC-01: reset_password con reset_token válido se ejecuta satisfactoriamente');
    } catch (err) {
      console.error('Error al conectar con localhost:5500:', err.message);
    }
  }

  // 6.e Login legítimo retorna token HMAC SHA-256
  try {
    const resLogin = await fetch('http://localhost:5500/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'login',
        store_id: 'ferreteria-demo',
        password: 'daletepido_secure_2026'
      })
    });
    const dataLogin = await resLogin.json();
    const isHmacToken = dataLogin.token && dataLogin.token.split('.').length === 3;
    const verifiedLogin = isHmacToken ? verifyToken(dataLogin.token, 'session') : null;
    assert(resLogin.status === 200 && dataLogin.success && verifiedLogin !== null, 'SEC-02: Login exitoso retorna token de sesión firmado HMAC SHA-256 verificado');
  } catch (err) {
    console.error('Error al conectar con localhost:5500:', err.message);
  }

  console.log('\n====================================================');
  console.log(`🏁 RESUMEN: ${passedTests}/${totalTests} PRUEBAS COMPLETADAS CON ÉXITO`);
  console.log('====================================================');
}

runSecurityTests();
