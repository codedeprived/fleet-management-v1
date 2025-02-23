import React, { useEffect, useState } from "react";
import {
  getFleet,
  getDrivers,
  assignDriverToFleet,
} from "../../../services/api";

const AssignFleet = () => {
  const [fleet, setFleet] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [unassignedDrivers, setUnassignedDrivers] = useState([]);
  const [selectedFleetId, setSelectedFleetId] = useState("");
  const [selectedDriverId, setSelectedDriverId] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fleetResponse, driversResponse] = await Promise.all([
          getFleet(),
          getDrivers(),
        ]);

        setFleet(fleetResponse.data);
        setDrivers(driversResponse.data);

        const assignedDriverIds = fleetResponse.data
          .filter((vehicle) => vehicle.driver_id)
          .map((vehicle) => vehicle.driver_id);

        const unassigned = driversResponse.data.filter(
          (driver) => !assignedDriverIds.includes(driver.driver_id)
        );

        setUnassignedDrivers(unassigned);
      } catch (err) {
        setErrorMessage("Failed to fetch data. Please try again.");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFleetId || !selectedDriverId) {
      setErrorMessage("Please select both fleet and driver.");
      return;
    }

    try {
      await assignDriverToFleet(selectedFleetId, selectedDriverId);
      setMessage("Driver assigned successfully!");
      setErrorMessage("");
      setSelectedFleetId("");
      setSelectedDriverId("");
    } catch (err) {
      setErrorMessage("Failed to assign driver. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Assign Driver to Fleet</h1>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Select Fleet</label>
          <select
            value={selectedFleetId}
            onChange={(e) => setSelectedFleetId(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">-- Select Fleet --</option>
            {fleet.map((vehicle) => (
              <option key={vehicle.vehicle_id} value={vehicle.vehicle_id}>
                {vehicle.vehicle_type} - {vehicle.chassis_number}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Select Unassigned Driver
          </label>
          <select
            value={selectedDriverId}
            onChange={(e) => setSelectedDriverId(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">-- Select Driver --</option>
            {unassignedDrivers.map((driver) => (
              <option key={driver.driver_id} value={driver.driver_id}>
                {driver.username} ({driver.phone_number}, {driver.email})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Assign Driver
        </button>
      </form>
    </div>
  );
};

export default AssignFleet;
