import { spawn } from 'child_process';
import http from 'http';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getWsUrl() {
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) {
        const data = await res.json();
        return data.webSocketDebuggerUrl;
      }
    } catch (e) {}
    await sleep(300);
  }
  throw new Error('Chrome remote debugging not ready');
}

async function run() {
  console.log('🚀 Lanzando Google Chrome Headless para validar Slides 11 a 15...');
  const chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${PORT}`,
    '--no-sandbox',
    '--window-size=1600,1000'
  ]);

  try {
    const wsUrl = await getWsUrl();
    console.log('🔗 Conectado a Chrome DevTools Protocol en:', wsUrl);

    // Crear nueva pestaña
    const newTabRes = await fetch(`http://127.0.0.1:${PORT}/json/new?http://localhost:5500/informe-vulnerabilidades-clickapp.html`, { method: 'PUT' });
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

    function sendCommand(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        callbacks.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await sendCommand('Page.enable');
    await sendCommand('Runtime.enable');
    await sleep(1500);

    console.log('\n📊 VERIFICANDO CADA DIAPOSITIVA (11 A 15):');

    for (let slideNum = 11; slideNum <= 15; slideNum++) {
      // Ejecutar goToSlide(slideNum)
      await sendCommand('Runtime.evaluate', {
        expression: `goToSlide(${slideNum})`
      });
      await sleep(400);

      // Evaluar estado visual de la slide
      const evalRes = await sendCommand('Runtime.evaluate', {
        expression: `
          (() => {
            const active = document.querySelector('.slide.active');
            if (!active) return { found: false };
            const rect = active.getBoundingClientRect();
            const title = active.querySelector('.slide-title')?.innerText || '';
            const subtitle = active.querySelector('.slide-subtitle')?.innerText || '';
            const isVisible = rect.width > 500 && rect.height > 300 && window.getComputedStyle(active).visibility === 'visible';
            return {
              found: true,
              dataIndex: active.getAttribute('data-index'),
              title,
              subtitle,
              width: rect.width,
              height: rect.height,
              isVisible
            };
          })()
        `,
        returnByValue: true
      });

      const data = evalRes.result.value;
      if (data && data.found && data.isVisible && String(data.dataIndex) === String(slideNum)) {
        console.log(`✅ [SLIDE ${slideNum}] VISIBLE & RENDERIZADA:`);
        console.log(`   Título: "${data.title}"`);
        console.log(`   Dimensiones: ${Math.round(data.width)}x${Math.round(data.height)}px | Visibility: OK\n`);
      } else {
        console.error(`❌ [SLIDE ${slideNum}] ERROR DE VISIBILIDAD:`, data);
      }
    }

    ws.close();
  } finally {
    chromeProcess.kill();
    console.log('🏁 Sesión de Chrome cerrada satisfactoriamente.');
  }
}

run().catch(err => {
  console.error('Error durante la validación:', err.message);
  process.exit(1);
});
