const knex = require('knex')(require('../knexfile'));
const jwt = require('jsonwebtoken');

module.exports = async function (context, req) {
  // If there is no auth header provided
  if (!req.headers.authorization) {
    return (context.res = {
      status: 401,
      body: 'Please provide an authorization header',
    });
  }

  // Parse the Bearer token
  const authToken = req.headers.authorization.split(' ')[1];

  // Verify the token
  jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return (context.res = {
        status: 401,
        body: 'Invalid token',
      });
    }

    knex('users')
      .where({ email: decoded.email })
      .first()
      .then((user) => {
        // Respond with the user data
        delete user.password;
        context.res = {
          body: user,
        };
      });
  });
};
