var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/gorrionPoker");

var playerSchema = new mongoose.Schema();
playerSchema.add({
    nickName: String,
    emailAddress: String
});


var db = {
    Player: mongoose.model('Player', playerSchema),
    Game: mongoose.model('Game', {
        datePlayed: Date,
        players: [{ player: playerSchema, score: Number}]
    })
}

module.exports = db;