const mysql = require("mysql2");
const Promise = require("bluebird");

// Configure process.env variables in ../.env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });
// turns every method that uses connection into a promise

// connect to database and create table
db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .then(() =>
    // Expand this table definition as needed:
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS responses (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,   name VARCHAR(100), email VARCHAR(100), password VARCHAR(100), addressline1 VARCHAR(1000), addressline2 VARCHAR(1000), city VARCHAR(100), state VARCHAR(100), zip VARCHAR(100), phone VARCHAR(100), creditCardNum VARCHAR(100), expDate VARCHAR(100), CCV VARCHAR(100), billingZip VARCHAR(100))"
    )
  )
  .catch((err) => console.log(err));

module.exports = db;
