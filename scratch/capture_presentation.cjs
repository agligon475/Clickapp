const http = require('http');
const fs = require('fs');
const path = require('path');
// Native WebSocket in Node.js
// const WebSocket = globalThis.WebSocket;

const ARTIFACT_DIR = 'C:\\Users\\agust\\.gemini\\antigravity-ide\\brain\\fe24473b-6225-471c-ab76-7a66eaabb060';

async function getPageWsUrl() {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const pages = JSON.parse(data);
        const target = pages.find(p => p.url && p.url.includes('informe-vulnerabilidades-clickapp.html'));
        if (target && target.webSocketDebuggerUrl) {
          resolve(target.webSocketDebuggerUrl);
        } else {
          reject(new Error('Target page not found'));
        }
      });
    }).on('error', reject);
  });
}

function sendCommand(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 1000000);
    const handler = (event) => {
      const resp = JSON.parse(event.data);
      if (resp.id === id) {
        ws.removeEventListener('message', handler);
        if (resp.error) reject(resp.error);
        else resolve(resp.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function capture() {
  const wsUrl = await getPageWsUrl();
  console.log('Connecting to:', wsUrl);
  const ws = new WebSocket(wsUrl);

  await new Promise(r => ws.addEventListener('open', r));

  // Reload page
  console.log('Reloading page...');
  await sendCommand(ws, 'Page.reload', { ignoreCache: true });
  await sleep(1500);

  const slidesToCapture = [1, 5, 6, 7, 8, 9, 10, 14, 15];

  for (const slideNum of slidesToCapture) {
    console.log(`Navigating to slide ${slideNum}...`);
    await sendCommand(ws, 'Runtime.evaluate', {
      expression: `goToSlide(${slideNum})`
    });
    await sleep(400);

    const shot = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png' });
    const filePath = path.join(ARTIFACT_DIR, `slide_${slideNum}_remediated_${Date.now()}.png`);
    fs.writeFileSync(filePath, Buffer.from(shot.data, 'base64'));
    console.log(`Saved screenshot: ${filePath}`);
  }

  ws.close();
  console.log('All slides captured successfully!');
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
