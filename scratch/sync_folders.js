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
  'api/auth.js',
  'api/welcome-email.js',
  'api/super-admin.js',
  'super-admin-login.html',
  'super-admin-secret-dashboard.html',
  'super-admin-prospectos.html',
  'super-admin-email-cms.html',
  'super-admin-config.html',
  'enviar-comprobante.html',
  'api/email-templates.js',
  'manifest.json',
  'sw.js',
  'icon-192.png',
  'icon-512.png',
  'bgd-samples/blob_background.jpg',
  'bgd-samples/block_background.jpg',
  'bgd-samples/blurry_background.jpg',
  'bgd-samples/code_background.jpg',
  'bgd-samples/material_background.jpg',
  'bgd-samples/peak_background.jpg',
  'bgd-samples/rain_background.jpg',
  'bgd-samples/scattered_background.jpg',
  'bgd-samples/scribbles_background.jpg',
  'bgd-samples/split_background.jpg',
  'bgd-samples/step_background.jpg',
  'bgd-samples/wave_background.jpg'
];

const destinations = [
  './Clickapp-main',
  './Clickapp',
  './Clickapp/Clickapp-main',
  './Clickapp/Clickapp'
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
