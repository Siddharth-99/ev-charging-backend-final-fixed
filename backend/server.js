const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const stationRoutes = require('./routes/stationRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express(); // ✅ initialize first

const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve frontend
const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/feedback', feedbackRoutes); // ✅ lowercase

// ✅ MongoDB
// mongoose.connect('mongodb://localhost:27017/ev-charging')
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('Loaded MONGO_URI:', JSON.stringify(process.env.MONGO_URI));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
