import React, { useEffect, useState } from "react";
import { getFleet, updateFleetVehicle } from "../../services/api"; // Add `updateFleet` API
import EditModal from "./EditModal";

const FleetTable = () => {
  const [fleet, setFleet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null); // Data for editing
  const [showModal, setShowModal] = useState(false); // Modal visibility

  // Fetch fleet data
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

  // Handle update
  const handleUpdate = async (id, updatedData) => {
    try {
      await updateFleetVehicle(id, updatedData); // Call the updateFleet API
      setFleet((prevFleet) =>
        prevFleet.map((vehicle) =>
          vehicle.vehicle_id === id ? { ...vehicle, ...updatedData } : vehicle
        )
      );
      setShowModal(false); // Close modal on success
    } catch (err) {
      alert("Error updating vehicle: " + err.message);
    }
  };

  // Define fields for the fleet model
  const fields = [
    { name: "vehicle_type", label: "Vehicle Type" },
    { name: "chassis_number", label: "Chassis Number" },
    { name: "kilometers_driven", label: "Kilometers Driven" },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-400">
        Fleet Table
      </h1>
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
            <tr
              key={vehicle.vehicle_id}
              className="bg-white border-b dark:bg-gray-800"
            >
              <td className="px-6 py-4">{vehicle.vehicle_id}</td>
              <td className="px-6 py-4">{vehicle.vehicle_type}</td>
              <td className="px-6 py-4">{vehicle.chassis_number}</td>
              <td className="px-6 py-4">{vehicle.kilometers_driven}</td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => {
                    setEditData(vehicle); // Set data for editing
                    setShowModal(true); // Open modal
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

export default FleetTable;
