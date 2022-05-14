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


})

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
