import fs from 'fs';

const html = fs.readFileSync('tienda.html', 'utf8');

const idx = html.indexOf('function enviarWhatsApp()');
if (idx !== -1) {
  console.log(html.slice(idx + 800, idx + 2000));
}
