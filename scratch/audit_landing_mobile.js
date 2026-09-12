import fs from 'fs';

const html = fs.readFileSync('landing.html', 'utf8');

// Find all media queries
const mediaQueries = html.match(/@media[^{]+\{/g);
console.log('Media queries found:', mediaQueries);

// Find inline styles with fixed pixel widths > 300px
const fixedWidths = [...html.matchAll(/style="[^"]*width:\s*(\d+)px[^"]*"/g)]
  .filter(m => parseInt(m[1]) > 320)
  .map(m => m[0]);
console.log('Large fixed width styles count:', fixedWidths.length);
fixedWidths.forEach(w => console.log('Fixed width:', w));

// Check containers and overflow
console.log('Contains overflow-x: hidden on body/html?', /body\s*\{[^}]*overflow-x:\s*hidden/i.test(html));

// Check all sections in landing.html
const sectionTags = [...html.matchAll(/<(?:section|div)[^>]*(?:class|id)=["']([^"']*(?:section|hero|pricing|testimonials|demo|faq|footer|navbar)[^"']*)["'][^>]*>/gi)]
  .map(m => m[0]);
console.log('\nSections/Key blocks count:', sectionTags.length);
sectionTags.forEach(s => console.log('SECTION BLOCK:', s.substring(0, 100)));
