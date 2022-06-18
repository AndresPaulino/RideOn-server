const knex = require('knex')(require('../knexfile'));
const bcrypt = require('bcryptjs');

module.exports = async function (context, req) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return (context.res = {
      status: 400,
      body: 'Please provide a username, email and password',
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 12);

  // Create the new user
  const newUser = {
    user_name: username,
    email: email,
    password: hashedPassword,
    profile_img: `https://www.pngitem.com/middle/hhRxRJh_transparent-motorcycle-helmet-png-motorcycle-helmet-png-download/`,
  };

  knex('users')
    .insert(newUser)
    .then(() => {
      context.res = {
        body: {
          message: 'User created successfully',
          user: newUser,
        },
      };
    })
    .catch(() => {
      context.res = {
        body: {
          message: 'User already exists',
        },
      };
    });
};
