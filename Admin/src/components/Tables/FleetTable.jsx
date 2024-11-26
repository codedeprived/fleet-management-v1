import React, { useEffect, useState } from "react";
import { getFleet } from "../../services/api";

const FleetTable = () => {
  const [fleet, setFleet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFleet = async () => {
      try {
        const response = await getFleet();
        setFleet(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFleet();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className=" relative overflow-x-auto shadow-md sm:rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-400">Fleet Table</h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Vehicle ID</th>
            <th className="px-6 py-3">Vehicle Type</th>
            <th className="px-6 py-3">Chassis Number</th>
            <th className="px-6 py-3">Kilometers Driven</th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {fleet.map((vehicle) => (
            <tr key={vehicle.vehicle_id} className="bg-white border-b dark:bg-gray-800">
              <td className="px-6 py-4">{vehicle.vehicle_id}</td>
              <td className="px-6 py-4">{vehicle.vehicle_type}</td>
              <td className="px-6 py-4">{vehicle.chassis_number}</td>
              <td className="px-6 py-4">{vehicle.kilometers_driven}</td>
              <td className="px-6 py-4 text-right">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FleetTable;
