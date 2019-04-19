const db = require('../models/index');

module.exports = {
  getAllGames: (req, res) => {
    db.getAllGames((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },
  addOneGame: (req, res) => {
    const {
      body
    } = req;
    db.addOneGame(body, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(body);
      }
    });
  }
}