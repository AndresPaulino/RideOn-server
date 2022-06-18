const knex = require('knex')(require('../knexfile'));

module.exports = async function (context, req) {
  knex('rides')
    .where({ id: req.params.id })
    .first()
    .then((ride) => {
      context.res = {
        body: ride,
      };
    })
    .catch((err) => {
      context.res = {
        body: err,
      };
    });
};
