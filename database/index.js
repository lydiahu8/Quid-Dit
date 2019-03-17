const mysql = require('mysql');
const config = require('../config');

const db = mysql.createConnection(config);

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

const addOneGame = (game, callback) => {
  const query = 'INSERT INTO games (score) VALUES (?);';
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
  addOneGame
};