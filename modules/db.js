var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/gorrionPoker");

var playerSchema = new mongoose.Schema();
playerSchema.add({
    nickName: String,
    emailAddress: String
});


var db = {
    Player: mongoose.model('Player', playerSchema),
    GamePlayer: mongoose.model('GamePlayer', {
        
    })
}

module.exports = db;