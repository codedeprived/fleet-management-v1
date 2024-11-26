// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { getDrivers, getFleet, getTrips, getMaintenanceRecords } from "../services/api";
import AnalyticsCard from "./AnalyticsCard";
import { useNavigate } from "react-router-dom"; // For navigation

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState({
    drivers: 0,
    fleet: 0,
    trips: 0,
    maintenance: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from APIs
    const fetchData = async () => {
      try {
        const [drivers, fleet, trips, maintenance] = await Promise.all([
          getDrivers(),
          getFleet(),
          getTrips(),
          getMaintenanceRecords(),
        ]);
        setAnalytics({
          drivers: drivers.data.length,
          fleet: fleet.data.length,
          trips: trips.data.length,
          maintenance: maintenance.data.length,
        });
      } catch (error) {
        console.error("Error fetching analytics data:", error.message);
      }
    };

    fetchData();
  }, []);

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
