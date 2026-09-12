import fs from 'fs';

const html = fs.readFileSync('landing.html', 'utf8');

// Check script blocks for syntax errors
const scripts = [...html.matchAll(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/gi)];
console.log('Inline script blocks found:', scripts.length);

scripts.forEach((s, idx) => {
  try {
    new Function(s[1]);
    console.log(`Script ${idx+1}: VALID JS`);
  } catch (err) {
    console.error(`Script ${idx+1} ERROR:`, err.message);
  }
});

// Check critical IDs
const requiredIds = [
  'pricing-section',
  'toggle-opt-monthly',
  'toggle-opt-annual',
  'price-starter-amount',
  'price-starter-period',
  'price-pro-amount',
  'price-pro-period',
  'price-enterprise-amount',
  'price-enterprise-period',
  'demo-slider-container',
  'demo-slider-track',
  'register-modal',
  'reg-modal-subtitle'
];

requiredIds.forEach(id => {
  const exists = html.includes(`id="${id}"`);
  console.log(`ID #${id}: ${exists ? 'OK' : 'MISSING'}`);
});
