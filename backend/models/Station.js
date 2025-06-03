const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: String,
  address: String,
  chargingSpeed: String,
  availablePorts: Number,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  }
});

const stationSchema = new mongoose.Schema({
  name: String,
  address: String,
  chargingSpeed: String,
  availablePorts: Number,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
  branchStations: [branchSchema] // 👈 Nested Bhopal stations here
});

// stationSchema.index({ location: '2dsphere' }); // required for geospatial

module.exports = mongoose.model('Station', stationSchema);
