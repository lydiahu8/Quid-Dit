const express = require('express');
// const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const cookieParser = require('cookie-parser');
// const passport = require('passport');
// const flash = require('connect-flash');

const {
  getAllGames,
  getAllGamesByUser,
  addOneUser,
  addOneGame
} = require('../controllers/games');

// Passport Configuration
// require('../config/passport')(passport);

const app = express();
let port = process.env.PORT || 3000;


// Set up for Express
app.use(express.static(__dirname + '/../client/dist'));
app.use(morgan('dev'));
// app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Set up for Passport
// app.use(session({
//   secret: 'secretpotter',
//   resave: true,
//   saveUninitialized: true
// })); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash());

// Gets all games played by all users
app.get('/games', getAllGames);

// Gets all games for one user
app.get('/games/:id', getAllGamesByUser);

// Add one user
app.post('/games', addOneUser);

//Add one game to games table
app.post('/games', addOneGame);

app.listen(port, () => {
  console.log('listening on port 3000!');
});