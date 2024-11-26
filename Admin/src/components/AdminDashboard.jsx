import React from "react";
import AnalyticsCard from "./AnalyticsCard";
import { useNavigate } from "react-router-dom";
import useFetchAnalytics from "../hooks/useFetchAnalytics"; // Import custom hook

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { analytics, loading, error } = useFetchAnalytics(); // Use custom hook

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <AnalyticsCard
        title="Drivers"
        count={analytics.drivers}
        onClick={() => navigate("/drivers")}
        icon="🚗"
      />
      <AnalyticsCard
        title="Fleet"
        count={analytics.fleet}
        onClick={() => navigate("/fleet")}
        icon="🚙"
      />
      <AnalyticsCard
        title="Trips"
        count={analytics.trips}
        onClick={() => navigate("/trips")}
        icon="📍"
      />
      <AnalyticsCard
        title="Maintenance"
        count={analytics.maintenance}
        onClick={() => navigate("/maintenance")}
        icon="🔧"
      />
    </div>
  );
};

export default AdminDashboard;
