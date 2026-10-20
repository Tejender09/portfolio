const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
};

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('Successfully connected to MongoDB');
      startServer();
    })
    .catch(err => {
      console.error('MongoDB connection error:', err.message);
      console.log('Starting server in offline database mode...');
      startServer();
    });
} else {
  // Try local MongoDB, if fails start anyway
  mongoose.connect('mongodb://localhost:27017/portfolio', { serverSelectionTimeoutMS: 2000 })
    .then(() => {
      console.log('Successfully connected to local MongoDB');
      startServer();
    })
    .catch(() => {
      console.warn('Notice: Local MongoDB not detected. Server running without MongoDB connection.');
      startServer();
    });
}
