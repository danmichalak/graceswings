var gwSite = angular.module('gwSite', ['ui.router', 'ui.router.stateHelper', 'ngAdsense', 'ngSanitize']);

gwSite.config(function($stateProvider, $urlRouterProvider) {

	// Currently all borked URLs re-route to the latest gw page
	// Add a 404 page later?
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home', {
		url: '/',
		views: {
			'header': { templateUrl: "templates/site-nav.html" },
			'main': {
				templateUrl: "templates/comic-view.html",
				controller: "comicViewCtrl"
			},
			'lower': { templateUrl: "templates/lower.html" },
			'footer': { templateUrl: "templates/footer.html" }
		}
	})
	.state('comicarchive', {
		url: '/comics/:comic',
		views: {
			'header': { templateUrl: "templates/site-nav.html" },
			'main': {
				templateUrl: "templates/comic-detail.html",
				controller: "comicDetailCtrl"
			},
			'lower': { templateUrl: "templates/lower.html" },
			'footer': { templateUrl: "templates/footer.html" }
		}
	})
	.state('comicpage', {
		url: '/comics/:comic/:page',
		views: {
			'header': { templateUrl: "templates/site-nav.html" },
			'main': {
				templateUrl: "templates/comic-view.html",
				controller: "comicViewCtrl"
			},
			'lower': { templateUrl: "templates/lower.html" },
			'footer': { templateUrl: "templates/footer.html" }
		}
	})
	.state('cast', {
		url: '/cast/:comic',
		views: {
			'header': { templateUrl: "templates/site-nav.html" },
			'main': {
				templateUrl: "templates/cast.html",
				controller: "comicCastCtrl"
			},
			'lower': { templateUrl: "templates/lower.html" },
			'footer': { templateUrl: "templates/footer.html" }
		}
	})
	.state('about', {
		url: '/about',
		views: {
			'header': { templateUrl: "templates/site-nav.html" },
			'main': { templateUrl: "templates/about.html" },
			'lower': { templateUrl: "templates/lower.html" },
			'footer': { templateUrl: "templates/footer.html" }
		}
	})
	.state('extras', {
		url: '/extras',
		views: {
			'header': { templateUrl: "templates/site-nav.html" },
			'main': { templateUrl: "templates/extras.html" },
			'lower': { templateUrl: "templates/lower.html" },
			'footer': { templateUrl: "templates/footer.html" }
		}
	})
	.state('extras.fanart', {
		url: '/fanart',
		views: {
			'extras': {
				templateUrl: "templates/extras.gallery.html",
				controller: "extrasFanartCtrl"
			}
		}
	})
	.state('extras.holiday', {
		url: '/holiday',
		views: {
			'extras': {
				templateUrl: "templates/extras.gallery.html",
				controller: "extrasHolidayCtrl"
			}
		}
	})
	.state('extras.shipping', {
		url: '/shipping',
		views: {
			'extras': {
				templateUrl: "templates/extras.shipping.html",
				controller: "extrasShippingCtrl"
			}
		}
	})
})
.run(function ($rootScope, AdsenseTracker, $window){
	$rootScope.$on('$stateChangeStart',  function(event, toState, toParams, fromState, fromParams, options){ 
		var script = document.querySelector('[src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]');
		window.adsbygoogle = null;

		if (script) {
			script.parentNode.removeChild(script);
			AdsenseTracker.isLoaded = false;
		}

		Object.keys($window).filter(function(k) { return k.indexOf('google') >= 0 }).forEach(
	       function(key) {
	         	delete($window[key]);
	       }
	   );
	});
	$rootScope.$on('$stateChangeSuccess', function() {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	});
});