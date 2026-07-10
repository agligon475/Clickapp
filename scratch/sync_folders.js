import fs from 'fs';

const filesToSync = [
  'dashboard.html',
  'tienda.html',
  'index.html',
  'alta-usuario.html'
];

console.log('Sincronizando archivos del root a Clickapp-main/...');
filesToSync.forEach(file => {
  const src = `./${file}`;
  const dest = `./Clickapp-main/${file}`;
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copiado: ${src} -> ${dest}`);
  } else {
    console.warn(`Archivo no encontrado: ${src}`);
  }
});

console.log('¡Sincronización completada!');
