import fs from 'fs';

const html = fs.readFileSync('landing.html', 'utf-8');

console.log('=== BUTTONS ===');
const buttons = [...html.matchAll(/<button([^>]*)>([\s\S]*?)<\/button>/gi)];
buttons.forEach((b, i) => {
  const text = b[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  console.log(`[Button ${i}] Text: "${text}" | Attr: ${b[1].trim()}`);
});

console.log('\n=== LINKS WITH BTN / CTA / MODAL ===');
const links = [...html.matchAll(/<a([^>]*)>([\s\S]*?)<\/a>/gi)];
links.forEach((a, i) => {
  const text = a[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const attr = a[1];
  if (attr.includes('btn') || attr.includes('cta') || attr.includes('open') || attr.includes('Modal') || attr.includes('register') || attr.includes('style=')) {
    console.log(`[Link ${i}] Text: "${text}" | Attr: ${attr.trim().slice(0, 100)}`);
  }
});
