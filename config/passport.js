const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');
const bcrypt = require('bcrypt-nodejs');
const config = require('./db.config');

const db = mysql.createConnection(config);

// Use quidditch database
db.query('USE ' + config.database);

module.exports = (passport) => {

  // If the credentials are valid, the verify callback invokes done to supply Passport with the user that authenticated.

  // Serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize the user
  passport.deserializeUser((id, done) => {
    const queryStr = `SELECT * FROM users WHERE id = ${id};`;
    db.query(queryStr, (err, rows) => {
      done(err, rows[0]);
    });
  });

  // User sign-up

  passport.use('local-signup', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    (req, username, password, done) => {
      const queryStr = `SELECT * FROM users WHERE username = ${username}`;
      db.query(queryStr, (err, rows) => {
        if (err)
          return done(err);
        if (rows.length) {
          return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
        } else {
          // if there is no user with that username, create the user
          var newUser = {
            username: username,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
          };

          var insertQuery = 'INSERT INTO users ( username, password ) values (?,?);';

          db.query(insertQuery, [newUser.username, newUser.password], (err, rows) => {
            if (err) {
              return done(err);
            }
            return done(null, newUser);
          });
        }
      })
    }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  }, (req, username, password, done) => {
    const queryStr = `SELECT * FROM users WHERE username = ${username}`;
    db.query(queryStr, (err, rows) => {
      if (err)
        return done(err);
      if (!rows.length) {
        return done(null, false, req.flash('loginMessage', 'User not found.'));
      }

      // User exists, but wrong password
      if (!bcrypt.compareSync(password, rows[0].password))
        // create the loginMessage and save it to session as flashdata
        return done(null, false, req.flash('loginMessage', 'Wrong password! Please try again.'));

      // Return user on success
      return done(null, rows[0]);
    });
  }));
}