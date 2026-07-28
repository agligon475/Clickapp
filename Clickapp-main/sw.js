const CACHE_NAME = 'daletepido-v3';
const ASSETS_TO_CACHE = [
  '/',
  '/landing.html',
  '/dashboard.html',
  '/tienda.html',
  '/alta-usuario.html',
  '/ayuda.html',
  '/manifest.json',
  '/favicon.ico',
  '/dashboard-icon.png',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
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
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }
      return fetch(event.request).catch(() => caches.match('/dashboard.html'));
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
  event.waitUntil(clients.openWindow('/dashboard.html?view=orders'));
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
