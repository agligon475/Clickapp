const fs = require('fs');

const altaContent = fs.readFileSync('alta-usuario.html', 'utf8');
const dashContent = fs.readFileSync('dashboard.html', 'utf8');
const landingContent = fs.readFileSync('landing.html', 'utf8');

console.log('--- ALTA-USUARIO.HTML ---');
const altaLines = altaContent.split('\n');
altaLines.forEach((l, idx) => {
  if (l.includes('seedCategoriesForNewStore') || l.includes('store-subrubro')) {
    console.log(`L${idx+1}: ${l.trim()}`);
  }
});

console.log('\n--- LANDING.HTML ---');
const landingLines = landingContent.split('\n');
landingLines.forEach((l, idx) => {
  if (l.includes('defaultCats') || l.includes('/rest/v1/categories')) {
    console.log(`L${idx+1}: ${l.trim()}`);
  }
});
