const Trip = require('../models/Trip');

// Get all trips
/**
 * Fetches all trips from the database.
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} List of trips in JSON format or error message
 */
const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trips', error });
  }
};

// Add a new trip
/**
 * Adds a new trip to the database.
 * @param {object} req - Express request object containing trip details
 * @param {object} res - Express response object
 * @returns {object} Created trip in JSON format or error message
 */
const addTrip = async (req, res) => {
  const {start_location, end_location, start_time, end_time, distance_km, purpose } = req.body;

  try {
    const newTrip = await Trip.create({
      driver_id: req.body.userId,
      start_location,
      end_location,
      start_time,
      end_time,
      distance_km,
      purpose,
    });
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(500).json({ message: 'Error adding trip', error });
  }
};

// Update a trip by ID
/**
 * Updates an existing trip's details by its ID.
 * @param {object} req - Express request object containing updated trip details
 * @param {object} res - Express response object
 * @returns {object} Updated trip or error message
 */
const updateTrip = async (req, res) => {
  const { id } = req.params;
  const { start_location, end_location, start_time, end_time, distance_km, purpose } = req.body;

  try {
    const trip = await Trip.findByPk(id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    trip.start_location = start_location || trip.start_location;
    trip.end_location = end_location || trip.end_location;
    trip.start_time = start_time || trip.start_time;
    trip.end_time = end_time || trip.end_time;
    trip.distance_km = distance_km || trip.distance_km;
    trip.purpose = purpose || trip.purpose;

    await trip.save();
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Error updating trip', error });
  }
};

// Delete a trip by ID
/**
 * Deletes a trip by its ID.
 * @param {object} req - Express request object containing trip ID
 * @param {object} res - Express response object
 * @returns {object} Success message or error message
 */
const deleteTrip = async (req, res) => {
  const { id } = req.params;

  try {
    const trip = await Trip.findByPk(id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    await trip.destroy();
    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting trip', error });
  }
};

// Find trips by driver ID
/**
 * Finds trips by the driver's ID.
 * @param {object} req - Express request object containing driver ID
 * @param {object} res - Express response object
 * @returns {object} List of trips for the driver or error message
 */
const findTripsByDriver = async (req, res) => {
  const driver_id = req.userId;  // Use driver ID from JWT token

  try {
    const trips = await Trip.findAll({ where: { driver_id } });
    if (!trips.length) {
      return res.status(404).json({ message: 'No trips found for this driver' });
    }

    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Error finding trips', error });
  }
};

module.exports = {
  getAllTrips,
  addTrip,
  updateTrip,
  deleteTrip,
  findTripsByDriver,
};
