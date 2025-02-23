import React, { useEffect, useState } from "react";
import {
  getFleet,
  getDriverById,
  updateFleetVehicle,
} from "../../services/api";
import EditModal from "./EditModal";

const FleetTable = () => {
  const [fleet, setFleet] = useState([]);
  const [drivers, setDrivers] = useState({}); // Store drivers as an object keyed by driver_id for quick lookup
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch fleet data and corresponding drivers
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fleetResponse = await getFleet();
        const fleetData = fleetResponse.data;

        // Fetch drivers based on driver_id in fleet data
        const driverPromises = fleetData.map((vehicle) =>
          vehicle.driver_id
            ? getDriverById(vehicle.driver_id)
            : Promise.resolve({ data: null })
        );

        const driverResponses = await Promise.all(driverPromises);
        const driversData = driverResponses.reduce((acc, response, index) => {
          const driver = response.data;
          if (driver) {
            acc[fleetData[index].driver_id] = driver;
          }
          return acc;
        }, {});

        setFleet(fleetData);
        setDrivers(driversData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle vehicle update
  const handleUpdate = async (id, updatedData) => {
    try {
      await updateFleetVehicle(id, updatedData);
      setFleet((prevFleet) =>
        prevFleet.map((vehicle) =>
          vehicle.vehicle_id === id ? { ...vehicle, ...updatedData } : vehicle
        )
      );
      setShowModal(false);
    } catch (err) {
      alert("Error updating vehicle: " + err.message);
    }
  };

  // Get driver details using drivers state
  const getDriverDetails = (driver_id) => {
    const driver = drivers[driver_id];
    return driver
      ? `${driver.username} (${driver.phone_number}, ${driver.email})`
      : "Not Assigned";
  };

  // Fleet model fields
  const fields = [
    { name: "vehicle_type", label: "Vehicle Type" },
    { name: "chassis_number", label: "Chassis Number" },
    { name: "kilometers_driven", label: "Kilometers Driven" },
    { name: "driver_id", label: "Assigned Driver (Driver ID)" },
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
            <th className="px-6 py-3">Assigned Driver</th>
            <th className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {fleet.map((vehicle) => (
            <tr
              key={vehicle.vehicle_id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">{vehicle.vehicle_id}</td>
              <td className="px-6 py-4">{vehicle.vehicle_type}</td>
              <td className="px-6 py-4">{vehicle.chassis_number}</td>
              <td className="px-6 py-4">{vehicle.kilometers_driven}</td>
              <td className="px-6 py-4">
                {getDriverDetails(vehicle.driver_id)}
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => {
                    setEditData(vehicle);
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

export default FleetTable;
