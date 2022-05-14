require("dotenv").config();
const express = require("express");
const path = require("path");
const sessionHandler = require("./middleware/session-handler");
const logger = require("./middleware/logger");

// Establishes connection to the database on server start
const db = require("./db");

const app = express();

// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);

// Logs the time, session_id, method, and url of incoming requests.
app.use(logger);

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.post('/checkout/form1', (req, res) => {
  console.log(req.body, 'req.body'); // expect checkout form1 data
  // avoid duplicates
  db.queryAsync('SELECT * FROM responses WHERE name=?;', [req.body.name])
    .then((data) => {
      if (req.body.name === data.name && req.body.password === data.password) {
        console.log('data already in db');
        res.status(201).send('data saved');
      } else {
        console.log('data not already in db');
        return db.queryAsync('INSERT INTO responses(name, email, password) VALUES (?, ?, ?);', [req.body.name, req.body.email, req.body.password])
      }
    })
    .then(() => {
      console.log('success adding values to db');
      return db.queryAsync('SELECT id FROM responses WHERE name=?', [req.body.name]);
    })
    .then((id) => {
      (console.log('success getting id!'));
      console.log(id[0], 'id[0]');
      console.log(id[0][0], 'id?');
      res.status(201).send(id[0][0]);
    })
    .catch((err) => {
      console.log('err', err);
      res.status(500).send('post failed');
    })
})

app.patch('/checkout/form2', (req, res) => {
  console.log(req.body, 'req.body'); // expect checkout form2 data
  let id = req.body.id.toString();
  let queryString = 'UPDATE responses SET addressline1=?, addressline2=?, city=?, state=?, zip=?, phone=? WHERE id=?;';
  db.queryAsync(queryString, [req.body.line1, req.body.line2, req.body.city, req.body.state, req.body.zip, req.body.phone, id])
    .then(() => {
      res.status(201).send('data saved');
    })
    .catch((err) => {
      console.log('err', err);
      res.status(500).send('post failed');
    })
})

app.patch('/checkout/form3', (req, res) => {
  console.log(req.body, 'req.body'); // expect checkout form1 data
  let queryString = 'UPDATE responses SET creditCardNum=?, expDate=?, CVV=?, billingZip=? WHERE id=?;';
  db.queryAsync(queryString, [req.body.cc, req.body.expDate, req.body.cvv, req.body.billingZip, req.body.id])
    .then(() => {
      res.status(201).send('data saved');
    })
    .catch((err) => {
      console.log('err', err);
      res.status(500).send('post failed');
    })
})

app.get('/responses/:id', (req, res) => {
  console.log(req.params.id, 'req.params.id');
  let queryString = 'SELECT * FROM  responses WHERE id=?;';
  db.queryAsync(queryString, [req.params.id])
    .then((data) => {
      console.log(data[0][0], 'data from get');
      res.status(200).send(data[0][0]);
    })
    .catch((err) => {
      console.log(err, 'err in get');
      res.status(500).send('error retrieving data');
    })
})

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
