(function () {
	var app = angular.module("gorrionPoker");

	app.controller("mainController", function ($scope, $location) {

		$scope.isActive = function (href) {
			return $location.url() == href ? "active" : "";
		}

		$scope.isCollapsed = true;
	});
})();