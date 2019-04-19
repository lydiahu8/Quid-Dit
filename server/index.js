const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const {
  getAllGames,
  addOneGame
} = require('../controllers/games');

const app = express();
let port = process.env.PORT || 3000;

app.use(cors());

// Set up for Express
app.use(express.static(__dirname + '/../client/dist'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Gets all games played by all users
app.get('/games', getAllGames);

//Add one game to games table
app.post('/games', addOneGame);

app.listen(port, () => {
  console.log('listening on port 3000!');
});