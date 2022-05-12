const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/glossary');

const termSchema = new mongoose.Schema({
  name: String,
  definition: String,
  unique: true // prevent duplicates by requiring the default _id to be unique
});

const Term = mongoose.model('Term', termSchema);

module.exports.Term = Term;


