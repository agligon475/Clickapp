import fs from 'fs';
const content = fs.readFileSync('dashboard.html', 'utf8');
const ids = ['modal-title-text', 'm-codigo-status', 'm-img-status', 'm-img2-status', 'm-img3-status', 'm-detalle-status'];
ids.forEach(id => {
  console.log(id, 'exists:', content.includes('id="' + id + '"'));
});
