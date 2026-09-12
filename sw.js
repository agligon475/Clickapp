const CACHE_NAME = 'daletepido-v17';
const ASSETS_TO_CACHE = [
  '/',
  '/landing',
  '/landing.html',
  '/dashboard',
  '/dashboard.html',
  '/tienda',
  '/tienda.html',
  '/alta-usuario',
  '/alta-usuario.html',
  '/ayuda',
  '/ayuda.html',
  '/manifest.json',
  '/favicon.ico',
  '/favicon.png',
  '/apple-touch-icon.png',
  '/dashboard-icon.png',
  '/icon-192.png',
  '/icon-192-maskable.png',
  '/icon-512.png',
  '/icon-512-maskable.png',
  '/screenshot-wide.png',
  '/screenshot-narrow.png',
  '/widgets/pedidos.json'
];

// Instalación: cachear de manera resiliente cada recurso individual
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const asset of ASSETS_TO_CACHE) {
        try {
          const res = await fetch(asset, { cache: 'no-cache' });
          if (res && (res.status === 200 || res.type === 'opaque')) {
            await cache.put(asset, res);
          }
        } catch (err) {
          // Continuar con los demás recursos si uno falla
        }
      }
    })
  );
  self.skipWaiting();
});

// Activación: limpieza de cachés antiguas y control inmediato de clientes
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Manejo de peticiones (Fetch) con soporte offline garantizado
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (!url.protocol.startsWith('http')) return;
  if (url.pathname.startsWith('/api/')) return;

  // Manejo de navegación HTML (Dashboard, Tienda, Login)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const cacheCopy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cacheCopy));
          }
          return networkResponse;
        })
        .catch(async () => {
          // Fallback offline en orden de prioridad
          const cached = await caches.match(event.request);
          if (cached) return cached;

          const fallbacks = [
            '/dashboard.html',
            '/dashboard',
            '/alta-usuario.html',
            '/alta-usuario',
            '/landing.html',
            '/landing',
            '/'
          ];

          for (const fallback of fallbacks) {
            const match = await caches.match(fallback);
            if (match) return match;
          }

          return new Response(
            '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>DaleTePido — Modo Offline</title><style>body{background:#0A0A0C;color:#F0F0EC;font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;margin:0;padding:20px;text-align:center;}h1{color:#D72638;margin-bottom:8px;}p{color:#8E8E93;max-width:400px;line-height:1.5;}</style></head><body><h1>Modo sin conexión</h1><p>No se pudo conectar al servidor. Comprueba tu conexión a internet para continuar usando Dale! Te Pido.</p></body></html>',
            {
              status: 200,
              headers: { 'Content-Type': 'text/html; charset=utf-8' }
            }
          );
        })
    );
    return;
  }

  // Manejo de recursos estáticos (CSS, JS, imágenes, fuentes, JSON)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // En segundo plano revalidar caché si hay conexión
        fetch(url.href)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
            }
          })
          .catch(() => {});
        return cachedResponse;
      }

      return fetch(event.request).catch(() => Response.error());
    })
  );
});

// Soporte de Notificaciones Push
self.addEventListener('push', (event) => {
  const title = 'Dale! Te Pido';
  const options = {
    body: event.data ? event.data.text() : 'Nuevo pedido recibido en tu comercio',
    icon: '/icon-192.png',
    badge: '/icon-192.png'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// Clic en notificación push
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/dashboard.html'));
});

// Soporte de Background Sync API
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-orders' || event.tag === 'sync-data') {
    event.waitUntil(
      fetch('/api/auth', { method: 'GET' }).catch(() => {})
    );
  }
});

// Soporte de Periodic Background Sync API
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'get-latest-orders' || event.tag === 'periodic-sync') {
    event.waitUntil(
      fetch('/api/auth', { method: 'GET' }).catch(() => {})
    );
  }
});
