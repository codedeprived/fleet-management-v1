// src/components/ListView/MaintenanceList.jsx

import React, { useState, useEffect } from 'react';
import { getMaintenanceRecords } from '../../services/api';

const MaintenanceList = () => {
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaintenanceRecords = async () => {
      try {
        const response = await getMaintenanceRecords();
        setMaintenanceRecords(response.data);
      } catch (error) {
        console.error("Error fetching maintenance records:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceRecords();
  }, []);

  if (loading) return <p>Loading maintenance records...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold">Maintenance List</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Vehicle ID</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Cost</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
        {maintenanceRecords.map(record => (
  <tr key={record.maintenance_id}>
    <td className="border px-4 py-2">{record.vehicle_id}</td>
    <td className="border px-4 py-2">{record.description}</td>
    <td className="border px-4 py-2">{record.cost}</td>
    <td className="border px-4 py-2">{record.maintenance_date}</td>
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

export default MaintenanceList;
