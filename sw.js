const CACHE_NAME = 'daletepido-v5';
const ASSETS_TO_CACHE = [
  '/',
  '/landing',
  '/dashboard',
  '/tienda',
  '/alta-usuario',
  '/ayuda',
  '/manifest.json',
  '/favicon.ico',
  '/dashboard-icon.png',
  '/icon-192.png',
  '/icon-512.png'
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

  const requestUrl = event.request.url;
  if (!requestUrl.startsWith('http')) return;
  if (requestUrl.includes('/api/')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Revalidación en segundo plano usando la URL directa
        fetch(requestUrl).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && !networkResponse.redirected) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }

      // Petición a red pasando la string URL para permitir seguimiento automático de redirecciones (301/308)
      return fetch(requestUrl).catch(() => caches.match('/dashboard') || caches.match('/'));
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
