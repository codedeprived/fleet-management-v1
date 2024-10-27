const express = require('express');
const router = express.Router();
const { getAllTrips, addTrip, updateTrip, deleteTrip, findTripsByDriver } = require('../controllers/tripController');

// Route to get all trips
router.get('/', getAllTrips);

// Route to add a new trip
router.post('/', addTrip);

// Route to update a trip by ID
router.put('/:id', updateTrip);

// Route to delete a trip by ID
router.delete('/:id', deleteTrip);

// Route to find trips by driver ID
router.get('/driver/:driver_id', findTripsByDriver);

module.exports = router;
