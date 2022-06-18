const knex = require('knex')(require('../knexfile'));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async function (context, req) {
  const { email, password } = req.body;

  if (!email || !password) {
    return (context.res = {
      status: 400,
      body: 'Please provide a username and password',
    });
  }

  // Find the user
  knex('users')
    .where({ email: email })
    .first()
    .then((user) => {
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);

      if (!isPasswordCorrect) {
        return (context.res = {
          status: 400,
          body: 'Invalid email or password',
        });
      }

      // Create a token
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });

      context.res = {
        body: {
          token: token,
          user: user,
        },
      };
    })
    .catch(() => {
      context.res = {
        status: 400,
        body: 'Invalid credentials',
      };
    });
};
