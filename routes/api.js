var express = require('express');
var router = express.Router();
var db = require("../modules/db");

router.get('/players', function (req, res, next) {
	var dbPlayers = db.Player.find((err, players) => {
		if (err)
			res.status(500).json({ error: err.message, stack: err.stack });
		else
			res.json(players);
	});
});


router.post('/player', function (req, res, next) {
	var dbPlayer = new db.Player({
		nickName: req.body.nickName,
		emailAddress: req.body.emailAddress
	});

	dbPlayer.save((err, result) => {
		if (err)
			res.status(500).json({ error: err.message, stack: err.stack });
		else
			res.status(200).json({});
	});

});

router.post('/game', function (req, res, next) {
	var players = req.body.players;
	var date = req.body.datePlayed;
	
	var scoring	= getScoring(players.length);
	var matchPlayers = getMatchPlayers(players, scoring);

});

function getScoring(numOfPlayers) {
	if (numOfPlayers < 2)
		throw Error('Invalid number of players');

	var scorings = [
		[4],
		[4, 2],
		[4, 3, 1],
		[5, 3, 2],
		[6, 4, 2],
		[7, 4, 3],
		[8, 5, 3],
		[9, 5, 4],
		[10, 6, 4]
	];

	if (numOfPlayers > scorings.length) if (numOfPlayers > scorings.ength)
		numOfPlayers = scorings.length;

	return scorings[numOfPlayers - 2];
}

function getMatchPlayers(players, scoring){
	var games = [];
	
	for(var player in players){
		
	}
}

module.exports = router;
