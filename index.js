require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
const PORT = process.env.port || 8080;
const userRoutes = require('./routes/users');
const ridesRoutes = require('./routes/rides');
const userRidesRoutes = require('./routes/userRides');

// Middleware
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());
app.use(express.static('public'));
app.use(fileUpload());

// File upload
app.post('/upload', authenticator, (req, res) => {
  const imageFile = req.files['image-field'];
  const fileName = imageFile.name;
  const uploadPath = `images/${fileName}`;
  imageFile.mv(`${__dirname}/public/${uploadPath}`, function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.send({ path: uploadPath });
  });
});


// Routes
app.use('/', userRoutes);
app.use('/', ridesRoutes);
app.use('/', userRidesRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
