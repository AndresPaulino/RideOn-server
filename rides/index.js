const knex = require('knex')(require('../knexfile'));

module.exports = async function (context, req) {
  knex('rides')
    .then((rides) => {
      context.res = {
        body: rides,
      };
    })
    .catch((err) => {
      context.res = {
        body: err,
      };
    });
};
