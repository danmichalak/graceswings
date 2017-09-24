gwSite
.directive('contentRow', function($compile) {
	return {
		restrict: 'A',
		template:'<ng-include src="template"/>',
		link: function(scope, element) {
			scope.template = 'templates/' + scope.contentRow.type + '.html';
			$compile(element.contents())(scope);
		}
	};
});