import fs from 'fs';

const html = fs.readFileSync('landing.html', 'utf8');

function getSectionCode(tag, startStr, endStr) {
  const start = html.indexOf(startStr);
  if (start === -1) return 'NOT FOUND';
  const end = endStr ? html.indexOf(endStr, start) : start + 1500;
  return html.slice(start, end === -1 ? start + 1500 : end);
}

console.log('--- HERO SECTION ---');
console.log(getSectionCode(0, '<section class="hero', '</section>').slice(0, 800));

console.log('\n--- DEMOS SECTION ---');
console.log(getSectionCode(0, 'id="demo-stores-section"', '</section>').slice(0, 800));

console.log('\n--- HOW IT WORKS SECTION ---');
console.log(getSectionCode(0, 'id="how-section"', '</section>').slice(0, 800));

console.log('\n--- PRICING SECTION ---');
console.log(getSectionCode(0, 'id="pricing-section"', '</section>').slice(0, 800));

console.log('\n--- FAQ SECTION ---');
console.log(getSectionCode(0, 'id="faq-section"', '</section>').slice(0, 800));
