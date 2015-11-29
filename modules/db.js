var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/gorrionPoker");

var db = {
    Player: mongoose.model('Player', {
        nickName: String,
        emailAddress: String,
    })
}

module.exports = db;