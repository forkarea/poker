(function () {
	var app = angular.module("gorrionPoker");

	app.factory("games", function ($http) {
		function addGame(players, datePlayed) {
			return $http.post("/api/game", { datePlayed: datePlayed, players: players });
		}

		function getGames(month, year) {
			return $http.get("/api/gamesCalendar", { params: { month: month, year: year } })
				.then(function (response) {
					return response.data;
				});
		}

		function getPlayerStatistics(idPlayer, month, year) {
			return $http.get("/api/graphData/" + year + "/" + month + "/" + idPlayer)
				.then(function (response) {
					return response.data;
				});
		}

		return {
			addGame: addGame,
			games: getGames,
			statistics: getPlayerStatistics
		}
	});
})();