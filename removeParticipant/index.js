const knex = require('knex')(require('../knexfile'));

module.exports = async function (context, req) {
  const { id } = req.body;
  knex('rides')
    .where({ id })
    .decrement('ride_participants', 1)
    .then(() => {
      context.res = {
        body: 'Participant count decremented',
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
