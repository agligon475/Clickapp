import fs from 'fs';

const content = fs.readFileSync('landing.html', 'utf8');

const headings = [...content.matchAll(/<h[1-4][^>]*>(.*?)<\/h[1-4]>/gis)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('Headings count:', headings.length);
headings.forEach((h, i) => console.log(`${i+1}: ${h.substring(0, 80)}`));

const priceMatches = content.match(/.{0,50}(?:precio|plan|gratis|mensual|anual|\$|tarifa|pricing).{0,50}/gi);
console.log('\nPrice matches snippet count:', priceMatches ? priceMatches.length : 0);
if (priceMatches) {
  priceMatches.slice(0, 15).forEach(p => console.log('MATCH:', p.trim().replace(/\s+/g, ' ')));
}
