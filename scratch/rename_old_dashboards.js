import fs from 'fs';
import path from 'path';

const locations = [
  '.',
  './Clickapp'
];

locations.forEach(loc => {
  const demoPath = path.join(loc, 'dashboard-demo.html');
  const demoDest = path.join(loc, 'old-dashboard-demo.html');
  const testPath = path.join(loc, 'dashboard-test.html');
  const testDest = path.join(loc, 'old-dashboard-test.html');

  if (fs.existsSync(demoPath)) {
    fs.renameSync(demoPath, demoDest);
    console.log(`Renombrado: ${demoPath} -> ${demoDest}`);
  } else {
    console.log(`No encontrado: ${demoPath}`);
  }

  if (fs.existsSync(testPath)) {
    fs.renameSync(testPath, testDest);
    console.log(`Renombrado: ${testPath} -> ${testDest}`);
  } else {
    console.log(`No encontrado: ${testPath}`);
  }
});

console.log('Renombramiento completo!');
