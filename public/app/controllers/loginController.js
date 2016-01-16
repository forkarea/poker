(function () {
	var app = angular.module("gorrionPoker");

	app.controller("loginController", function ($scope, $location, $window, userService, authenticationService) {
        $scope.logIn = function (username, password) {
            if (username !== undefined && password !== undefined) { 
                userService.logIn(username, password).success(function(data) {
                    authenticationService.isLogged = true;
                    $window.localStorage.token = data.token;
                    $location.path("/");
                }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
            }
        }
	});
	
})();