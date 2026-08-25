import fs from 'fs';

const html = fs.readFileSync('dashboard.html', 'utf8');

const modalCategoryIdx = html.indexOf('id="modal-category"');
if (modalCategoryIdx !== -1) {
  console.log('--- modal-category snippet ---');
  console.log(html.slice(modalCategoryIdx - 50, modalCategoryIdx + 1200));
}
