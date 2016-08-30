var CACHE_VERSION = 'v22';


this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_VERSION).then(function(cache) {
            return cache.addAll([
                '/html/homepage.html',
                '/html/list.html',
                '/dist/css/offline-pack.css',
                '/dist/js/offline-pack.js',
                '/dist/img/kitten.jpg',
            ]);
        })
    );

    event.waitUntil(self.skipWaiting());
});

/*
	Check first against the network and if not, cache
*/
// this.addEventListener('fetch', function(event) {
//     event.respondWith(
//         fetch(event.request).catch(function(urls) {
//             return caches.match(event.request);
//         })
//     );
// });

this.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(resp) {
            return resp || fetch(event.request).then(function(response) {
                return caches.open(CACHE_VERSION).then(function(cache) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
});
