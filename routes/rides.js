const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile'));

// Get Rides
router.get('/rides', (req, res) => {
  knex('rides')
    .then((rides) => {
      res.json(rides);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Post Ride
router.post('/rides', (req, res) => {
  const { user_name, profile_img, ride_title, ride_address, ride_date, ride_time, ride_description, ride_from } =
    req.body;
  const newRide = {
    user_name,
    profile_img,
    ride_title,
    address1: ride_address,
    address2: ride_address,
    ride_date,
    ride_time,
    ride_description,
    ride_from,
  };
  knex('rides')
    .insert(newRide)
    .then(() => {
      res.status(201).send('Ride created successfully');
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// Increment participant count
router.post('/rides/add-participants', (req, res) => {
  const { id } = req.body;
  knex('rides')
    .where({ id })
    .increment('ride_participants', 1)
    .then(() => {
      res.status(201).send('Ride created successfully');
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
