const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Plant name is required']
  },
  species: {
    type: String
  },
  description: {
    type: String
  },
  imageUrl: {
    type: String
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  wateringFrequency: {
    type: Number, // Days between watering
    default: 7
  },
  lastWatered: {
    type: Date
  },
  nextWatering: {
    type: Date
  }
}, {
  timestamps: true
});

// Method to calculate next watering date
PlantSchema.methods.updateWateringSchedule = function() {
  if (this.lastWatered && this.wateringFrequency) {
    const nextDate = new Date(this.lastWatered);
    nextDate.setDate(nextDate.getDate() + this.wateringFrequency);
    this.nextWatering = nextDate;
  }
  return this;
};

// Pre-save hook to update nextWatering
PlantSchema.pre('save', function(next) {
  if (this.isModified('lastWatered') || this.isModified('wateringFrequency')) {
    this.updateWateringSchedule();
  }
  next();
});

module.exports = mongoose.model('Plant', PlantSchema);