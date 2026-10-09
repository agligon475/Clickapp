(async () => {
  const fs = require('fs');
  const path = require('path');
  const ARTIFACT_DIR = 'C:\\Users\\agust\\.gemini\\antigravity-ide\\brain\\fe24473b-6225-471c-ab76-7a66eaabb060';

  const ws = new (globalThis.WebSocket)('ws://127.0.0.1:9222/devtools/page/D2E84C900FF98C26CD8E43BD564C05A9');
  await new Promise(r => ws.addEventListener('open', r));
  const send = (m, p = {}) => new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 1000000);
    const handler = (e) => {
      const d = JSON.parse(e.data);
      if (d.id === id) {
        ws.removeEventListener('message', handler);
        if (d.error) reject(d.error);
        else resolve(d.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method: m, params: p }));
  });

  console.log('Navigating to Slide 14...');
  await send('Runtime.evaluate', {
    expression: 'goToSlide(14)'
  });
  await new Promise(r => setTimeout(r, 800));

  const shot14 = await send('Page.captureScreenshot', { format: 'png' });
  const p14 = path.join(ARTIFACT_DIR, 'slide_14_verified_final.png');
  fs.writeFileSync(p14, Buffer.from(shot14.data, 'base64'));
  console.log('Saved Slide 14:', p14);

  console.log('Navigating to Slide 15...');
  await send('Runtime.evaluate', {
    expression: 'goToSlide(15)'
  });
  await new Promise(r => setTimeout(r, 800));

  const shot15 = await send('Page.captureScreenshot', { format: 'png' });
  const p15 = path.join(ARTIFACT_DIR, 'slide_15_verified_final.png');
  fs.writeFileSync(p15, Buffer.from(shot15.data, 'base64'));
  console.log('Saved Slide 15:', p15);

  ws.close();
})();
