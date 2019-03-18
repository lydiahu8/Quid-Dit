const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');
const bcrypt = require('bcrypt-nodejs');
const config = require('./db.config');

const db = mysql.createConnection(config);

// Use quidditch database
db.query('USE ' + config.database);

module.exports = (passport) => {

  // If the credentials are valid, the verify callback invokes done to supply Passport with the user that authenticated.

  //Serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  //Deserialize the user
  passport.deserializeUser((id, done) => {
    const query = `SELECT * FROM users WHERE id = ${id};`;
    db.query(query, (err, rows) => {
      done(err, rows[0]);
    });
  });

  

}