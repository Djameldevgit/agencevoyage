// sw.js - Service Worker optimizado para producción
const CACHE_NAME = 'agence-voyage-v2.0';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/icon-web-01.png'
];

// Instalación
self.addEventListener('install', (event) => {
  console.log('🚀 Service Worker instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Cache abierto');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activación
self.addEventListener('activate', (event) => {
  console.log('🎯 Service Worker activado');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Eliminando cache antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - Estrategia Cache First con fallback a Network
self.addEventListener('fetch', (event) => {
  // Skip para requests que no son GET
  if (event.request.method !== 'GET') return;

  // Para rutas de la API, usar Network First
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Para recursos estáticos, usar Cache First
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Devuelve del cache si existe
        if (response) {
          return response;
        }

        // Si no está en cache, busca en network
        return fetch(event.request)
          .then((response) => {
            // Verifica que la respuesta sea válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clona la respuesta para guardarla en cache
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Fallback para páginas SPA
            if (event.request.destination === 'document') {
              return caches.match('/');
            }
            return new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});