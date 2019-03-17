const express = require('express');
const bodyParser = require('body-parser');
const {
  getAllGames,
  addOneGame
} = require('../database');

const app = express();
let port = 3000;

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.get('/games', (req, res) => {
  getAllGames((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/games', (req, res) => {
  const {
    body
  } = req;
  addOneGame(body, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(body);
    }
  });
});

app.listen(port, () => {
  console.log('listening on port 3000!');
});