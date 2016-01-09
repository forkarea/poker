(function () {
	var app = angular.module("gorrionPoker");

	app.controller("addGameController", function ($scope, players, games) {
		function loadPlayers() {
			players.players().then(function (data) {
				$scope.players = data;
			});
		}

		loadPlayers();
	});
})();