import React, { useEffect, useState } from "react";
import { getDrivers } from "../../services/api"; // Adjust the import path as necessary

const DrivesTable = () => {
  const [drivers, setDrivers] = useState([]); // State to hold driver data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage errors

  // Fetch drivers data from the API
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await getDrivers();
        setDrivers(response.data); // Assuming the API returns an array of drivers
      } catch (err) {
        setError(err.message); // Set error message if there's an error
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchDrivers();
  }, []);

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-400">Drivers Table</h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Driver ID
            </th>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              License Number
            </th>
            <th scope="col" className="px-6 py-3">
              Phone Number
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr
              key={driver.driver_id} // Assuming driver_id is unique
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {driver.driver_id}
              </th>
              <td className="px-6 py-4">{driver.username}</td>
              <td className="px-6 py-4">{driver.email}</td>
              <td className="px-6 py-4">{driver.license_number}</td>
              <td className="px-6 py-4">{driver.phone_number}</td>
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

export default DrivesTable;