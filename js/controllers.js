gwSite
.controller('comicViewCtrl', function($scope, $stateParams, $http, preloader) {

	// Controller for comics pages and home page (latest comics page)

	// Retrieves the appropriate comic series based on the state parameters, defaulting to GW
	$scope.comic = !$stateParams.comic ? 'gw' : $stateParams.comic;

	var urlStr = 'json/'+$scope.comic+'.json';
	$http.get(urlStr).success(function(data) {

		$scope.page = !$stateParams.page ? data.length : $stateParams.page;

		// Retrieves dynamic page content
		// I made it dynamic so that the site can be used as a template, or host other types of content
		$scope.contentRows = data[$scope.page - 1].content;
		

		// Prepend the post date to appropriate text content
		var date = new Date(data[$scope.page - 1].date.year, data[$scope.page - 1].date.month-1, data[$scope.page - 1].date.day);
		var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
		var dateText = "<strong>Posted " + date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear() + "</strong>";

		for (var i = 0; i < $scope.contentRows.length; i++) {
			theRow = $scope.contentRows[i];
			if (theRow.type == "content-text" && theRow.showDate) {
				theRow.paragraphs.unshift({
					"text": dateText
				});
			}
		}

		// Unless the current page is the first, the previous page will be the current page - 1
		$scope.prevPage = $scope.page == 1 ? 1 : $scope.page - 1;

		// The last page should be equal to the number of objects in the data array
		$scope.lastPage = data.length;

		// Unless the current page is the first, the next page will be the current page + 1
		$scope.nextPage = $scope.page == data.length ? data.length : parseInt($scope.page) + 1;


		// Preload the images on the first, previous, current, next, and last pages
		// Not sure how well this works...
		var imagePages = [];

		// always preload the first page
		imagePages.push(data[0].content);
		
		// check what other pages need to be preloaded
		if ($scope.prevPage != 1) {
			imagePages.push(data[$scope.prevPage-1].content);
		}

		if ($scope.page != 1 && $scope.page != $scope.prevPage && $scope.page != $scope.nextPage && $scope.page != data.length) {
			imagePages.push(data[$scope.page-1].content);
		}

		imagePages.push(data[$scope.nextPage-1].content);

		if ($scope.nextPage != data.length) {
			imagePages.push(data[data.length-1].content);
		}

		// find the server location of all images that need preloading
		$scope.imageLocations = [];

		for (var i = 0; i < imagePages.length; i++) {
			var imagePage = imagePages[i];

			for (var j = 0; j < imagePage.length; j++) {
				var pageContent = imagePage[j];
				
				if (pageContent.type == "content-image") {
					$scope.imageLocations.push(pageContent.src);
				}
			}
		}

		// preload every image that needs preloading
		preloader.preloadImages($scope.imageLocations);
	});
})
.controller('comicDetailCtrl', function ($scope, $stateParams, $http, preloader) {

	// Retrieves the appropriate json comic chapter list based on state parameters
	$scope.comic = !$stateParams.comic ? 'gw' : $stateParams.comic;

	var urlStr = 'json/' + $scope.comic + 'Chapters.json';

	$http.get(urlStr).success(function(data) {

		$scope.chapters = data;
	});
})
.controller('comicCastCtrl', function ($scope, $stateParams, $http) {
	// Retrieves the appropriate json comic cast list based on state parameters
	$scope.comic = !$stateParams.comic ? 'gw' : $stateParams.comic;

	var urlStr = 'json/'+$scope.comic+'Cast.json';

	$http.get(urlStr).success(function(data) {

		$scope.groups = data;

		var chaptersUrl = 'json/'+$scope.comic+'Chapters.json';
		$http.get(chaptersUrl).success(function(chapterdata) {

			// displays every character in the cast list, sorted by group

			for (var i = 0; i < $scope.groups.length; i++) {
				var theGroup = $scope.groups[i].characters;

				for (var j = 0; j < theGroup.length; j++) {
					var firstAppearanceChapter = $scope.groups[i].characters[j].firstAppearance - 1;
					var firstAppearancePage = chapterdata[firstAppearanceChapter].coverpage;
					$scope.groups[i].characters[j].firstAppearancePage = firstAppearancePage;
					$scope.groups[i].characters[j].images = [];
					if ($scope.groups[i].characters[j].hasAlt) {
						$scope.groups[i].characters[j].images.push({name: $scope.groups[i].characters[j].shortName+'PortraitAlt'});
					}
					$scope.groups[i].characters[j].images.push({name: $scope.groups[i].characters[j].shortName+'Portrait'});
				}
			}
		});
	});
})
.controller('extrasFanartCtrl', function ($scope, $http) {

	// Retrieves the fanart json file
	var urlStr = 'json/fanart.json';

	$scope.galleryTitle = "Fanart Gallery";
	$scope.galleryName = 'fanart';

	$http.get(urlStr).success(function(data) {

		$scope.gallery = data;
	});
})
.controller('extrasHolidayCtrl', function ($scope, $http) {

	// Retrieves the holiday json file
	var urlStr = 'json/holiday.json';

	$scope.galleryTitle = "Holiday Gallery";
	$scope.galleryName = 'holiday';

	$http.get(urlStr).success(function(data) {

		$scope.gallery = data;
	});
})
.controller('extrasShippingCtrl', function($scope, $http) {

	// Retrieves the appropriate json comic chapter list based on state parameters
	var urlStr = 'json/gwCast.json';

	$http.get(urlStr).success(function(data) {
		$scope.characters = [];

		for (var i = 0; i < data.length; i++) {

			for (var j = 0; j < data[i].characters.length; j++) {
				data[i].characters[j]['group'] = data[i].groupName;
				$scope.characters.push(data[i].characters[j]);
			}
		}

		var charId1 = Math.floor((Math.random() * $scope.characters.length));
		var charId2 = Math.floor((Math.random() * $scope.characters.length));

		$scope.character1 = $scope.characters[charId1];
		$scope.character2 = $scope.characters[charId2];

		$scope.message = getShipNote($scope.character1, $scope.character2);
	});
});