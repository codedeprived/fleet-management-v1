import React, { useEffect, useState } from "react";
import { getDrivers, updateDriver } from "../../services/api";
import EditModal from "./EditModal";

const DrivesTable = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null); // Hold the data being edited
  const [showModal, setShowModal] = useState(false);

  // Fetch drivers data
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await getDrivers();
        setDrivers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  // Handle update
  const handleUpdate = async (id, updatedData) => {
    try {
      await updateDriver(id, updatedData);
      setDrivers((prevDrivers) =>
        prevDrivers.map((driver) =>
          driver.driver_id === id ? { ...driver, ...updatedData } : driver
        )
      );
      setShowModal(false);
    } catch (err) {
      alert("Error updating driver: " + err.message);
    }
  };

  // Driver fields (can be adjusted for any model)
  const fields = [
    { name: "username", label: "Username" },
    { name: "email", label: "Email" },
    { name: "license_number", label: "License Number" },
    { name: "phone_number", label: "Phone Number" },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-400">
        Drivers Table
      </h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Driver ID</th>
            <th scope="col" className="px-6 py-3">Username</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">License Number</th>
            <th scope="col" className="px-6 py-3">Phone Number</th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr
              key={driver.driver_id}
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
                <button
                  onClick={() => {
                    setEditData(driver);
                    setShowModal(true);
                  }}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <EditModal
          data={editData}
          fields={fields}
          onClose={() => setShowModal(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default DrivesTable;
