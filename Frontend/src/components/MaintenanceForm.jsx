import React, { useState, useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import axios from 'axios';

const MaintenanceForm = () => {
  const [formData, setFormData] = useState({
    vehicle_id: '',
    driver_id: '',
    maintenance_date: '',
    description: '',
    cost: ''
  });
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);

  // Fetch maintenance records based on driver_id
  const fetchMaintenanceRecords = async (driverId) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/maintenance/driver/${driverId}`);
      setMaintenanceRecords(response.data);
    } catch (error) {
      console.error('Error fetching maintenance records:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/maintenance', formData);
      alert('Maintenance record submitted successfully');
      setFormData({
        vehicle_id: '',
        driver_id: '',
        maintenance_date: '',
        description: '',
        cost: ''
      });
      fetchMaintenanceRecords(formData.driver_id); // Refresh records after submit
    } catch (error) {
      console.error('Error submitting maintenance record:', error);
      alert('Failed to submit maintenance record');
    }
  };

  // Fetch records when driver_id changes
  useEffect(() => {
    if (formData.driver_id) {
      fetchMaintenanceRecords(formData.driver_id);
    }
  }, [formData.driver_id]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
    <Navbar/>
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg space-y-4">
      {/* Maintenance Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Vehicle ID</label>
          <input
            type="number"
            name="vehicle_id"
            value={formData.vehicle_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Driver ID</label>
          <input
            type="number"
            name="driver_id"
            value={formData.driver_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Maintenance Date</label>
          <input
            type="date"
            name="maintenance_date"
            value={formData.maintenance_date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Cost</label>
          <input
            type="number"
            step="0.01"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Submit Maintenance Record
        </button>
      </form>

      {/* Maintenance Records Table */}
      {maintenanceRecords.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Maintenance History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border">Vehicle ID</th>
                  <th className="px-4 py-2 border">Maintenance Date</th>
                  <th className="px-4 py-2 border">Description</th>
                  <th className="px-4 py-2 border">Cost</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="px-4 py-2 border">{record.vehicle_id}</td>
                    <td className="px-4 py-2 border">{new Date(record.maintenance_date).toLocaleDateString()}</td>
                    <td className="px-4 py-2 border">{record.description}</td>
                    <td className="px-4 py-2 border">{record.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default MaintenanceForm;
