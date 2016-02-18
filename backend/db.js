var mongoose = require('mongoose');


var Schema = mongoose.Schema;
var Answer = new Schema({
  answer: Number,
  isCorrect: Boolean,
  created_at: Date
});

mongoose.model('answer', Answer);
mongoose.connect('mongodb://localhost:27017/guess-my-number');
