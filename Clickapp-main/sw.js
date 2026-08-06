const CACHE_NAME = 'daletepido-v7';
const ASSETS_TO_CACHE = [
  '/',
  '/landing',
  '/dashboard',
  '/tienda',
  '/alta-usuario',
  '/ayuda',
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
  '/screenshot-narrow.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {});
    })
  );
  self.skipWaiting();
});

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

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (!url.protocol.startsWith('http')) return;
  if (url.pathname.startsWith('/api/')) return;

  // Manejo especial de navegación (HTML)
  if (event.request.mode === 'navigate') {
    // Si la URL solicitada incluye la extensión .html (ej: /dashboard.html?store=...), redirigir a la Clean URL
    if (url.pathname.endsWith('.html')) {
      const cleanPath = url.pathname.replace(/\.html$/, '');
      const cleanUrl = cleanPath + url.search + url.hash;
      event.respondWith(Response.redirect(cleanUrl, 302));
      return;
    }

    // Intentar responder desde cache o red para navegación limpia
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request).catch(() => caches.match('/dashboard') || caches.match('/'));
      })
    );
    return;
  }

  // Manejo de recursos estáticos (CSS, JS, imágenes)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        fetch(url.href).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && !networkResponse.redirected) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }

      return fetch(url.href).catch(() => Response.error());
    })
  );
});

// Push notification support
self.addEventListener('push', (event) => {
  const title = 'Dale! Te Pido';
  const options = {
    body: event.data ? event.data.text() : 'Nuevo pedido recibido en tu comercio',
    icon: '/icon-192.png',
    badge: '/icon-192.png'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/dashboard'));
});

// Background Sync API support for PWABuilder
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-orders' || event.tag === 'sync-data') {
    event.waitUntil(
      fetch('/api/auth', { method: 'GET' }).catch(() => {})
    );
  }
});

// Periodic Background Sync API support for PWABuilder
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'get-latest-orders' || event.tag === 'periodic-sync') {
    event.waitUntil(
      fetch('/api/auth', { method: 'GET' }).catch(() => {})
    );
  }
});
