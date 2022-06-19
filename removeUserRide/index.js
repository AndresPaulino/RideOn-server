const knex = require('knex')(require('../knexfile'));

module.exports = async function (context, req) {
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
};
