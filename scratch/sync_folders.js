import fs from 'fs';
import path from 'path';

const filesToSync = [
  'dashboard.html',
  'tienda.html',
  'kit-imprimible.html',
  'api/qr.js',
  // index.html is intentionally NOT synced to root — Vercel serves it as
  // a static file for "/" which overrides the api/store rewrite.
  // Store template lives in submodule subdirectories only.
  'alta-usuario.html',
  'CENTRO-NOTIFICACIONES-GUIA.md',
  'landing.html',
  'ayuda.html',
  'terminos.html',
  'privacidad.html',
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
  'informe-vulnerabilidades-clickapp.html',
  'presentacion-evolucion-clickapp.html',
  'desarrollo.html',
  'components/DesarrolloScrollStory.jsx',
  'app/desarrollo/page.jsx',
  'app/layout.jsx',
  'app/globals.css',
  'js/logistics.js',
  'src/services/logistics.js',
  'src/lib/dispatchDelivery.js',
  'supabase_multirubro_schema.sql',
  'enviar-comprobante.html',
  'api/email-templates.js',
  'manifest.json',
  'twa-manifest.json',
  '.well-known/assetlinks.json',
  'sw.js',
  'icon-192.png',
  'icon-192-maskable.png',
  'icon-512.png',
  'icon-512-maskable.png',
  'apple-touch-icon.png',
  'screenshot-wide.png',
  'screenshot-narrow.png',
  'widgets/pedidos.json',
  'bgd-samples/blob_background.jpg',
  'bgd-samples/block_background.jpg',
  'bgd-samples/blurry_background.jpg',
  'bgd-samples/code_background.jpg',
  'vov.min.css',
  'favicon.png',
  'favicon.ico',
  'dashboard-icon.png',
  'img-default/daletepido-logo-white-hq.png',
  'img-default/daletepido-logo-black-hq.png',
  'img-default/kiosco-julio.jpg',
  'img/banner1-bg.jpg',
  'img/banner2-bg.jpg',
  'img/kit-imprimible-mostrador.jpg',
  'img/kit-imprimible-vidriera.jpg',
  'img/jaime/jaime-pensando.png',
  'img/jaime/jaime-resolucion.png',
  'img/jaime/jaime-buenaonda.png',
  'img/jaime/jaime-alegria.png',
  'img/jaime/jaime-empatia.png',
  'img/jaime/jaime-mobile-pensando.png',
  'img/jaime/jaime-mobile-resolucion.png',
  'img/jaime/jaime-mobile-buenaonda.png',
  'img/jaime/jaime-mobile-alegria.png',
  'img/jaime/jaime-mobile-empatia.png',
  'videos/desarrollo/escena-01.webm',
  'videos/daletepido-motion/renders/daletepido_15s_promo.mp4',
  'videos/micro/bighouse-burger.mp4',
  'videos/micro/ferrenow-taladro.mp4',
  'videos/micro/kioscojulio-fernet.mp4',
  'videos/micro/noutacc-magsafe.mp4',
  'videos/micro/tecnomont-gpu.mp4',
  'videos/micro/biuti-blazer.mp4',
  'videos/micro/todolisto-resma.mp4',
  'videos/micro/lugonessilva-cemento.mp4',
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
  './Clickapp/Clickapp',
  './public'
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
