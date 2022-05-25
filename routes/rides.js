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

// Get Ride by ID
router.get('/rides/:id', (req, res) => {
  knex('rides')
    .where({ id: req.params.id })
    .first()
    .then((ride) => {
      res.json(ride);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Post Ride
router.post('/rides', (req, res) => {
  const { user_name, profile_img, ride_title, address1, address2, ride_date, ride_time, ride_description, ride_from, lat, lng } =
    req.body;
  const newRide = {
    user_name,
    profile_img,
    ride_title,
    address1: address1,
    address2: address2,
    ride_date,
    ride_time,
    ride_description,
    ride_from,
    lat,
    lng,
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
      res.status(201).send('Participant count incremented');
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// Decrement participant count
router.post('/rides/remove-participants', (req, res) => {
  const { id } = req.body;
  knex('rides')
    .where({ id })
    .decrement('ride_participants', 1)
    .then(() => {
      res.status(201).send('Participant count decremented');
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// post ride comment
router.post('/rides/:id/comments', (req, res) => {
  const { user_name, profile_img, user_comment, ride_id, created } = req.body;
  const newComment = {
    user_name,
    profile_img,
    user_comment,
    ride_id,
    created,
  };
  knex('ride_comments')
    .insert(newComment)
    .then(() => {
      res.status(201).send('Comment created successfully');
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// Get ride comments
router.get('/rides/:id/comments', (req, res) => {
  knex('ride_comments')
    .where({ ride_id: req.params.id })
    .then((comments) => {
      res.json(comments);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
