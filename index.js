require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.port || 8080;
const userRoutes = require('./routes/users');
const ridesRoutes = require('./routes/rides');

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/', userRoutes);
app.use('/', ridesRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
