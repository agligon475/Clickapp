import fs from 'fs';

const html = fs.readFileSync('landing.html', 'utf8');
const lines = html.split('\n');

function findLines(query) {
  const matches = [];
  lines.forEach((line, idx) => {
    if (line.includes(query)) matches.push({ line: idx + 1, text: line.trim() });
  });
  return matches;
}

console.log('=== MATCHES IN LANDING.HTML ===');
console.log('Hero section:', findLines('<section class="hero'));
console.log('Features section:', findLines('id="features-section"'));
console.log('Demo stores section:', findLines('id="demo-stores-section"'));
console.log('How section:', findLines('id="how-section"'));
console.log('Pricing section:', findLines('id="pricing-section"'));
console.log('FAQ section:', findLines('id="faq-section"'));
