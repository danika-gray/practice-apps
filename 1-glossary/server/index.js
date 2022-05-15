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

// get all terms when component mounts
app.get('/terms', (req, res) => {
  console.log('here in top app.get');
  database.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send('error retrieving data');
    });
});

// get one term after posting to db
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

// get terms based on search input
app.get('/terms/?search=:text', (req, res) => {
  let search = req.params.text;

  database.search(search)
    .then((data) => {
      let searchResult = data[0].concat(data[1]);
      res.status(200).send(searchResult);
    })
    .catch((err) => {s
      res.status(500).send('error retrieving data');
    });
});

// post new term
app.post('/terms', (req, res) => {
  let termObj = { term: req.body.term, definition: req.body.definition }
  database.findOne(termObj.term)
    .then((term) => {
      console.log(term, 'term');
      if (term === null) {
        return database.saveTerm(termObj);
      } else {
        res.status(500).send('already saved term');
      }
    })
    .then(() => {
      res.status(201).send('term saved!');
    })
    .catch((err) => {
      res.status(500).send('error saving data');
    });
});

app.delete('/terms/:id', (req, res) => {
  console.log('made it to delete');
  console.log(req.params.id, 'req.params.id');

  database.delete(req.params.id)
    .then(() => {
      return database.findById(req.params.id);
    })
    .then((result) => {
      if (result === null) {
        res.status(200).send('term deleted');
      } else {
        throw err;
      }
    })
    .catch((err) => {
      res.status(500).send('error deleting data');
    })
});

app.put('/terms/:id', (req, res) => {
  console.log('here in app.put');
  console.log(req.params.id, 'req.params.id in put');
  console.log(req.body, 'req.body in put');

  database.update(req.params.id, {name: req.body.name, definition: req.body.definition})
    .then(() => {
      console.log('editing successful');
      res.status(200).send('edited data');
    })
    .catch((err) => {
      res.status(500).send('error updating data');
    })
})

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
