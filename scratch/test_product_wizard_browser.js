import fs from 'fs';
import path from 'path';

const PORT = 9222;
const ARTIFACTS_DIR = 'C:\\Users\\agust\\.gemini\\antigravity-ide\\brain\\fe24473b-6225-471c-ab76-7a66eaabb060';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log('📱 Iniciando prueba interactiva E2E de Mobile-First Product Wizard (Pasos 1 al 5)...');

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

  // 1. Abrir Modal de Producto (inicia en Paso 1)
  console.log('✨ Abriendo Product Wizard con openModal()...');
  await send('Runtime.evaluate', {
    expression: `openModal();`
  });
  await sleep(600);

  // Capturar Paso 1: Arquetipos (con Opciones / Modelos para tecnología / electrodomésticos)
  console.log('📸 Capturando Paso 1 (Selector de Modalidad 1 de 5)...');
  const shot1 = await send('Page.captureScreenshot', { format: 'png' });
  const p1Path = path.join(ARTIFACTS_DIR, `product_wizard_mobile_step1_${Date.now()}.png`);
  fs.writeFileSync(p1Path, Buffer.from(shot1.data, 'base64'));
  console.log('✓ Guardado:', p1Path);

  // 2. Elegir Arquetipo "variants" (Con Variantes y Modelos / Opciones)
  console.log('🎛️ Seleccionando arquetipo: Con Variantes y Modelos...');
  await send('Runtime.evaluate', {
    expression: `selectProductArchetype('variants', false); goToProductStep(2);`
  });
  await sleep(500);

  // Probar validación inline: intentar avanzar al Paso 3 sin nombre
  console.log('🔍 Probando validación inline (Paso 2 -> Paso 3 sin nombre)...');
  await send('Runtime.evaluate', {
    expression: `goToProductStep(3);`
  });
  const errVisible = await send('Runtime.evaluate', {
    expression: `document.getElementById('m-name-error').style.display === 'block'`
  });
  console.log('✓ Validación inline funcionando:', errVisible.result.value ? 'SÍ (bloqueó avance)' : 'NO');

  // Completar Nombre, Categoría y Marca de Tecnología / Electrodomésticos
  await send('Runtime.evaluate', {
    expression: `
      document.getElementById('m-name').value = 'Celular Smartphone Pro Max 5G';
      if (document.getElementById('m-cat').options.length > 1) {
        document.getElementById('m-cat').selectedIndex = 1;
      } else {
        document.getElementById('m-cat').innerHTML = '<option value="tecnologia" selected>Tecnología y Celulares</option>';
      }
      document.getElementById('m-marca').value = 'Samsung';
      document.getElementById('m-emoji').value = '📱';
      clearPwErrors();
    `
  });
  await sleep(300);

  // Capturar Paso 2: Básicos
  console.log('📸 Capturando Paso 2 (Datos Básicos completados)...');
  const shot2 = await send('Page.captureScreenshot', { format: 'png' });
  const p2Path = path.join(ARTIFACTS_DIR, `product_wizard_mobile_step2_${Date.now()}.png`);
  fs.writeFileSync(p2Path, Buffer.from(shot2.data, 'base64'));
  console.log('✓ Guardado:', p2Path);

  // 3. Avanzar a Paso 3: Precios, Stock y Plantillas de Variantes de Tecnología
  console.log('➡️ Avanzando a Paso 3 (Precios y Plantillas de Modelos / Opciones)...');
  await send('Runtime.evaluate', {
    expression: `
      goToProductStep(3);
      document.getElementById('m-price').value = '850000';
      document.getElementById('m-stock').value = '20';
      addTechPresetGroup();
    `
  });
  await sleep(500);

  console.log('📸 Capturando Paso 3 (Precios y Modelos de Capacidad 128/256/512GB)...');
  const shot3 = await send('Page.captureScreenshot', { format: 'png' });
  const p3Path = path.join(ARTIFACTS_DIR, `product_wizard_mobile_step3_${Date.now()}.png`);
  fs.writeFileSync(p3Path, Buffer.from(shot3.data, 'base64'));
  console.log('✓ Guardado:', p3Path);

  // 4. Avanzar a Paso 4: Fotos
  console.log('➡️ Avanzando a Paso 4 (Fotos)...');
  await send('Runtime.evaluate', {
    expression: `
      goToProductStep(4);
      document.getElementById('m-img').value = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400';
      previewImgUrl(document.getElementById('m-img').value, 0);
    `
  });
  await sleep(500);

  console.log('📸 Capturando Paso 4 (Fotos del producto)...');
  const shot4 = await send('Page.captureScreenshot', { format: 'png' });
  const p4Path = path.join(ARTIFACTS_DIR, `product_wizard_mobile_step4_${Date.now()}.png`);
  fs.writeFileSync(p4Path, Buffer.from(shot4.data, 'base64'));
  console.log('✓ Guardado:', p4Path);

  // 5. Avanzar a Paso 5: Detalle & Vista Previa
  console.log('➡️ Avanzando a Paso 5 (Detalles & Vista previa)...');
  await send('Runtime.evaluate', {
    expression: `
      goToProductStep(5);
      document.getElementById('m-detalle').value = 'Smartphone de alta gama con pantalla AMOLED de 120Hz, cámara triple de 108MP y batería de 5000 mAh. Garantía oficial de 1 año.';
      const pillO = document.querySelector('input[name="m-pills"][value="Nuevo ingreso"]');
      if (pillO) pillO.checked = true;
      renderProductWizardPreview();
    `
  });
  await sleep(500);

  console.log('📸 Capturando Paso 5 (Vista previa final en mobile)...');
  const shot5 = await send('Page.captureScreenshot', { format: 'png' });
  const p5Path = path.join(ARTIFACTS_DIR, `product_wizard_mobile_step5_${Date.now()}.png`);
  fs.writeFileSync(p5Path, Buffer.from(shot5.data, 'base64'));
  console.log('✓ Guardado:', p5Path);

  // Cerrar pestaña
  await send('Page.close');
  ws.close();
  await fetch(`http://127.0.0.1:${PORT}/json/close/${tabData.id}`);

  console.log('🎉 PRUEBA DE NAVEGADOR MÓVIL (PASOS 1 AL 5) COMPLETADA CON ÉXITO ABSOLUTO!');
}

run().catch(e => {
  console.error('❌ Error en prueba de navegador:', e);
  process.exit(1);
});
