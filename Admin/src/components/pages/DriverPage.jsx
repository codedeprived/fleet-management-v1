import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaSearch } from "react-icons/fa"; // Add icons for visual appeal

const DriverPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Driver Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Show Drivers Card */}
        <div
          className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg rounded-lg cursor-pointer hover:scale-105 transform transition duration-300 ease-in-out"
          onClick={() => handleNavigation("/driver/show")}
        >
          <div className="flex items-center space-x-4">
            <FaUsers className="text-4xl" />
            <h2 className="text-2xl font-semibold">Show Drivers</h2>
          </div>
          <p className="text-gray-200 mt-4">
            View all registered drivers in a table format with their details.
          </p>
        </div>

        {/* Search Driver Card */}
        <div
          className="p-6 bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg rounded-lg cursor-pointer hover:scale-105 transform transition duration-300 ease-in-out"
          onClick={() => handleNavigation("/driver/search")}
        >
          <div className="flex items-center space-x-4">
            <FaSearch className="text-4xl" />
            <h2 className="text-2xl font-semibold">Search Driver</h2>
          </div>
          <p className="text-gray-200 mt-4">
            Search for a specific driver by ID or username to manage their details.
          </p>
        </div>

      </div>
    </div>
  );
};

export default DriverPage;
