const knex = require('knex')(require('../knexfile'));

module.exports = async function (context, req) {
  knex('user_rides')
    .insert({
      user_id: req.body.user_id,
      ride_id: req.body.ride_id,
    })
    .then(() => {
      context.res = {
        body: 'Saved ride',
        status: 200,
      };
    })
    .catch((err) => {
      context.res = {
        body: err,
      };
    });
};
