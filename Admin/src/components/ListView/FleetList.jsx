// src/components/ListView/FleetList.jsx

import React, { useState, useEffect } from 'react';
import { getFleet } from '../../services/api';

const FleetList = () => {
  const [fleet, setFleet] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFleet = async () => {
      try {
        const response = await getFleet();
        setFleet(response.data);
      } catch (error) {
        console.error("Error fetching fleet:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFleet();
  }, []);

  if (loading) return <p>Loading fleet data...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold">Fleet List</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Model</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
        {fleet.map(vehicle => (
  <tr key={vehicle.vehicle_id}>
    <td className="border px-4 py-2">{vehicle.vehicle_id}</td>
    <td className="border px-4 py-2">{vehicle.vehicle_type}</td>
    <td className="border px-4 py-2">{vehicle.kilometers_driven}</td>
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

export default FleetList;
