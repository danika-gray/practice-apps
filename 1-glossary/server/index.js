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
  database.findAll()
    .then((data) => {
      console.log(data, 'terms');
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send('error retrieving data');
    });
});

app.get('/terms/:termname', (req, res) => {
  console.log(req.params.termname, 'req.params.termname');
  let termname = req.params.termname;
  console.log(termname, 'termname');

  database.findOne(termname)
    .then((data) => {
      console.log(data, 'terms');
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send('error retrieving data');
    });
});

app.post('/terms', (req, res) => {
  console.log(req.body, 'req.body');
  let termObj = { term: req.body.term, definition: req.body.definition }
  console.log(termObj);

  database.saveTerm(termObj)
    .then(() => {
      console.log('success saving term');
      // return database.findOne(termObj.term) //'cat'
      res.status(201).send('term saved!');
    })
    // .then((data) => {
    //   console.log(data._id, 'data id in post');
    //   let newID = data._id.toString();
    //   console.log(newID, 'newID in post');
    //   res.status(201).send({newID: newID});
    // })
    .catch((err) => {
      console.log('error', err)
      res.status(500).send('error saving data');
    });
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
