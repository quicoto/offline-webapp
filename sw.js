importScripts('source/js/vendor/not-in-build/cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       'html/homepage.html',
       'html/list.html',
       '/dist/css/offline-pack.css',
       '/dist/js/offline-pack-debug.js',
     ]);
   })
 );
});

/*
    This here is very important.
    It will check against the network first and if not available will go to the cache.
    https://jakearchibald.com/2014/offline-cookbook/
*/

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
