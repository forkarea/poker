(function () {
	var app = angular.module("gorrionPoker");

	app.controller("gamesController", function ($scope, games, players, authenticationService) {
		$scope.playersScores = {};
		$scope.playerStats = {};

		$scope.isLogged = authenticationService.isLogged;

		function init() {
			var currentDate = new Date();
			$scope.month = currentDate.getMonth();
			$scope.year = currentDate.getFullYear();

			$scope.months = [
				{ value: 0, label: 'Styczeń' },
				{ value: 1, label: 'Luty' },
				{ value: 2, label: 'Marzec' },
				{ value: 3, label: 'Kwiecień' },
				{ value: 4, label: 'Maj' },
				{ value: 5, label: 'Czerwiec' },
				{ value: 6, label: 'Lipiec' },
				{ value: 7, label: 'Sierpień' },
				{ value: 8, label: 'Grudzień' },
				{ value: 9, label: 'Październik' },
				{ value: 10, label: 'Listopad' },
				{ value: 11, label: 'Grudźień' },
			];

			$scope.years = [];
			for (var i = $scope.year - 2; i <= $scope.year; i++) {
				$scope.years.push(i);
			}

			players.players().then(function (data) {
				$scope.players = data;
			});
		}

		$scope.getGames = function (month, year) {
			games.games(month, year).then(function (data) {
				$scope.games = data;

				calculatePlayerScores();
				$scope.idPlayer = '';
			});
		}

		$scope.getPlayerScore = function (game, idPlayer) {
			for (var i = 0; i < game.players.length; i++) {
				if (game.players[i].player._id == idPlayer)
					return game.players[i].score;
			}

			return "-";
		}

		$scope.getPlayerStatistics = function (idPlayer, month, year) {
			games.statistics(idPlayer, month, year).then(function (data) {
				$scope.playerStats = {
					labels: data.labels,
					data: data.data
				};
			});
		}

		$scope.getEligiblePlayers = function (players, playerScores) {
			var eligiblePlayers = [];
			for (var id in playerScores) {
				if (playerScores[id].gamesPlayed >= 10)
					eligiblePlayers.push({
						score: playerScores[id].score,
						gamesPlayed: playerScores[id].gamesPlayed,
						nickName: getPlayer(players, id).nickName
					});
			}

			return eligiblePlayers.sort(function (a, b) {
				return a.score > b.score ? -1 : a.score == b.score ? a.gamesPlayed < b.gamesPlayed : 1;
			});
		}

		function getPlayer(players, id) {
			for (var i = 0; i < players.length; i++) {
				if (players[i]._id == id)
					return players[i];
			}
		}

		function calculatePlayerScores() {
			for (var i = 0; i < $scope.players.length; i++) {
				$scope.playersScores[$scope.players[i]._id] = {
					score: 100,
					gamesPlayed: 0
				};
			}

			var games = $scope.games;
			for (var i = 0; i < games.length; i++) {
				var game = games[i];
				for (var j = 0; j < game.players.length; j++) {
					var playerScore = game.players[j];
					$scope.playersScores[playerScore.player._id].score += playerScore.score;
					$scope.playersScores[playerScore.player._id].gamesPlayed++;
				}
			}

			$scope.eligiblePlayers = $scope.getEligiblePlayers($scope.players, $scope.playersScores);
		}


		init();
		$scope.getGames();
	});
})();