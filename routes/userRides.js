const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile'));

// save rides to user's saved rides
router.post('/myrides', (req, res) => {
    knex('userRides').insert({
        user_id: req.body.user_id,
        ride_id: req.body.ride_id
    })
    .then(() => {
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});
    
// get all saved rides for a user
router.get('/myrides', (req, res) => {
    knex('userRides').where('user_id', req.body.user_id)
    .then((rides) => {
        res.send(rides);
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
}
);


