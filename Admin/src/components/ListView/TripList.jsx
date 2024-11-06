// src/components/ListView/TripList.jsx

import React, { useState, useEffect } from 'react';
import { getTrips } from '../../services/api';

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await getTrips();
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
      }
    };

    response
    fetchTrips();
  }, []);

  if (loading) return <p>Loading trips...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold">Trip List</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Driver ID</th>
            <th className="py-2 px-4">Vehicle ID</th>
            <th className="py-2 px-4">Start Date</th>
            <th className="py-2 px-4">End Date</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
        {trips.map(trip => (
  <tr key={trip.trip_id}>
    <td className="border px-4 py-2">{trip.trip_id}</td>
    <td className="border px-4 py-2">{trip.driver_id}</td>
    <td className="border px-4 py-2">{trip.vehicle_id}</td>
    <td className="border px-4 py-2">{trip.start_time}</td>
    <td className="border px-4 py-2">{trip.end_time}</td>
    <td className="border px-4 py-2">
      <button>Edit</button>
      <button>Delete</button>
    </td>
  </tr>
))}
        </tbody>
      </table>
    </div>
  );
};

export default TripList;
