import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TripForm = () => {
  const [formData, setFormData] = useState({
    driver_id: '',
    start_location: '',
    end_location: '',
    start_time: '',
    end_time: '',
    distance_km: '',
    purpose: ''
  });
  const [tripRecords, setTripRecords] = useState([]);

  // Fetch trip records based on driver_id
  const fetchTripRecords = async (driverId) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/trip/driver/${driverId}`);
      setTripRecords(response.data);
    } catch (error) {
      console.error('Error fetching trip records:', error);
      // Optionally, handle error (e.g., show a message to the user)
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/trip', formData);
      alert('Trip record submitted successfully');
      // Clear form fields
      setFormData({
        driver_id: '',
        start_location: '',
        end_location: '',
        start_time: '',
        end_time: '',
        distance_km: '',
        purpose: ''
      });
      // Fetch updated trip records
      fetchTripRecords(formData.driver_id);
    } catch (error) {
      console.error('Error submitting trip record:', error);
      alert('Failed to submit trip record');
    }
  };

  // Fetch trip records when driver_id changes
  useEffect(() => {
    if (formData.driver_id) {
      fetchTripRecords(formData.driver_id);
    } else {
      setTripRecords([]); // Clear trip records if driver_id is empty
    }
  }, [formData.driver_id]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      {/* Trip Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <label className="block text-gray-700 font-medium mb-1">Start Location</label>
          <input
            type="text"
            name="start_location"
            value={formData.start_location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">End Location</label>
          <input
            type="text"
            name="end_location"
            value={formData.end_location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Start Time</label>
          <input
            type="datetime-local"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">End Time</label>
          <input
            type="datetime-local"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Distance (km)</label>
          <input
            type="number"
            step="0.01"
            name="distance_km"
            value={formData.distance_km}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Purpose</label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Submit Trip Record
        </button>
      </form>

      {/* Trip History Table */}
      {tripRecords.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Trip History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border">Trip ID</th>
                  <th className="px-4 py-2 border">Start Location</th>
                  <th className="px-4 py-2 border">End Location</th>
                  <th className="px-4 py-2 border">Start Time</th>
                  <th className="px-4 py-2 border">End Time</th>
                  <th className="px-4 py-2 border">Distance (km)</th>
                  <th className="px-4 py-2 border">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {tripRecords.map((trip) => (
                  <tr key={trip.trip_id}>
                    <td className="px-4 py-2 border">{trip.trip_id}</td>
                    <td className="px-4 py-2 border">{trip.start_location}</td>
                    <td className="px-4 py-2 border">{trip.end_location}</td>
                    <td className="px-4 py-2 border">{new Date(trip.start_time).toLocaleString()}</td>
                    <td className="px-4 py-2 border">{new Date(trip.end_time).toLocaleString()}</td>
                    <td className="px-4 py-2 border">{trip.distance_km}</td>
                    <td className="px-4 py-2 border">{trip.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripForm;
