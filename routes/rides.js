const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile'));

// Get Rides
router.get('/rides', (req, res) => {
    knex('rides')
        .then(rides => {
            res.json(rides);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});


module.exports = router;