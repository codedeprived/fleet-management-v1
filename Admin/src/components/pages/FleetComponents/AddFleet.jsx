import React, { useState } from "react";
import { addFleetVehicle } from "../../../services/api"; // Use your API function

const AddNewFleet = () => {
  const [fleetData, setFleetData] = useState({
    vehicle_type: "",
    chassis_number: "",
    kilometers_driven: "",
  });
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFleetData({ ...fleetData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(fleetData);
      const response = await addFleetVehicle(fleetData); // Call the API function
      setMessage("Fleet added successfully!");
      setErrorMessage("");
      console.log("Fleet added:", response.data);
      // Reset the form fields
      setFleetData({
        vehicle_type: "",
        chassis_number: "",
        kilometers_driven: "",
      });
    } catch (error) {
      console.error("Error adding fleet:", error);
      setMessage("");
      setErrorMessage(
        error.response?.data?.message || "Failed to add fleet. Please try again."
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Fleet</h1>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Vehicle Type</label>
          <input
            type="text"
            name="vehicle_type"
            value={fleetData.vehicle_type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Chassis Number</label>
          <input
            type="text"
            name="chassis_number"
            value={fleetData.chassis_number}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Kilometers Driven</label>
          <input
            type="number"
            name="kilometers_driven"
            value={fleetData.kilometers_driven}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Fleet
        </button>
      </form>
    </div>
  );
};

export default AddNewFleet;
