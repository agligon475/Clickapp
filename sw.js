const CACHE_NAME = 'daletepido-v4';
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

  // Ignore non-http requests or API requests
  if (!event.request.url.startsWith('http')) return;
  if (event.request.url.includes('/api/')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Background revalidate
        fetch(event.request, { redirect: 'follow' }).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && !networkResponse.redirected) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }

      return fetch(event.request, { redirect: 'follow' }).catch(() => caches.match('/dashboard') || caches.match('/'));
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
