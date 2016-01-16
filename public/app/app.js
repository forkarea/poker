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
					access: { requiredLogin: true }
				}).
				when('/admin/login', {
					templateUrl: '/templates/login.htm',
					controller: 'loginController',
				}).
				otherwise({
					redirectTo: "/games"
				});

		}]);

	app.factory('TokenInterceptor', function ($q, $window, $location, authenticationService) {
		return {
			request: function (config) {
				config.headers = config.headers || {};
				if ($window.localStorage.token) {
					config.headers.Authorization = $window.localStorage.token;
				}
				return config;
			},

			requestError: function (rejection) {
				return $q.reject(rejection);
			},
 
			/* Set Authentication.isAuthenticated to true if 200 received */
			response: function (response) {
				if (response != null && response.status == 200 && $window.localStorage.token && !authenticationService.isLogged) {
					authenticationService.isLogged = true;
				}
				return response || $q.when(response);
			},
 
			/* Revoke client authentication if 401 is received */
			responseError: function (rejection) {
				if (rejection != null && rejection.status === 401 && ($window.localStorage.token || authenticationService.isLogged)) {
					delete $window.localStorage.token;
					authenticationService.isLogged = false;
					$location.path("/admin/login");
				}

				return $q.reject(rejection);
			}
		};
	});

	app.config(function ($httpProvider) {
		$httpProvider.interceptors.push('TokenInterceptor');
	});

	app.run(function ($rootScope, $location, authenticationService) {
		$rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
			if (nextRoute.access && nextRoute.access.requiredLogin && !authenticationService.isLogged) {
				$location.path("/admin/login");
			}
		});
	});

})();