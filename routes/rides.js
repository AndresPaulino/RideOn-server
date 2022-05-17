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
  const { id, user_name, profile_img, title, address, date, time, description, from,  } = req.body;
  const newRide = {
    user_name,
      profile_img,
      title,
      address,
      date,
      time,
      description,
      from,
      to,
      id,
        
  };
  knex('rides')
    .insert(newRide)
    .then(() => {
      res.status(201).send('Ride created successfully');
    })
    .catch(() => {
      res.status(400).send('Failed to create ride');
    });
});

module.exports = router;
