(function () {
	var app = angular.module("gorrionPoker");

	app.controller("addGameController", function ($scope, $location, players, games) {
		$scope.translations = {
			selectAll: "Zaznacz wszystko",
			selectNone: "Odznacz wszystko",
			reset: "Czyść",
			search: "Wyszukaj",
			nothingSelected: "Nic nie wybrano"
		}

		$scope.saveGame = function(selectedPlayers, datePlayed) {
			if (!datePlayed || !selectedPlayers || !selectedPlayers.length) {
				return;
			}

			games.addGame(selectedPlayers, datePlayed).then(function(response){
				$location.path("#/games");
			});
			
		}
		
		function loadPlayers() {
			players.players().then(function (data) {
				$scope.players = data;
			});
		}

		loadPlayers();
	});
})();