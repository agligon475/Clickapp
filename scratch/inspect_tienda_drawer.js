import fs from 'fs';

const html = fs.readFileSync('tienda.html', 'utf8');

const drawerIdx = html.indexOf('id="drawer"');
console.log('drawer index in tienda.html:', drawerIdx);
if (drawerIdx !== -1) {
  console.log(html.slice(drawerIdx, drawerIdx + 2000));
}
