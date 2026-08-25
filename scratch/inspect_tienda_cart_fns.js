import fs from 'fs';

const html = fs.readFileSync('tienda.html', 'utf8');

const getFn = (name) => {
  const reg = new RegExp(`function ${name}\\s*\\([^)]*\\)\\s*\\{`, 'g');
  const m = reg.exec(html);
  if (!m) return null;
  const start = m.index;
  return html.slice(start, start + 1200);
};

console.log('--- cartTotal ---');
console.log(getFn('cartTotal'));

console.log('--- updateCartUI ---');
console.log(getFn('updateCartUI'));

console.log('--- renderDrawer ---');
console.log(getFn('renderDrawer'));

console.log('--- enviarWhatsApp ---');
console.log(getFn('enviarWhatsApp'));
