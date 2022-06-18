const knex = require('knex')(require('../knexfile'));

module.exports = async function (context, req) {
  const { user_id } = req.params;
  const { profile_img } = req.body;

  knex('users')
    .where({ id: user_id })
    .update({ profile_img: profile_img })
    .then(() => {
      context.res = {
        body: {
          message: 'Profile image updated',
        },
      };
    })
    .catch((err) => {
      context.res = {
        status: 400,
        body: err,
      };
    });
};
