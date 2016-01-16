(function () {
	var app = angular.module("gorrionPoker");

	app.controller("playersController", function ($scope, players, $modal, authenticationService) {
		function loadPlayers() {
			players.players().then(function (data) {
				$scope.players = data;
			});
		}
		
		$scope.isLogged = authenticationService.isLogged;

		$scope.addPlayer = function () {
			var modalInstance = $modal.open({
				templateUrl: "templates/addPlayer.htm",
				controller: "addPlayerController",
			});

			modalInstance.result.then(function () {
				loadPlayers();
			});
		}

		loadPlayers();
	});
})();