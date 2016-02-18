var express = require('express');
var mongoose = require('mongoose');
var Answer = mongoose.model('answer');

var app = module.exports = express.Router();


app.post('/api/answer', function(req, res) {
    var answer = new Answer();
    answer.isCorrect =  true;
    answer.answer = 33;
    answer.created_at = new Date();
    answer.save(function () {
        res.status(200).send(req.body);
    });

});
