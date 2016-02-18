$(document).ready(function() {
    document.querySelector('.cache-article').addEventListener('click', function(event) {
      event.preventDefault();

      console.log('Caching third page!');
      var URLS = ['/html/third-page.html'];

      caches.open('my-offline-webapp').then(function(cache) {
        fetch('/html/third-page.html').then(function() {
          cache.addAll(URLS);
        });
      });
    });
});
