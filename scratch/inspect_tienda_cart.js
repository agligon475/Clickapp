import fs from 'fs';

const html = fs.readFileSync('tienda.html', 'utf8');

// Find cart keywords in tienda.html
const cartMatches = [...html.matchAll(/carrito|cart/gi)];
console.log(`Found ${cartMatches.length} occurrences of carrito/cart in tienda.html`);

// Search for functions in tienda.html
const fnMatches = [...html.matchAll(/function\s+([a-zA-Z0-9_$]+)\s*\(/g)];
console.log('Functions in tienda.html:');
fnMatches.forEach(m => console.log('-', m[1]));
