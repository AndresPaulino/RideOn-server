const knex = require('knex')(require('../knexfile'));

module.exports = async function (context, req) {
  knex('user_rides')
    .where({ user_id: req.params.user_id })
    .join('rides', 'user_rides.ride_id', 'rides.id')
    .select('rides.ride_title', 'rides.ride_date', 'rides.id', 'rides.lat', 'rides.lng')
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
