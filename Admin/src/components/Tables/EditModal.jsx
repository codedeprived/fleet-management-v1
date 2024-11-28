import React, { useState } from "react";

const EditModal = ({ data, fields, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(data);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData.id || formData.driver_id, formData); // Adjust the ID field as needed
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">Edit Details</h2>
        <form onSubmit={handleSubmit}>
          {fields.map(({ name, label }) => (
            <div key={name} className="mb-4">
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {label}
              </label>
              <input
                type="text"
                id={name}
                name={name}
                value={formData[name] || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
