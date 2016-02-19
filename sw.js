importScripts('source/js/vendor/not-in-build/cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('my-offline-webapp').then(function(cache) {
     return cache.addAll([
       '/offline-webapp/html/homepage.html',
       '/offline-webapp/html/list.html',
       '/offline-webapp/dist/css/offline-pack.css',
       '/offline-webapp/dist/js/offline-pack-debug.js',
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
        fetch(event.request).catch(function(urls) {
            return caches.match(event.request);
        })
    );
});


/*
    If we want to check the cache first:

    self.addEventListener('fetch', function(event) {
        console.log(event.request.url);
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request);
            })
        );
    });

*/
