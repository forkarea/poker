var express = require('express');
var jwt = require("jsonwebtoken");
var router = express.Router();
var db = require("../modules/db");
var helpers = require("../modules/helpers");
var _ = require('underscore')._;

router.post('/authenticate', function (req, res) {
	var username = req.body.username || '';
    var password = req.body.password || '';

    if (username == '' || password == '') {
        return res.send(401);
    }

	if (username == "admin" && password == "123456") {
		var token = jwt.sign(username, 'secretToken', { expiresInMinutes: 6000 });

		return res.json({ token: token });
	}
	else
		return res.send(401);

});

router.get('/players', function (req, res, next) {
	db.Player.find((err, players) => {
		if (err)
			res.status(500).json({ error: err.message, stack: err.stack });
		else
			res.json(players);
	});
});


router.post('/player', function (req, res, next) {
	if (jwt.verify(req.header('Authorization'), 'secretToken') != 'admin')
		return res.send(401);

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
	if (jwt.verify(req.header('Authorization'), 'secretToken') != 'admin')
		return res.send(401);
		
	var players = req.body.players;

	var scoring = helpers.getScoring(players.length);

	var matchPlayers = [];
	for (var i = 0; i < players.length; i++) {
		matchPlayers.push({
			player: players[i],
			score: i < scoring.length ? scoring[i] - 2 : -2
		});
	}

	var game = new db.Game({
		datePlayed: req.body.datePlayed,
		players: matchPlayers
	});

	game.save((err, result) => {
		if (err)
			res.status(500).json({ error: err.message, stack: err.stack });
		else
			res.status(200).json({});
	});
});

router.get('/gamesCalendar', function (req, res, next) {
	var currentDate = new Date(),
		month = req.query.month ? req.query.month : currentDate.getMonth(),
		year = req.query.year ? req.query.year : currentDate.getFullYear();

	var boundaries = helpers.getMonthBoundaryDates(month, year);

	var games = db.Game.where('datePlayed').gte(boundaries.startDate)
					   .where('datePlayed').lt(boundaries.endDate);

	games.exec((err, games) => {
		if (err)
			res.status(500).json({ error: err.message, stack: err.stack });
		else {
			res.status(200).json(_.sortBy(games, 'datePlayed'));
		}
	});
});

router.get('/graphData/:year/:month/:idPlayer', function (req, res, next) {
	var currentDate = new Date(),
		month = req.params.month ? req.params.month : currentDate.getMonth(),
		year = req.params.year ? req.params.year : currentDate.getFullYear(),
		idPlayer = req.params.idPlayer;

	var boundaries = helpers.getMonthBoundaryDates(month, year);

	var games = db.Game.where('datePlayed').gte(boundaries.startDate)
					   .where('datePlayed').lt(boundaries.endDate);

	games.exec((err, games) => {
		if (err)
			res.status(500).json({ error: err.message, stack: err.stack });
		else {
			var playerGames = [];
			_.each(games, (game) => {
				playerGames.push(game.players);
			});
			var playerScores = _.filter(_.flatten(playerGames), function (playerGame) { return playerGame.player._id.toString() == idPlayer });

			var score = 100;

			var graphData = [score];
			var graphLabels = [0]
			for (var i = 0; i < playerScores.length; i++) {
				score += playerScores[i].score;
				graphData.push(score);
				graphLabels.push(i + 1);
			}

			res.status(200).json({ data: [graphData], labels: graphLabels });
		}
	});
});


module.exports = router;
