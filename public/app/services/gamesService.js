(function () {
	var app = angular.module("gorrionPoker");

	app.factory("games", function ($http) {
		function addGame(players, datePlayed) {
			return $http.post("/api/game", { datePlayed: datePlayed, players: players });
		}

		function games(month, year) {
			return $http.get("/api/gamesCalendar", { params: { month: month, year: year } })
				.then(function (response) {
					return response.data;
				});
		}

		return {
			addGame: addGame,
			games: games
		}
	});
})();