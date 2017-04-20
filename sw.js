var CACHE_NAME = 'v47';

var urlsToCache = [
    '/html/homepage.html',
    '/html/list.html',
    '/dist/css/offline-pack.css',
    '/dist/js/offline-pack.js',
    '/dist/img/kitten.jpg',
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log(CACHE_NAME);
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );

	/*
		Don't wait until the user has left the page to update his service worker. Do it when he goes to any of your site's page.
	*/
    event.waitUntil(self.skipWaiting());
});

/*
	Check for Cache first if it matches. If not, go network.
*/
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});

/*
	This is very important.
	We need to clean old caches, otherwise we keep getting the old assets over and over.
*/

self.addEventListener('activate', function(event) {

    var cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('deleting cache');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
