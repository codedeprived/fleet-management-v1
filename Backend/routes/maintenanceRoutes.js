const express = require('express');
const router = express.Router();
const {
  getAllMaintenanceRecords,
  addMaintenanceRecord,
  updateMaintenanceRecord,
  deleteMaintenanceRecord,
  findMaintenanceRecordsByVehicle
} = require('../controllers/maintenanceController');

// Route to get all maintenance records
router.get('/', getAllMaintenanceRecords);

// Route to add a new maintenance record
router.post('/', addMaintenanceRecord);

// Route to update a maintenance record by ID
router.put('/:id', updateMaintenanceRecord);

// Route to delete a maintenance record by ID
router.delete('/:id', deleteMaintenanceRecord);

// Route to find maintenance records by vehicle ID
router.get('/vehicle/:vehicle_id', findMaintenanceRecordsByVehicle);

module.exports = router;
