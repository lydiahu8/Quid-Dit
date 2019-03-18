const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
var morgan = require('morgan');
const cookieParser = require('cookie-parser');
var passport = require('passport');
var flash = require('connect-flash');
const {
  getAllGames,
  getAllGamesByUser,
  addOneUser,
  addOneGame
} = require('../controllers/games');

const app = express();
let port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

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