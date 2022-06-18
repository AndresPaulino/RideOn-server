const knex = require('knex')(require('../knexfile'));

module.exports = async function (context, req) {
  knex('user_rides')
    .where({ user_id: req.params.user_id, ride_id: req.params.ride_id })
    .then((rides) => {
      context.res = {
        body: rides,
      };
    })
    .catch((err) => {
      context.res = {
        status: 500,
        body: err,
      };
    });
};
