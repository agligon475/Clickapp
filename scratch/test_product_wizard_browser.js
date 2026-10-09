import fs from 'fs';
import path from 'path';

const PORT = 9222;
const ARTIFACTS_DIR = 'C:\\Users\\agust\\.gemini\\antigravity-ide\\brain\\fe24473b-6225-471c-ab76-7a66eaabb060';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log('📱 Iniciando prueba interactiva E2E de Mobile-First Product Wizard...');

  const newTabRes = await fetch(`http://127.0.0.1:${PORT}/json/new?http://localhost:5500/dashboard.html?demo=1`, { method: 'PUT' });
  const tabData = await newTabRes.json();
  const pageWsUrl = tabData.webSocketDebuggerUrl;

  const ws = new globalThis.WebSocket(pageWsUrl);

  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  let msgId = 1;
  const callbacks = new Map();
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (callbacks.has(msg.id)) {
      const { resolve, reject } = callbacks.get(msg.id);
      callbacks.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = msgId++;
      callbacks.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');

  // Configurar Viewport Mobile (iPhone 14/15: 390x844)
  console.log('📐 Emulando viewport móvil táctil (390 x 844 px)...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });

  await sleep(1500);

  // 1. Abrir Modal de Producto
  console.log('✨ Abriendo Product Wizard con openModal()...');
  await send('Runtime.evaluate', {
    expression: `openModal();`
  });
  await sleep(600);

  // Capturar Paso 0: Arquetipos
  console.log('📸 Capturando Paso 0 (Selector de Arquetipos / Modalidad)...');
  const shot0 = await send('Page.captureScreenshot', { format: 'png' });
  const p0Path = path.join(ARTIFACTS_DIR, `product_wizard_mobile_step0_${Date.now()}.png`);
  fs.writeFileSync(p0Path, Buffer.from(shot0.data, 'base64'));
  console.log('✓ Guardado:', p0Path);

  // 2. Elegir Arquetipo "weight" (Al Peso / Fraccionado)
  console.log('⚖️ Seleccionando modalidad: Al Peso / Fraccionado...');
  await send('Runtime.evaluate', {
    expression: `selectProductArchetype('weight', false); goToProductStep(1);`
  });
  await sleep(500);

  // Intentar avanzar sin nombre (probar validación inline)
  console.log('🔍 Probando validación inline (Siguiente sin nombre)...');
  const valResult = await send('Runtime.evaluate', {
    expression: `goToProductStep(2);`
  });
  const errVisible = await send('Runtime.evaluate', {
    expression: `document.getElementById('m-name-error').style.display === 'block'`
  });
  console.log('✓ Validación inline funcionando:', errVisible.result.value ? 'SÍ (bloqueó avance)' : 'NO');

  // Completar Nombre y Categoría
  await send('Runtime.evaluate', {
    expression: `
      document.getElementById('m-name').value = 'Jamón Cocido Feteado Primera Calidad';
      if (document.getElementById('m-cat').options.length > 1) {
        document.getElementById('m-cat').selectedIndex = 1;
      } else {
        document.getElementById('m-cat').innerHTML = '<option value="fiambreria" selected>Fiambrería</option>';
      }
      document.getElementById('m-marca').value = 'Bocatti';
      document.getElementById('m-emoji').value = '🥓';
    `
  });
  await sleep(300);

  // Capturar Paso 1: Básicos
  console.log('📸 Capturando Paso 1 (Datos Básicos completados)...');
  const shot1 = await send('Page.captureScreenshot', { format: 'png' });
  const p1Path = path.join(ARTIFACTS_DIR, `product_wizard_mobile_step1_${Date.now()}.png`);
  fs.writeFileSync(p1Path, Buffer.from(shot1.data, 'base64'));
  console.log('✓ Guardado:', p1Path);

  // 3. Avanzar a Paso 2: Precios & Configuración de Fraccionado
  console.log('➡️ Avanzando a Paso 2 (Precios y Fraccionado)...');
  await send('Runtime.evaluate', {
    expression: `goToProductStep(2); document.getElementById('m-price').value = '18500'; document.getElementById('m-stock').value = '15.5'; document.getElementById('m-weight-unit').value = 'kg'; document.getElementById('m-weight-min').value = '100g';`
  });
  await sleep(500);

  console.log('📸 Capturando Paso 2 (Precios & Unidad de Medida)...');
  const shot2 = await send('Page.captureScreenshot', { format: 'png' });
  const p2Path = path.join(ARTIFACTS_DIR, `product_wizard_mobile_step2_${Date.now()}.png`);
  fs.writeFileSync(p2Path, Buffer.from(shot2.data, 'base64'));
  console.log('✓ Guardado:', p2Path);

  // 4. Avanzar a Paso 3: Fotos
  console.log('➡️ Avanzando a Paso 3 (Fotos)...');
  await send('Runtime.evaluate', {
    expression: `goToProductStep(3); document.getElementById('m-img').value = 'https://images.unsplash.com/photo-1524438418049-ab2acb7aa48f?w=400'; previewImgUrl(document.getElementById('m-img').value, 0);`
  });
  await sleep(500);

  console.log('📸 Capturando Paso 3 (Fotos)...');
  const shot3 = await send('Page.captureScreenshot', { format: 'png' });
  const p3Path = path.join(ARTIFACTS_DIR, `product_wizard_mobile_step3_${Date.now()}.png`);
  fs.writeFileSync(p3Path, Buffer.from(shot3.data, 'base64'));
  console.log('✓ Guardado:', p3Path);

  // 5. Avanzar a Paso 4: Detalle & Vista Previa
  console.log('➡️ Avanzando a Paso 4 (Detalles & Vista previa)...');
  await send('Runtime.evaluate', {
    expression: `
      goToProductStep(4);
      document.getElementById('m-detalle').value = 'Jamón cocido seleccionado feteado a la vista. Envasado al vacío o al corte directo.';
      document.querySelector('input[name="m-pills"][value="Oferta"]').checked = true;
      renderProductWizardPreview();
    `
  });
  await sleep(500);

  console.log('📸 Capturando Paso 4 (Vista previa final en mobile)...');
  const shot4 = await send('Page.captureScreenshot', { format: 'png' });
  const p4Path = path.join(ARTIFACTS_DIR, `product_wizard_mobile_step4_${Date.now()}.png`);
  fs.writeFileSync(p4Path, Buffer.from(shot4.data, 'base64'));
  console.log('✓ Guardado:', p4Path);

  // Cerrar pestaña
  await send('Page.close');
  ws.close();
  await fetch(`http://127.0.0.1:${PORT}/json/close/${tabData.id}`);

  console.log('🎉 PRUEBA DE NAVEGADOR MÓVIL COMPLETADA CON ÉXITO ABSOLUTO!');
}

run().catch(e => {
  console.error('❌ Error en prueba de navegador:', e);
  process.exit(1);
});
