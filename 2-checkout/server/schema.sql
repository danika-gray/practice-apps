DROP DATABASE IF EXISTS checkout;

CREATE DATABASE checkout;

USE checkout;

CREATE TABLE checkoutData (
  checkoutID INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100),
  addressline1 VARCHAR(1000),
  addressline2 VARCHAR(1000),
  city VARCHAR(100),
  state VARCHAR(100),
  zip VARCHAR(100),
  phone VARCHAR(100),
  creditCardNum VARCHAR(100),
  expDate VARCHAR(100),
  CCV VARCHAR(100),
  billingZip VARCHAR(100),
  PRIMARY KEY (checkoutID)
)