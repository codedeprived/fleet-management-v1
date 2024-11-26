// src/hooks/useFetchAnalytics.js
import { useState, useEffect } from "react";
import { getDrivers, getFleet, getTrips, getMaintenanceRecords } from "../services/api";

const useFetchAnalytics = () => {
    
  const [analytics, setAnalytics] = useState({
    drivers: 0,
    fleet: 0,
    trips: 0,
    maintenance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { analytics, loading, error };
};

export default useFetchAnalytics;
