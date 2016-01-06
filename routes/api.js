var express = require('express');
var router = express.Router();
var db = require("../modules/db");
var helpers = require("../modules/helpers");

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

	var scoring = helpers.getScoring(players.length);
	
	var matchPlayers = [];
	for (var i = 0; i < players.length; i++) {
		matchPlayers.push({
			player: players[i],
			score: i < scoring.length ? scoring[i] : -2
		});
	}
	
	var game = new db.Game({
		datePlayed:  req.body.datePlayed,
		players: matchPlayers
	});
	
	game.save((err, result) => {
		if (err)
			res.status(500).json({ error: err.message, stack: err.stack });
		else
			res.status(200).json({});
	});
});

router.get('/gamesCalendar',function (req, res, next) {
	var date = new Date();	
	
	var games = db.Game.where('datePlayed').gte()
});


module.exports = router;
