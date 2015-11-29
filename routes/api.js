var express = require('express');
var router = express.Router();
var db = require("../modules/db");

/* GET users. */
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

module.exports = router;
