require('dotenv').config();
const path = require('path')
const express = require('express');
const cors = require('cors');

const app = express();

// Config JSON response
app.use(express.json());

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Public folder for images
app.use(express.static('public'));

// Routes
const UserRoutes = require('./routes/UserRoutes');
const PetRoutes = require('./routes/PetRoutes');

app.use('/users', UserRoutes);
app.use('/pets', PetRoutes);

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.resolve('../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('../frontend/build/index.html'));
  });
}

app.listen(5000);
