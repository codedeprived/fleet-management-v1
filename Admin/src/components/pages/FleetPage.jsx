import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTruck,
  FaPlus,
  FaRegListAlt,
  FaUserPlus,
  FaUserMinus,
} from "react-icons/fa"; // Add icons for visual appeal

const FleetPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Fleet Management
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Add New Fleet Card */}
        <div
          className="p-6 bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg rounded-lg cursor-pointer hover:scale-105 transform transition duration-300 ease-in-out"
          onClick={() => handleNavigation("/fleet/add")}
        >
          <div className="flex items-center space-x-4">
            <FaPlus className="text-4xl" />
            <h2 className="text-2xl font-semibold">Add New Fleet</h2>
          </div>
          <p className="text-gray-200 mt-4">
            Add a new vehicle to the fleet with detailed information.
          </p>
        </div>

        {/* View Fleet List Card */}
        <div
          className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg rounded-lg cursor-pointer hover:scale-105 transform transition duration-300 ease-in-out"
          onClick={() => handleNavigation("/fleet/show")}
        >
          <div className="flex items-center space-x-4">
            <FaRegListAlt className="text-4xl" />
            <h2 className="text-2xl font-semibold">View Fleet</h2>
          </div>
          <p className="text-gray-200 mt-4">
            View the list of all registered vehicles in the fleet.
          </p>
        </div>

        {/* Fleet Overview Card */}
        <div
          className="p-6 bg-gradient-to-r from-teal-500 to-green-600 text-white shadow-lg rounded-lg cursor-pointer hover:scale-105 transform transition duration-300 ease-in-out"
          onClick={() => handleNavigation("/fleet/overview")}
        >
          <div className="flex items-center space-x-4">
            <FaTruck className="text-4xl" />
            <h2 className="text-2xl font-semibold">Fleet Overview</h2>
          </div>
          <p className="text-gray-200 mt-4">
            Get a detailed overview of fleet performance, maintenance, and more.
          </p>
        </div>

        {/* Assign Driver to Fleet Card */}
        <div
          className="p-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg rounded-lg cursor-pointer hover:scale-105 transform transition duration-300 ease-in-out"
          onClick={() => handleNavigation("/fleet/assign-driver")}
        >
          <div className="flex items-center space-x-4">
            <FaUserPlus className="text-4xl" />
            <h2 className="text-2xl font-semibold">Assign Driver</h2>
          </div>
          <p className="text-gray-200 mt-4">
            Assign a driver to a vehicle in the fleet.
          </p>
        </div>
        <div
          className="p-6 bg-gradient-to-r from-red-500 to-yellow-500 text-white shadow-lg rounded-lg cursor-pointer hover:scale-105 transform transition duration-300 ease-in-out"
          onClick={() => handleNavigation("/fleet/unassign-driver")}
        >
          <div className="flex items-center space-x-4">
            <FaUserMinus className="text-4xl" />
            <h2 className="text-2xl font-semibold">Unassign Driver</h2>
          </div>
          <p className="text-gray-200 mt-4">
            Remove the assigned driver from a vehicle in the fleet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FleetPage;
