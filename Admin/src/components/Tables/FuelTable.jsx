import React, { useEffect, useState } from "react";
import { getAllFuelLogs, updateFuelLog } from "../../services/api";
import EditModal from "./EditModal";

const FuelTable = () => {
  const [fuelLogs, setFuelLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null); // Hold the data being edited
  const [showModal, setShowModal] = useState(false);

  // Fetch fuel logs data
  useEffect(() => {
    const fetchFuelLogs = async () => {
      try {
        const response = await getAllFuelLogs();
        setFuelLogs(response.data); // Assuming the response contains the data correctly
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFuelLogs();
  }, []);

  // Handle update
  const handleUpdate = async (id, updatedData) => {
    try {
      await updateFuelLog(id, updatedData);
      setFuelLogs((prevFuelLogs) =>
        prevFuelLogs.map((log) =>
          log.fuel_id === id ? { ...log, ...updatedData } : log
        )
      );
      setShowModal(false);
    } catch (err) {
      alert("Error updating fuel log: " + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-400">
        Fuel Logs Table
      </h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Fuel ID
            </th>
            <th scope="col" className="px-6 py-3">
              Vehicle ID
            </th>
            <th scope="col" className="px-6 py-3">
              Driver ID {/* Added column for Driver ID */}
            </th>
            <th scope="col" className="px-6 py-3">
              Fuel Amount (Liters)
            </th>
            <th scope="col" className="px-6 py-3">
              Fuel Cost
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {fuelLogs.map((log) => (
            <tr
              key={log.fuel_id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {log.fuel_id}
              </th>
              <td className="px-6 py-4">{log.vehicle_id}</td>
              <td className="px-6 py-4">{log.driver_id}</td>{" "}
              {/* Display Driver ID */}
              <td className="px-6 py-4">{log.fuel_in_liters}</td>{" "}
              {/* Updated field */}
              <td className="px-6 py-4">{log.cost}</td> {/* Updated field */}
              <td className="px-6 py-4">{log.created_at}</td>{" "}
              {/* Updated field */}
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => {
                    setEditData(log);
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
          fields={[
            { name: "fuel_in_liters", label: "Fuel Amount" },
            { name: "cost", label: "Fuel Cost" },
            { name: "created_at", label: "Date" },
          ]}
          onClose={() => setShowModal(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default FuelTable;
