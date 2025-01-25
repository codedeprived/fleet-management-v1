import React from "react";
import { useNavigate } from "react-router-dom";
import { FaList, FaSearch } from "react-icons/fa";
import FuelAnalytics from "../../components/Analytics/FuelAnalytics"; // Adjust the import path according to your file structure

const FuelPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Fuel Management
      </h1>

      {/* Fuel Analytics Component */}
      <FuelAnalytics />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {/* View All Fuel Logs Card */}
        <div
          className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg rounded-lg cursor-pointer hover:scale-105 transform transition duration-300 ease-in-out"
          onClick={() => handleNavigation("/fuel/view")}
        >
          <div className="flex items-center space-x-4">
            <FaList className="text-4xl" />
            <h2 className="text-2xl font-semibold">View All Fuel Logs</h2>
          </div>
          <p className="text-gray-200 mt-4">
            View the complete list of all fuel logs with detailed information.
          </p>
        </div>

        {/* Search Fuel Logs Card */}
        <div
          className="p-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg rounded-lg cursor-pointer hover:scale-105 transform transition duration-300 ease-in-out"
          onClick={() => handleNavigation("/fuel/search")}
        >
          <div className="flex items-center space-x-4">
            <FaSearch className="text-4xl" />
            <h2 className="text-2xl font-semibold">Search Fuel Logs</h2>
          </div>
          <p className="text-gray-200 mt-4">
            Search fuel logs by vehicle ID or name to find specific records.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FuelPage;
