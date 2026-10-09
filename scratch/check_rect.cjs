(async () => {
  const ws = new (globalThis.WebSocket)('ws://127.0.0.1:9222/devtools/page/D2E84C900FF98C26CD8E43BD564C05A9');
  await new Promise(r => ws.addEventListener('open', r));
  const send = (m, p) => new Promise(res => {
    const id = 1;
    ws.addEventListener('message', e => { const d = JSON.parse(e.data); if (d.id === 1) res(d.result); });
    ws.send(JSON.stringify({ id, method: m, params: p }));
  });
  await send('Page.reload', { ignoreCache: true });
  await new Promise(r => setTimeout(r, 800));
  const res = await send('Runtime.evaluate', {
    expression: `(() => {
      goToSlide(14);
      return {
        totalSlides,
        currentSlide,
        slide14Found: !!document.querySelector('.slide[data-index="14"]'),
        activeSlideIndex: document.querySelector('.slide.active')?.dataset?.index
      };
    })()`,
    returnByValue: true
  });
  console.log(res.result.value);
  ws.close();
})();
