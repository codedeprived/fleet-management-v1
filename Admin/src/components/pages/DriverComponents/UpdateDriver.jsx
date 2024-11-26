import React, { useState } from "react";
import { updateDriver } from "../../../services/api";

const UpdateDriver = () => {
  const [formData, setFormData] = useState({
    driver_id: "",
    username: "",
    email: "",
    phone_number: "",
    license_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateDriver(formData.driver_id, formData);
      alert(`Driver updated: ${response.data.message}`);
    } catch (error) {
      console.error("Error updating driver:", error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Update Driver</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="driver_id"
          placeholder="Driver ID"
          value={formData.driver_id}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="text"
          name="license_number"
          placeholder="License Number"
          value={formData.license_number}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Update Driver
        </button>
      </form>
    </div>
  );
};

export default UpdateDriver;
