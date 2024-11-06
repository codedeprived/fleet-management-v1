// src/services/api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';
const api = axios.create({ baseURL: API_BASE_URL });

// Set up interceptors if needed (optional)
// api.interceptors.response.use(
//   response => response,
//   error => {
//     // Handle errors globally
//     return Promise.reject(error);
//   }
// ); 

// AUTH
export const loginUser = async (data) => {
    try {
        return await api.post('/auth/login', data);
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const registerUser = async (data) => {
    try {
        return await api.post('/auth/register', data);
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

// DRIVERS
export const getDrivers = async () => {
    try {
        return await api.get('/drivers');
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const getDriverById = async (id) => {
    try {
        return await api.get(`/drivers/${id}`);
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const addDriver = async (data) => {
    try {
        return await api.post('/drivers', data);
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const updateDriver = async (id, data) => {
    try {
        return await api.put(`/drivers/${id}`, {
            driver_id: data.driver_id,
            username: data.username,
            password_hash: data.password_hash,
            email: data.email,
            license_number: data.license_number,
            phone_number: data.phone_number,
        });
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const deleteDriver = async (id) => {
    try {
        return await api.delete(`/drivers/${id}`);
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const findDriverByUsername = async (username) => {
    try {
        return await api.get(`/drivers/username/${username}`);
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

// FLEET
export const getFleet = async () => {
    try {
        return await api.get('/fleet');
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const addFleetVehicle = async (data) => {
    try {
        return await api.post('/fleet', data);
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const updateFleetVehicle = async (id, data) => {
    try {
        return await api.put(`/fleet/${id}`, data);
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const deleteFleetVehicle = async (id) => {
    try {
        return await api.delete(`/fleet/${id}`);
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const findFleetByChassis = async (chassisNumber) => {
    try {
        return await api.get(`/fleet/chassis/${chassisNumber}`);
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

// MAINTENANCE
export const getMaintenanceRecords = async () => {
    try {
        return await api.get('/maintenance');
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const addMaintenanceRecord = async (data) => {
    try {
        return await api.post('/maintenance', data);
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const updateMaintenanceRecord = async (id, data) => {
    try {
        return await api.put(`/maintenance/${id}`, data);
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const deleteMaintenanceRecord = async (id) => {
    try {
        return await api.delete(`/maintenance/${id}`);
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const findMaintenanceByVehicleId = async (vehicleId) => {
    try {
        return await api.get(`/maintenance/vehicle/${vehicleId}`);
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

// TRIPS
export const getTrips = async () => {
    try {
        return await api.get('/trip');
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const addTrip = async (data) => {
    try {
        return await api.post('/trip', data);
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const updateTrip = async (id, data) => {
    try {
        return await api.put(`/trip/${id}`, data);
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const deleteTrip = async (id) => {
    try {
        return await api.delete(`/trip/${id}`);
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const findTripsByDriverId = async (driverId) => {
    try {
        return await api.get(`/trip/driver/${driverId}`);
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export default api;
