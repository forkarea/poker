(function(){
	var app = angular.module("gorrionPoker");
	
	app.factory("players", function($http){
		function getPlayers(){
			return $http.get("/api/players")
				.then(function(response){
					return response.data;
				});
		};
		
		function addPlayer(player){
			return $http.post("/api/player", player);
		}
		
		return {
			players: getPlayers,
			addPlayer: addPlayer
		}
	});
})();