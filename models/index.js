const mysql = require('mysql');
const config = require('../config/db.config');

const db = mysql.createConnection(config);

// Gets all games played by all users
const getAllGames = (callback) => {
  const query = 'SELECT * FROM games;';
  db.query(query, function (err, results) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, results);
  });
};

// Gets all games for one user
const getAllGamesByUser = (id, callback) => {
  const query = `SELECT * FROM games INNER JOIN users ON games.user_id = users.id WHERE games.user_id = ${id};`;
  db.query(query, function (err, results) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, results);
  });
};

// Add one user
const addOneUser = (user, callback) => {
  const query = `INSERT into users (username)  VALUES (?);`;
  const params = [user.username];
  db.query(query, params, (err) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
}

//Add one game to games table
const addOneGame = (game, callback) => {
  const query = `INSERT INTO games (score) VALUES (?);`;
  const params = [game.score];
  db.query(query, params, (err) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
}

module.exports = {
  getAllGames,
  getAllGamesByUser,
  addOneUser,
  addOneGame
};