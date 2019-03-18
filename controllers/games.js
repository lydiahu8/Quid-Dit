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
  getAllGamesByUser: (req, res) => {
    db.getAllGamesByUser((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },
  addOneUser: (req, res) => {
    const {
      body
    } = req;
    db.addOneUser(body, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(body);
      }
    });
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