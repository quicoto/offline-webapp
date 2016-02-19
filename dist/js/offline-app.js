var XXX = XXX || {};

XXX.components = $.extend(XXX.components, {

    "component1": (function() {
        var $that = this;

        this._init = function($scope) {
            // Do something
        }, // init

        this._otherFuncion = function() {
            // Do something else
        }; // _otherFuncion

        return {
			init: $that._init,
            otherFunction: $that._otherFunction,
		};
    })()

}); // END of components

$(document).ready(function() {
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
});
