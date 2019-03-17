DROP DATABASE IF EXISTS quidditch;

CREATE DATABASE quidditch;

USE quidditch;

CREATE TABLE games (
  id int NOT NULL AUTO_INCREMENT,
  score integer NOT NULL,
  PRIMARY KEY (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
