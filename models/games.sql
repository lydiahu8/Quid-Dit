DROP DATABASE IF EXISTS quidditt;

CREATE DATABASE quidditt;

USE quidditt;

CREATE TABLE games (
  id int NOT NULL AUTO_INCREMENT,
  score integer NOT NULL,
  PRIMARY KEY (id)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < models/games.sql
 *  to create the database and the tables.*/
