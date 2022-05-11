const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile'));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ## POST /register
// -   Creates a new user.
// -   Expected body: { user_name, email, password }
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send('Please enter the required fields.');
  }

  const hashedPassword = bcrypt.hashSync(password, 12);

  // Create the new user
  const newUser = {
    user_name: username,
    email: email,
    password: hashedPassword,
  };

  knex('users')
    .insert(newUser)
    .then(() => {
      res.status(201).send('Registered successfully');
    })
    .catch(() => {
      res.status(400).send('Failed registration');
    });
});

// ## POST /login
// -   Generates and responds a JWT for the user to use for future authorization.
// -   Expected body: { email, password }
// -   Response format: { token: "JWT_TOKEN_HERE" }
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Please enter the required fields');
  }

  // Find the user
  knex('users')
    .where({ email: email })
    .first()
    .then((user) => {
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(400).send('Invalid email or password');
      }

      // Create a token
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });

      res.json({ token });
    })
    .catch(() => {
      res.status(400).send('Invalid credentials');
    });
});

// ## GET /api/users/current
// -   Gets information about the currently logged in user.
// -   If no valid JWT is provided, this route will respond with 401 Unauthorized.
// -   Expected headers: { Authorization: "Bearer JWT_TOKEN_HERE" }
router.get('/current', (req, res) => {
  // If there is no auth header provided
  if (!req.headers.authorization) {
    return res.status(401).send('Please login');
  }

  // Parse the Bearer token
  const authToken = req.headers.authorization.split(' ')[1];

  // Verify the token
  jwt.verify(authToken, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid auth token');
    }

    knex('users')
      .where({ email: decoded.email })
      .first()
      .then((user) => {
        // Respond with the user data
        delete user.password;
        res.json(user);
      });
  });
});

module.exports = router;
