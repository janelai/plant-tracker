// const express = require('express');
// const router = express.Router();
// const { 
//   getPlants,
//   getPlantById,
//   createPlant,
//   updatePlant,
//   deletePlant,
//   logCareActivity,
//   getCareLogs
// } = require('../controllers/plantController');
// const { protect } = require('../middleware/auth');
// const upload = require('../middleware/upload');

// router.route('/')
//   .get(protect, getPlants)
//   .post(protect, upload.single('image'), createPlant);

// router.route('/:id')
//   .get(protect, getPlantById)
//   .put(protect, upload.single('image'), updatePlant)
//   .delete(protect, deletePlant);

// router.route('/:id/care-logs')
//   .get(protect, getCareLogs)
//   .post(protect, logCareActivity);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { 
  getPlants,
  getPlantById,
  createPlant,
  deletePlant,
} = require('../controllers/plantController');
const { protect } = require('../middleware/auth'); // If you have auth middleware

// Routes
router.route('/')
  .get(getPlants)
  .post(createPlant); // or protect(createPlant) if auth is required

router.route('/:id')
  .get(getPlantById)
  .delete(deletePlant);

module.exports = router;