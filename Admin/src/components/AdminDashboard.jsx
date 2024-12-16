import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaTruck, FaRoute, FaWrench, FaGasPump } from "react-icons/fa"; // Added FaGasPump for Fuel Logs
import useFetchAnalytics from "../hooks/useFetchAnalytics"; // Custom hook for fetching analytics data
import AnalyticsCard from "./AnalyticsCard"; // Import the AnalyticsCard component

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { analytics, loading, error } = useFetchAnalytics(); // Using the custom hook for real-time analytics data

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">
        Admin Dashboard
      </h1>
      <div className="flex flex-wrap justify-center gap-8">
        {/* Drivers Analytics Card */}
        <AnalyticsCard
          title="Drivers"
          count={analytics.drivers}
          onClick={() => navigate("/drivers")}
          icon={<FaUsers className="text-4xl text-teal-600" />}
          cardClass="bg-gradient-to-r from-teal-500 to-green-600"
        />

        {/* Fleet Analytics Card */}
        <AnalyticsCard
          title="Fleet"
          count={analytics.fleet}
          onClick={() => navigate("/fleet")}
          icon={<FaTruck className="text-4xl text-blue-600" />}
          cardClass="bg-gradient-to-r from-blue-500 to-indigo-600"
        />

        {/* Trips Analytics Card */}
        <AnalyticsCard
          title="Trips"
          count={analytics.trips}
          onClick={() => navigate("/trips")}
          icon={<FaRoute className="text-4xl text-yellow-600" />}
          cardClass="bg-gradient-to-r from-yellow-500 to-orange-600"
        />

        {/* Maintenance Analytics Card */}
        <AnalyticsCard
          title="Maintenance"
          count={analytics.maintenance}
          onClick={() => navigate("/maintenance")}
          icon={<FaWrench className="text-4xl text-purple-600" />}
          cardClass="bg-gradient-to-r from-purple-500 to-pink-600"
        />

        {/* Fuel Logs Analytics Card */}
        <AnalyticsCard
          title="Fuel Logs"
          count={analytics.fuel}
          onClick={() => navigate("/fuel")}
          icon={<FaGasPump className="text-4xl text-red-600" />}
          cardClass="bg-gradient-to-r from-red-500 to-orange-600"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
