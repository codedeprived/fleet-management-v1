import React, { useEffect, useState } from "react";
import { getTrips } from "../../services/api";

const TripsTable = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await getTrips();
        setTrips(response.data); // Assuming the API returns an array of trips
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-400">Trips Table</h1>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Trip ID</th>
            <th className="px-6 py-3">Driver ID</th>
            <th className="px-6 py-3">Start Location</th>
            <th className="px-6 py-3">End Location</th>
            <th className="px-6 py-3">Distance (km)</th>
            <th className="px-6 py-3">Purpose</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.trip_id} className="bg-white border-b dark:bg-gray-800">
              <td className="px-6 py-4">{trip.trip_id}</td>
              <td className="px-6 py-4">{trip.driver_id}</td>
              <td className="px-6 py-4">{trip.start_location}</td>
              <td className="px-6 py-4">{trip.end_location}</td>
              <td className="px-6 py-4">{trip.distance_km}</td>
              <td className="px-6 py-4">{trip.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TripsTable;
