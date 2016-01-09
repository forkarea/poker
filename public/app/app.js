(function () {
	var app = angular.module('gorrionPoker', ['ngRoute', 'ui.bootstrap', 'ui.bootstrap.datetimepicker']);

	app.config(['$routeProvider', '$locationProvider',
		function ($routeProvider, $locationProvider) {
			$routeProvider.
				when("", {
					templateUrl: "/templates/homeView.htm",
					controller: "homeController",
				}).
				when("/players", {
					templateUrl: "/templates/players.htm",
					controller: "playersController",
				}).
				when("/games/add", {
					templateUrl: "/templates/addGame.htm",
					controller: "addGameController",
				}).
				otherwise({
					redirectTo: ""
				});

		}]);

	// app.run(['$rootScope', function ($rootScope) {
	// 	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
	// 		$rootScope.title = current.$$route.title;
	// 	});
	// }]);
})();