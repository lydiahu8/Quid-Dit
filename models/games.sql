DROP DATABASE IF EXISTS quidditch;

CREATE DATABASE quidditch;

USE quidditch;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(25),
  password varchar(25),
  PRIMARY KEY (id)
);

CREATE TABLE games (
  id int NOT NULL AUTO_INCREMENT,
  score integer NOT NULL,
  user_id int,
  FOREIGN KEY (user_id) REFERENCES users(id),
  PRIMARY KEY (id)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
