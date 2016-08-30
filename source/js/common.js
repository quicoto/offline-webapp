// Install - This file will be cached by Service Worker

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', {
        scope: '/'
    }).then(function(reg) {
        // registration worked
        console.log('Registration succeeded. Scope is ' + reg.scope + ' Version: ' + CACHE_VERSION);
    }).catch(function(error) {
        // registration failed
        console.log('Registration failed with ' + error);
    });
} // END if browser can handle Service Workers


$(document).ready(function() {
    if( $('.cache-article').length ){
        document.querySelector('.cache-article').addEventListener('click', function(event) {
          event.preventDefault();

          console.log('Caching third page!');
          var URLS = ['/html/third-page.html'];

          caches.open('my-offline-webapp').then(function(cache) {
            fetch('html/third-page.html').then(function() {
              cache.addAll(URLS);
            });
          });
        });
    }
});
