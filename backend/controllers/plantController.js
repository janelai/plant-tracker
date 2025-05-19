const Plant = require('../models/Plant');
const asyncHandler = require('express-async-handler');

// @desc    Get all plants
// @route   GET /api/plants
// @access  Public (or Private if using auth)
const getPlants = asyncHandler(async (req, res) => {
  try {
    // If using auth, you'd filter by user: const plants = await Plant.find({ user: req.user.id });
    const plants = await Plant.find({});
    res.json(plants);
  } catch (error) {
    console.error('Error fetching plants:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Create a new plant
// @route   POST /api/plants
// @access  Public (or Private if using auth)
const createPlant = asyncHandler(async (req, res) => {
  console.log('Received plant creation request:', req.body);
  
  try {
    // Validate required fields
    if (!req.body.name) {
      console.log('Validation failed: No plant name provided');
      return res.status(400).json({ message: 'Plant name is required' });
    }
    
    // Create plant
    const plant = await Plant.create({
      // If using auth: user: req.user.id,
      name: req.body.name,
      species: req.body.species || '',
      wateringFrequency: req.body.wateringFrequency || 7,
    });
    
    console.log('Plant created successfully:', plant);
    res.status(201).json(plant);
  } catch (error) {
    console.error('Error creating plant:', error);
    res.status(500).json({ message: 'Server error while creating plant', error: error.message });
  }
});

// @desc    Get a single plant by ID
// @route   GET /api/plants/:id
// @access  Public (or Private if using auth)
const getPlantById = asyncHandler(async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    
    // If using auth: Check if plant belongs to user
    // if (plant.user.toString() !== req.user.id) {
    //   return res.status(401).json({ message: 'Not authorized' });
    // }
    
    res.json(plant);
  } catch (error) {
    console.error('Error fetching plant:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const deletePlant = asyncHandler(async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    
    // If you have authentication, check if plant belongs to user
    // if (plant.user && plant.user.toString() !== req.user.id) {
    //   return res.status(401).json({ message: 'Not authorized' });
    // }
    
    await plant.deleteOne(); // or plant.remove() in older versions
    
    console.log(`Plant deleted: ${req.params.id}`);
    res.json({ message: 'Plant removed', id: req.params.id });
  } catch (error) {
    console.error('Error deleting plant:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = {
  getPlants,
  getPlantById,
  createPlant,
  deletePlant,
  // updatePlant,
  // logCareActivity,
  // getCareLogs
};