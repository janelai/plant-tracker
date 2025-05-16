const mongoose = require('mongoose');

const CareLogSchema = new mongoose.Schema({
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant',
    required: true
  },
  logType: {
    type: String,
    required: true,
    enum: ['watering', 'fertilizing', 'repotting', 'pruning', 'pest_control', 'other']
  },
  notes: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CareLog', CareLogSchema);