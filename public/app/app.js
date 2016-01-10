(function () {
	var app = angular.module('gorrionPoker', ['ngRoute', 'ui.bootstrap', 'ui.bootstrap.datetimepicker',
		 'isteven-multi-select', 'dndLists', 'chart.js']);

	app.config(['$routeProvider', '$locationProvider',
		function ($routeProvider, $locationProvider) {
			$routeProvider.
				when("/players", {
					templateUrl: "/templates/players.htm",
					controller: "playersController",
				}).
				when("/games", {
					templateUrl: "/templates/games.htm",
					controller: "gamesController",
				}).
				when("/games/add", {
					templateUrl: "/templates/addGame.htm",
					controller: "addGameController",
				}).
				otherwise({
					redirectTo: "/games"
				});

		}]);

})();