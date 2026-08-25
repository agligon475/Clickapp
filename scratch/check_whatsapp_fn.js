import fs from 'fs';

const html = fs.readFileSync('tienda.html', 'utf8');

const idx = html.indexOf('const msg = [');
if (idx !== -1) {
  console.log(html.slice(idx, idx + 800));
}
