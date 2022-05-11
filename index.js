require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.port || 8080;
const userRoutes = require('./routes/users');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('users', userRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
