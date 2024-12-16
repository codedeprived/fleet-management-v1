// src/hooks/useFetchAnalytics.js
import { useState, useEffect } from "react";
import { getDrivers, getFleet, getTrips, getMaintenanceRecords, getAllFuelLogs } from "../services/api";

const useFetchAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    drivers: 0,
    fleet: 0,
    trips: 0,
    maintenance: 0,
    fuel: 0, // New field for fuel analytics
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [drivers, fleet, trips, maintenance, fuel] = await Promise.all([
          getDrivers(),
          getFleet(),
          getTrips(),
          getMaintenanceRecords(),
          getAllFuelLogs(), // Fetch fuel logs data
        ]);
        console.log(fuel);  // Log the fetched fuel data
        setAnalytics({
          drivers: drivers.data.length,
          fleet: fleet.data.length,
          trips: trips.data.length,
          maintenance: maintenance.data.length,
          fuel: fuel.data.length, // Assuming fuel data has a length property
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
