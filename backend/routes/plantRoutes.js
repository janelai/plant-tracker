const express = require('express');
const router = express.Router();

const { 
  getPlants,
  getPlantById,
  createPlant,
  updatePlant,
  deletePlant,
  logCareActivity,
  getCareLogs
} = require('../controllers/plantController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.route('/')
  .get(protect, getPlants)
  .post(protect, upload.single('image'), createPlant);

router.route('/:id')
  .get(protect, getPlantById)
  .put(protect, upload.single('image'), updatePlant)
  .delete(protect, deletePlant);

router.route('/:id/care-logs')
  .get(protect, getCareLogs)
  .post(protect, logCareActivity);

module.exports = router;