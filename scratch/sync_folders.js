import fs from 'fs';
import path from 'path';

const filesToSync = [
  'dashboard.html',
  'tienda.html',
  // index.html is intentionally NOT synced to root — Vercel serves it as
  // a static file for "/" which overrides the api/store rewrite.
  // Store template lives in submodule subdirectories only.
  'alta-usuario.html',
  'landing.html',
  'ayuda.html',
  'vercel.json',
  'main.py',
  'requirements.txt',
  'api/image-search.js',
  'api/store.js',
  'api/debug.js',
  'api/auth.js',
  'api/welcome-email.js',
  'api/super-admin.js',
  'super-admin-secret-dashboard.html',
  'manifest.json',
  'sw.js',
  'icon-192.png',
  'icon-512.png'
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
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    console.log(`Copiado: ${src} -> ${dest}`);
  });
});

console.log('¡Sincronización completada!');
