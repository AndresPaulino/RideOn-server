const express = require('express');
const knex = require('knex')(require('../knexfile'));
const router = express.Router();

// save rides to user's saved rides
router.post('/myrides', (req, res) => {
  knex('user_rides')
    .insert({
      user_id: req.body.user_id,
      ride_id: req.body.ride_id,
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// delete saved ride from user id
router.delete('/myrides/:user_id/:ride_id', (req, res) => {
  console.log(req.params);

  knex('user_rides')
    .where({ user_id: req.params.user_id, ride_id: req.params.ride_id })
    .del()
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// display saved rides from user id
router.get('/myrides/:user_id', (req, res) => {
  console.log(req.params);

  knex('user_rides')
    .where({ user_id: req.params.user_id })
    .join('rides', 'user_rides.ride_id', 'rides.id')
    .select('rides.ride_title', 'rides.ride_date', 'rides.id')
    .then((rides) => {
      console.log(rides);
      res.json(rides);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// check if user has saved ride
router.get('/myrides/:user_id/:ride_id', (req, res) => {
  console.log(req.params);

  knex('user_rides')
    .where({ user_id: req.params.user_id, ride_id: req.params.ride_id })
    .then((rides) => {
      console.log(rides);
      res.json(rides);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
