const knex = require('knex')(require('../knexfile'));

module.exports = async function (context, req) {
  const {
    user_name,
    profile_img,
    ride_title,
    address1,
    address2,
    ride_date,
    ride_time,
    ride_description,
    ride_from,
    lat,
    lng,
  } = req.body;
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
      context.res = {
        body: 'Ride created successfully',
        status: 201,
      };
    })
    .catch((err) => {
      context.res = {
        body: err,
        status: 400,
      };
    });
};
