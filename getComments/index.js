const knex = require('knex')(require('../knexfile'));

module.exports = async function (context, req) {
  knex('ride_comments')
    .where({ ride_id: req.params.id })
    .then((comments) => {
      context.res = {
        body: comments,
        status: 200,
      };
    })
    .catch((err) => {
      context.res = {
        body: err,
        status: 400,
      };
    });
};
