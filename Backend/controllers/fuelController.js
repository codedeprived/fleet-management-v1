const FuelLog = require('../models/FuelLog');

// Get fuel logs (Driver: only their logs; Admin: all logs)
/**
 * Fetches fuel logs based on user role.
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} List of fuel logs in JSON format or error message
 */
const getFuelLogs = async (req, res) => {
    try {
        const { role, driver_id } = req.user; // Extract role and driver_id from the authenticated user

        let fuelLogs;
        if (role === 'admin') {
            // Admin: Fetch all fuel logs
            fuelLogs = await FuelLog.findAll();
        } else if (role === 'driver' && driver_id) {
            // Driver: Fetch only their fuel logs
            fuelLogs = await FuelLog.findAll({
                where: { driver_id },
            });
        } else {
            return res.status(403).json({ message: 'Access denied' });
        }

        if (!fuelLogs.length) {
            return res.status(404).json({ message: 'No fuel logs found' });
        }

        res.status(200).json(fuelLogs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching fuel logs', error: error.message });
    }
};

// Add a new fuel log
/**
 * Adds a new fuel log for the current driver.
 * @param {object} req - Express request object containing fuel log details
 * @param {object} res - Express response object
 * @returns {object} Created fuel log in JSON format or error message
 */
const addFuelLog = async (req, res) => {
    try {
        const { driver_id } = req.user; // Extract driver_id from the authenticated user
        if (!driver_id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const { vehicle_id, fuel_in_liters, cost, location } = req.body;

        const newFuelLog = await FuelLog.create({
            vehicle_id,
            driver_id,
            fuel_in_liters,
            cost,
            location,
        });

        res.status(201).json(newFuelLog);
    } catch (error) {
        res.status(500).json({ message: 'Error adding fuel log', error: error.message });
    }
};

// Update a fuel log by ID
/**
 * Updates a fuel log by its ID.
 * @param {object} req - Express request object containing updated fuel log details
 * @param {object} res - Express response object
 * @returns {object} Updated fuel log or error message
 */
const updateFuelLog = async (req, res) => {
    const { id } = req.params;

    try {
        const { role, driver_id } = req.user; // Extract role and driver_id from the authenticated user
        const fuelLog = await FuelLog.findByPk(id);

        if (!fuelLog) {
            return res.status(404).json({ message: 'Fuel log not found' });
        }

        // Check if the user is authorized to update this log
        if (role !== 'admin' && fuelLog.driver_id !== driver_id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const { vehicle_id, fuel_in_liters, cost, location } = req.body;

        fuelLog.vehicle_id = vehicle_id || fuelLog.vehicle_id;
        fuelLog.fuel_in_liters = fuel_in_liters || fuelLog.fuel_in_liters;
        fuelLog.cost = cost || fuelLog.cost;
        fuelLog.location = location || fuelLog.location;

        await fuelLog.save();

        res.status(200).json(fuelLog);
    } catch (error) {
        res.status(500).json({ message: 'Error updating fuel log', error: error.message });
    }
};

// Delete a fuel log by ID
/**
 * Deletes a fuel log by its ID.
 * @param {object} req - Express request object containing fuel log ID
 * @param {object} res - Express response object
 * @returns {object} Success message or error message
 */
const deleteFuelLog = async (req, res) => {
    const { id } = req.params;

    try {
        const { role, driver_id } = req.user; // Extract role and driver_id from the authenticated user
        const fuelLog = await FuelLog.findByPk(id);

        if (!fuelLog) {
            return res.status(404).json({ message: 'Fuel log not found' });
        }

        // Check if the user is authorized to delete this log
        if (role !== 'admin' && fuelLog.driver_id !== driver_id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        await fuelLog.destroy();

        res.json({ message: 'Fuel log deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting fuel log', error: error.message });
    }
};

module.exports = {
    getFuelLogs,
    addFuelLog,
    updateFuelLog,
    deleteFuelLog,
};
