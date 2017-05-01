var CACHE_NAME = 'app-cache-v1';
var urls = [
  '/',
  '/dist/main.css',
  '/dist/all.js',
  '/manifest.json',
  '/launcher-icon-192.png',
  '/launcher-icon.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(precache());
});

self.addEventListener('fetch', function(e) {
  e.respondWith(fromCache(e.request));

  e.waitUntil(update(e.request));
});

function precache() {
  return caches.open(CACHE_NAME).then(function(cache) {
    return cache.addAll(urls);
  });
}

function fromCache(request) {
  return caches.open(CACHE_NAME).then(function(cache) {
    return cache.match(request).then(function(matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function update(request) {
  return caches.open(CACHE_NAME).then(function(cache) {
    return fetch(request).then(function(response) {
      return cache.put(request, response);
    });
  });
}
