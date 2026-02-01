const CACHE_NAME = 'sheild-v1';
const urlsToCache = [
  '/SHEILD/',
  '/SHEILD/index.html',
  '/SHEILD/logo.png'
];

// تنصيب الـ Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('فتح الكاش');
        return cache.addAll(urlsToCache);
      })
  );
});

// استراتيجية Cache First
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // لو موجود في الكاش رجعه، لو لأ روح للشبكة
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// تحديث الـ Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
