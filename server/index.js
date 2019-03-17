const express = require('express');
const bodyParser = require('body-parser');
const {
  getAllGames
} = require('../database');

const app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.get('/games', (req, res) => {
  getAllGames((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});