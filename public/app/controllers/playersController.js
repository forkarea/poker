(function () {
	var app = angular.module("gorrionPoker");

	app.controller("playersController", function ($scope, players, $modal) {
		function loadPlayers() {
			players.players().then(function (data) {
				$scope.players = data;
			});
		}

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