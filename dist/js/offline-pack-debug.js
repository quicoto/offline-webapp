var DEBUG = true; // only for debug!!!


// Install - This file will be cached by Service Worker

if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
		navigator.serviceWorker.register('/sw.js').then(function(registration) {
			// Registration was successful
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
		}, function(err) {
			// registration failed :(
			console.log('ServiceWorker registration failed: ', err);
		});
	});
}

// Update the online status icon based on connectivity
window.addEventListener('online',  function() {
	console.log("We're online baby!");

	var alert = document.getElementsByClassName("alert")[0];
	alert.innerHTML = "We're back online baby!";
	alert.className = "alert-success alert text-center";
});
window.addEventListener('offline', function() {
	console.log("We're offline <- Insert sad face here");

	var alert = document.getElementsByClassName("alert")[0];

	var message = "It appears you've gone offline. ";

	if ('serviceWorker' in navigator) {
		message += "We've cached some pages for you to keep surfing!";
	} else {
		message += "Sadly your shitty browser doesn't support offline caching :(";
	}

	alert.innerHTML = message;

	alert.className = "alert-danger alert text-center";
});

$(function() {
	$.ajax("../../mocks/api.json")
	.done(function(data) {
		console.log("Mocks loaded");

		var newPosts = '<ul>';
		data.posts.forEach(function(element) {
		    newPosts += "<li>" + element.title + "</li>";
		});
		newPosts += '</ul>';

		$('#posts').html(newPosts);
	})
	.fail(function() {
		console.log("error loading Mocks");
		$('#posts').addClass('well text-danger').html("We could not load the posts, you're offline");
	});
});
