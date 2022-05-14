require("dotenv").config();
const express = require("express");
const path = require("path");
const database = require("./db.js")
console.log(database, 'database');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get('/terms', (req, res) => {
  console.log('here in top app.get');
  database.findAll()
    .then((data) => {
      //console.log(data, 'terms');
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send('error retrieving data');
    });
});

app.get('/term/:termname', (req, res) => {
  let termname = req.params.termname;

  database.findOne(termname)
    .then((data) => {
      console.log(data, 'term');
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send('error retrieving data');
    });
});

app.get('/terms/?search=:text', (req, res) => {
  //console.log(req.params.text);
  let search = req.params.text;

  database.search(search)
    .then((data) => {
      //console.log(data, 'term(s) from search');
      let searchResult = data[0].concat(data[1]);
      //console.log(searchResult, 'data after concat');
      res.status(200).send(searchResult);
    })
    .catch((err) => {s
      res.status(500).send('error retrieving data');
    });
});

app.post('/terms', (req, res) => {
  //console.log(req.body, 'req.body');
  let termObj = { term: req.body.term, definition: req.body.definition }
  //console.log(termObj);

  database.findOne(termObj.term)
    .then((term) => {
      console.log(term, 'term');
      if (term === null) {
        console.log('term not found, term=', term);
        return database.saveTerm(termObj);
      } else {
        res.status(500).send('already saved term');
      }
    })
    .then(() => {
      //console.log('success saving term');
      // return database.findOne(termObj.term) //'cat'
      res.status(201).send('term saved!');
    })
    .catch((err) => {
      //console.log('error', err)
      res.status(500).send('error saving data');
    });
});

// app.delete()
// app.put()

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
