const knex = require('knex')(require('../knexfile'));

module.exports = async function (context, req) {
  const { user_name, profile_img, user_comment, ride_id, created } = req.body;
  const newComment = {
    user_name,
    profile_img,
    user_comment,
    ride_id,
    created,
  };
  knex('ride_comments')
    .insert(newComment)
    .then(() => {
      context.res = {
        body: 'Comment created successfully',
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
