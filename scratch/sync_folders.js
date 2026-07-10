import fs from 'fs';
import path from 'path';

const filesToSync = [
  'dashboard.html',
  'tienda.html',
  'index.html',
  'alta-usuario.html'
];

const destinations = [
  './Clickapp-main',
  './Clickapp'
];

console.log('Sincronizando archivos del root a los destinos...');
filesToSync.forEach(file => {
  const src = `./${file}`;
  if (!fs.existsSync(src)) {
    console.warn(`Archivo origen no encontrado: ${src}`);
    return;
  }

  destinations.forEach(destDir => {
    const dest = path.join(destDir, file);
    fs.copyFileSync(src, dest);
    console.log(`Copiado: ${src} -> ${dest}`);
  });
});

console.log('¡Sincronización completada!');
