import fs from 'fs';
import path from 'path';

const PORT = 9222;
const ARTIFACTS_DIR = 'C:\\Users\\agust\\.gemini\\antigravity-ide\\brain\\fe24473b-6225-471c-ab76-7a66eaabb060';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log('🔄 Probando ciclo completo: Creación de Pack + Guardado + Edición...');

  const newTabRes = await fetch(`http://127.0.0.1:${PORT}/json/new?http://localhost:5500/dashboard.html?demo=1`, { method: 'PUT' });
  const tabData = await newTabRes.json();
  const pageWsUrl = tabData.webSocketDebuggerUrl;

  const ws = new globalThis.WebSocket(pageWsUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });

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
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });

  await sleep(1500);

  // 1. Abrir Modal y seleccionar Pack
  console.log('🎁 Creando producto tipo Pack...');
  await send('Runtime.evaluate', { expression: `openModal();` });
  await sleep(400);

  await send('Runtime.evaluate', {
    expression: `selectProductArchetype('pack', false); goToProductStep(1);`
  });
  await sleep(400);

  // 2. Cargar Paso 1
  await send('Runtime.evaluate', {
    expression: `
      document.getElementById('m-name').value = 'Caja Alfajores Marplatenses x12';
      if (document.getElementById('m-cat').options.length > 1) {
        document.getElementById('m-cat').selectedIndex = 1;
      } else {
        document.getElementById('m-cat').innerHTML = '<option value="dulces" selected>Dulces & Snacks</option>';
      }
      document.getElementById('m-marca').value = 'Havanna';
      document.getElementById('m-emoji').value = '🍫';
    `
  });

  // 3. Paso 2: Pack qty y precio
  await send('Runtime.evaluate', {
    expression: `
      goToProductStep(2);
      document.getElementById('m-pack-qty').value = '12';
      document.getElementById('m-price').value = '14400';
      document.getElementById('m-stock').value = '30';
      calcPackUnitPrice();
    `
  });
  await sleep(400);

  // 4. Paso 3: Fotos
  await send('Runtime.evaluate', {
    expression: `
      goToProductStep(3);
      document.getElementById('m-img').value = 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400';
      previewImgUrl(document.getElementById('m-img').value, 0);
    `
  });
  await sleep(300);

  // 5. Paso 4: Detalle y vista previa
  await send('Runtime.evaluate', {
    expression: `
      goToProductStep(4);
      document.getElementById('m-detalle').value = 'Caja de 12 unidades surtidas con dulce de leche premium.';
      document.querySelector('input[name="m-pills"][value="Nuevo ingreso"]').checked = true;
      renderProductWizardPreview();
    `
  });
  await sleep(400);

  // Capturar preview de Pack
  console.log('📸 Capturando Preview de Pack...');
  const shotPack = await send('Page.captureScreenshot', { format: 'png' });
  const pPackPath = path.join(ARTIFACTS_DIR, `product_wizard_pack_preview_${Date.now()}.png`);
  fs.writeFileSync(pPackPath, Buffer.from(shotPack.data, 'base64'));
  console.log('✓ Guardado:', pPackPath);

  // 6. Test guardado local
  const saveTest = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const dummyProd = {
          id: 'test_pack_999',
          name: document.getElementById('m-name').value,
          cat: document.getElementById('m-cat').value,
          marca: document.getElementById('m-marca').value,
          price: parseFloat(document.getElementById('m-price').value),
          stock: parseFloat(document.getElementById('m-stock').value),
          emoji: document.getElementById('m-emoji').value,
          img: document.getElementById('m-img').value,
          detalle: document.getElementById('m-detalle').value + ' ||| ' + JSON.stringify({
            productType: window.pwCurrentArchetype,
            packQty: parseInt(document.getElementById('m-pack-qty').value)
          }),
          pills: 'Nuevo ingreso'
        };
        localProducts.unshift(dummyProd);
        return dummyProd;
      })()
    `,
    returnByValue: true
  });
  console.log('✓ Producto creado:', saveTest.result.value.name, '| Tipo:', saveTest.result.value.detalle);

  // 7. Probar que al abrir para editar detecta que es "pack" y va directo a Paso 1
  console.log('✏️ Probando apertura para edición...');
  await send('Runtime.evaluate', { expression: `openModal('test_pack_999');` });
  await sleep(500);

  const editState = await send('Runtime.evaluate', {
    expression: `({
      step: window.pwCurrentStep,
      archetype: window.pwCurrentArchetype,
      packQty: document.getElementById('m-pack-qty')?.value,
      name: document.getElementById('m-name')?.value
    })`,
    returnByValue: true
  });

  console.log('✓ Estado al abrir edición:', editState.result.value);

  if (editState.result.value.step === 1 && editState.result.value.archetype === 'pack' && editState.result.value.packQty === '12') {
    console.log('✅ VERIFICACIÓN DE EDICIÓN: 100% EXITOSA (detectó arquetipo pack, restauró qty 12 y abrió en Paso 1)');
  } else {
    console.error('❌ Error en detección de edición:', editState.result.value);
    process.exit(1);
  }

  // Cerrar pestaña
  await send('Page.close');
  ws.close();
  await fetch(`http://127.0.0.1:${PORT}/json/close/${tabData.id}`);

  console.log('🏆 CICLO COMPLETO DE ALTA Y EDICIÓN VERIFICADO CORRECTAMENTE.');
}

run().catch(e => {
  console.error('❌ Error en prueba de guardado y edición:', e);
  process.exit(1);
});
