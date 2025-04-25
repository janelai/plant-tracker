const Plant = require('../models/Plant');
const CareLog = require('../models/CareLog');
const asyncHandler = require('express-async-handler');

// @desc    Get all plants for a user
// @route   GET /api/plants
// @access  Private
const getPlants = asyncHandler(async (req, res) => {
  const plants = await Plant.find({ user: req.user.id }).sort({ dateAdded: -1 });
  res.json(plants);
});

// @desc    Get a single plant
// @route   GET /api/plants/:id
// @access  Private
const getPlantById = asyncHandler(async (req, res) => {
  const plant = await Plant.findById(req.params.id);
  
  if (!plant) {
    res.status(404);
    throw new Error('Plant not found');
  }
  
  // Check if the plant belongs to the user
  if (plant.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }
  
  res.json(plant);
});

// @desc    Create a new plant
// @route   POST /api/plants
// @access  Private
const createPlant = asyncHandler(async (req, res) => {
  const { name, species, description, wateringFrequency } = req.body;
  
  if (!name) {
    res.status(400);
    throw new Error('Name is required');
  }
  
  // Handle image upload
  let imageUrl = null;
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  }
  
  const plant = await Plant.create({
    user: req.user.id,
    name,
    species,
    description,
    imageUrl,
    wateringFrequency: wateringFrequency || 7, // Default to 7 days
  });
  
  res.status(201).json(plant);
});

// @desc    Update a plant
// @route   PUT /api/plants/:id
// @access  Private
const updatePlant = asyncHandler(async (req, res) => {
  const plant = await Plant.findById(req.params.id);
  
  if (!plant) {
    res.status(404);
    throw new Error('Plant not found');
  }
  
  // Check if the plant belongs to the user
  if (plant.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }
  
  // Update fields
  const { name, species, description, wateringFrequency } = req.body;
  
  if (name) plant.name = name;
  if (species) plant.species = species;
  if (description) plant.description = description;
  if (wateringFrequency) plant.wateringFrequency = wateringFrequency;
  
  // Handle image upload
  if (req.file) {
    plant.imageUrl = `/uploads/${req.file.filename}`;
  }
  
  const updatedPlant = await plant.save();
  res.json(updatedPlant);
});

// @desc    Delete a plant
// @route   DELETE /api/plants/:id
// @access  Private
const deletePlant = asyncHandler(async (req, res) => {
  const plant = await Plant.findById(req.params.id);
  
  if (!plant) {
    res.status(404);
    throw new Error('Plant not found');
  }
  
  // Check if the plant belongs to the user
  if (plant.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }
  
  // Delete all care logs associated with this plant
  await CareLog.deleteMany({ plant: req.params.id });
  
  // Delete the plant
  await plant.remove();
  
  res.json({ message: 'Plant removed' });
});

// @desc    Log a care activity for a plant
// @route   POST /api/plants/:id/care-log
// @access  Private
const logCareActivity = asyncHandler(async (req, res) => {
  const plant = await Plant.findById(req.params.id);
  
  if (!plant) {
    res.status(404);
    throw new Error('Plant not found');
  }
  
  // Check if the plant belongs to the user
  if (plant.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }
  
  const { logType, notes } = req.body;
  
  if (!logType) {
    res.status(400);
    throw new Error('Log type is required');
  }
  
  const careLog = await CareLog.create({
    plant: req.params.id,
    logType,
    notes
  });
  
  // If this is a watering event, update the plant's last watered date
  if (logType === 'watering') {
    plant.lastWatered = new Date();
    await plant.save();
  }
  
  res.status(201).json(careLog);
});

// @desc    Get all care logs for a plant
// @route   GET /api/plants/:id/care-logs
// @access  Private
const getCareLogs = asyncHandler(async (req, res) => {
  const plant = await Plant.findById(req.params.id);
  
  if (!plant) {
    res.status(404);
    throw new Error('Plant not found');
  }
  
  // Check if the plant belongs to the user
  if (plant.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }
  
  const careLogs = await CareLog.find({ plant: req.params.id }).sort({ timestamp: -1 });
  res.json(careLogs);
});

module.exports = {
  getPlants,
  getPlantById,
  createPlant,
  updatePlant,
  deletePlant,
  logCareActivity,
  getCareLogs
};