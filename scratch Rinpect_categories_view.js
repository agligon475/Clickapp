import fs from 'fs';

const html = fs.readFileSync('dashboard.html', 'utf8');

const categoriesSectionIdx = html.indexOf('id="view-categories"');
console.log('--- view-categories snippet ---');
console.log(html.slice(categoriesSectionIdx, categoriesSectionIdx + 2000));
