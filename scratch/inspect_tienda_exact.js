import fs from 'fs';

const html = fs.readFileSync('tienda.html', 'utf8');

console.log('Searching <div id="cart-summary">...');
const idx1 = html.indexOf('<div id="cart-summary">');
if (idx1 !== -1) console.log(html.slice(idx1, idx1 + 300));

console.log('\nSearching cartTotal...');
const idx2 = html.indexOf('function cartTotal()');
if (idx2 !== -1) console.log(html.slice(idx2, idx2 + 300));

console.log('\nSearching updateCartUI...');
const idx3 = html.indexOf('function updateCartUI()');
if (idx3 !== -1) console.log(html.slice(idx3, idx3 + 300));

console.log('\nSearching WhatsApp order message...');
const idx4 = html.indexOf('let mensaje =');
if (idx4 !== -1) console.log(html.slice(idx4, idx4 + 200));
