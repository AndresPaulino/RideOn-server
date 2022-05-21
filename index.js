require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.port || 8080;
const userRoutes = require('./routes/users');
const ridesRoutes = require('./routes/rides');
const userRidesRoutes = require('./routes/userRides');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


// Routes
app.use('/', userRoutes);
app.use('/', ridesRoutes);
app.use('/', userRidesRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
