(function(){
	var app = angular.module("gorrionPoker");
	
	app.factory("games", function($http){
		function addGame(players, datePlayed){
			return $http.post("/api/game", players, datePlayed);
		}
		
		return {
			addGame: addGame
		}
	});
})();