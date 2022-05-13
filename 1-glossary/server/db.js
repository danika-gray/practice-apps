const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/glossary');

const termSchema = new mongoose.Schema({
  name: String,
  definition: String,
  unique: Boolean // prevent duplicates by requiring the default _id to be unique
});

const Term = mongoose.model('Term', termSchema);

// put methods here to get data and post data
module.exports.findAll = () => {
  return Term.find({});
}

module.exports.findOne = (term) => {
  return Term.findOne({ name: term }); // verify later that it's findOne
}

module.exports.saveTerm = (data) => {
  // format data then save data
  let savedTerm = new Term({
    name: data.term,
    definition: data.definition,
    unique: true
  });
  return savedTerm.save();
}

module.exports.delete = (id) => {
  return Term.findByIdAndDelete(id);
}

module.exports.update(id, newData) {
  return Term.findByIdAndUpdate(id, {/** updated field(s): new values */});
}


module.exports.Term = Term;


