import React, { useEffect, useState } from "react";
import { getMaintenanceRecords } from "../../services/api";

const MaintenanceTable = () => {
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaintenanceRecords = async () => {
      try {
        const response = await getMaintenanceRecords();
        setMaintenanceRecords(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMaintenanceRecords();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800  dark:text-gray-400">Maintenance Table</h1>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Record ID</th>
            <th className="px-6 py-3">Vehicle ID</th>
            <th className="px-6 py-3">Driver ID</th>
            <th className="px-6 py-3">Maintenance Date</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Cost</th>
          </tr>
        </thead>
        <tbody>
          {maintenanceRecords.map((record) => (
            <tr key={record.record_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">{record.record_id}</td>
              <td className="px-6 py-4">{record.vehicle_id}</td>
              <td className="px-6 py-4">{record.driver_id}</td>
              <td className="px-6 py-4">{record.maintenance_date}</td>
              <td className="px-6 py-4">{record.description}</td>
              <td className="px-6 py-4">{record.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceTable;
