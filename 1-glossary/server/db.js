const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/glossary');

const termSchema = new mongoose.Schema({
  name: String,
  definition: String,
  unique: Boolean // prevent duplicates by requiring the default _id to be unique
});

const Term = mongoose.model('Term', termSchema);

module.exports.findAll = () => {
  return Term.find({});
}

module.exports.findOne = (term) => {
  return Term.findOne({ name: term }); // verify later that it's findOne
}

module.exports.search = (text) => {
  console.log(text, 'text in search');
  return Promise.all([
    Term.find({ name: { $regex: text, $options: "i"}}), Term.find({ definition: { $regex: text, $options: "i"}})
  ]);
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
  console.log(id, 'id in delete');
  return Term.findByIdAndDelete(id);
}

module.exports.findById = (id) => {
  console.log(id, 'id in findById');
  return Term.findById(id);
}

module.exports.update = (id, newData) => {
  console.log(newData, 'newData in update');
  return Term.findByIdAndUpdate(id, newData);
}

module.exports.Term = Term;


