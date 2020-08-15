const CACHE_NAME = "static";
const urlsToCache = [
  '/',
  'index.html',
  '/favicon.ico',
                      '/static/css/2.ed7b5974.chunk.css',
                      '/static/css/main.16e04ad9.chunk.css',
                    '/static/js/2.19b408b1.chunk.js',
                    '/static/js/main.f06d25f7.chunk.js',
                    '/static/js/main.7be08d8d.chunk.js',
                    '/static/js/runtime-main.15334abf.js',
                    'https://opentdb.com/api.php?amount=10&category=18&type=multiple&difficulty=easy'];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');

                return cache.addAll(urlsToCache);
            })
    )
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
