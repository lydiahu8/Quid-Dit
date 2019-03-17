const mysql = require('mysql');
const config = require('../config');

const connection = mysql.createConnection(config);

const getAllGames = (callback) => {
  const query = 'SELECT * FROM games;';
  connection.query(query, function(err, results) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  getAllGames
};
