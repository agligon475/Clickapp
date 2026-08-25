import fs from 'fs';

const html = fs.readFileSync('dashboard.html', 'utf8');

const showViewFnIdx = html.indexOf('function showView(');
if (showViewFnIdx !== -1) {
  console.log('--- showView function ---');
  console.log(html.slice(showViewFnIdx, showViewFnIdx + 1000));
}
