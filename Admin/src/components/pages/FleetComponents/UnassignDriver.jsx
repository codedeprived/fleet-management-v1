import React, { useEffect, useState } from "react";
import {
  getFleet,
  getDriverById,
  updateFleetVehicle,
  unassignDriverFromFleet,
} from "../../../services/api";

const UnassignDriver = () => {
  const [fleet, setFleet] = useState([]);
  const [selectedFleetId, setSelectedFleetId] = useState("");
  const [assignedDriver, setAssignedDriver] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch fleet data on mount
  useEffect(() => {
    const fetchFleet = async () => {
      try {
        const response = await getFleet();
        setFleet(response.data);
      } catch (err) {
        setError("Failed to fetch fleet data.");
      }
    };

    fetchFleet();
  }, []);

  // Fetch assigned driver when a fleet vehicle is selected
  useEffect(() => {
    const fetchDriver = async () => {
      if (!selectedFleetId) {
        setAssignedDriver(null);
        return;
      }

      const selectedFleet = fleet.find(
        (f) => String(f.vehicle_id) === String(selectedFleetId)
      );

      if (selectedFleet?.driver_id) {
        try {
          const response = await getDriverById(selectedFleet.driver_id);

          // Ensure driver ID from fleet and response match correctly
          if (response?.data?.driver_id === selectedFleet.driver_id) {
            setAssignedDriver(response.data);
          } else {
            setAssignedDriver(null);
          }
        } catch (err) {
          console.error("Error fetching driver:", err);
          setAssignedDriver(null);
        }
      } else {
        setAssignedDriver(null);
      }
    };

    fetchDriver();
  }, [selectedFleetId, fleet]);

  const handleUnassign = async () => {
    if (!selectedFleetId) return;

    try {
      await unassignDriverFromFleet(selectedFleetId);
      console.log("ok");
      setMessage("Driver unassigned successfully! and updated");
      setError("");

      setFleet((prevFleet) =>
        prevFleet.map((vehicle) =>
          String(vehicle.vehicle_id) === String(selectedFleetId)
            ? { ...vehicle, driver_id: null }
            : vehicle
        )
      );
      setAssignedDriver(null);
    } catch (err) {
      console.error("Error unassigning driver:", err);
      setError("Failed to unassign driver.");
      setMessage("");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Unassign Driver from Fleet
      </h1>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block mb-2 font-medium">Select Fleet Vehicle</label>
        <select
          value={selectedFleetId}
          onChange={(e) => setSelectedFleetId(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select Vehicle --</option>
          {fleet.map((vehicle) => (
            <option key={vehicle.vehicle_id} value={vehicle.vehicle_id}>
              {vehicle.vehicle_type} - {vehicle.chassis_number}
            </option>
          ))}
        </select>
      </div>

      {selectedFleetId && (
        <div className="mb-6 p-4 border rounded bg-gray-100">
          <h2 className="text-lg font-semibold">Assigned Driver:</h2>
          {assignedDriver ? (
            <div className="mt-2 text-gray-700">
              <p>
                <strong>Name:</strong> {assignedDriver.username}
              </p>
              <p>
                <strong>Email:</strong> {assignedDriver.email}
              </p>
              <p>
                <strong>Phone:</strong> {assignedDriver.phone_number}
              </p>
            </div>
          ) : (
            <p className="text-yellow-600">No driver assigned.</p>
          )}
        </div>
      )}

      <button
        onClick={handleUnassign}
        disabled={!assignedDriver}
        className={`w-full py-2 rounded text-white font-semibold transition ${
          assignedDriver
            ? "bg-red-500 hover:bg-red-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Unassign Driver
      </button>
    </div>
  );
};

export default UnassignDriver;
