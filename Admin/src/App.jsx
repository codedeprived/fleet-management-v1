import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AnalyticsCard from "./components/AnalyticsCard"; // Reusable card component
import { getDrivers, getFleet, getTrips, getMaintenanceRecords } from "./services/api"; // Your API service functions

const App = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar state
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state
  const [analytics, setAnalytics] = useState({
    drivers: 0,
    fleet: 0,
    trips: 0,
    maintenance: 0,
  });

  // Toggle dark mode and update body class
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Set the initial theme based on localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  // Update theme in localStorage whenever dark mode state changes
  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Fetch analytics data from APIs
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
      } catch (error) {
        console.error("Error fetching analytics data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-10">
        <Navbar
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnalyticsCard
              title="Drivers"
              count={analytics.drivers}
              onClick={() => alert("Navigate to Drivers")}
              icon="🚗"
            />
            <AnalyticsCard
              title="Fleet"
              count={analytics.fleet}
              onClick={() => alert("Navigate to Fleet")}
              icon="🚙"
            />
            <AnalyticsCard
              title="Trips"
              count={analytics.trips}
              onClick={() => alert("Navigate to Trips")}
              icon="📍"
            />
            <AnalyticsCard
              title="Maintenance"
              count={analytics.maintenance}
              onClick={() => alert("Navigate to Maintenance")}
              icon="🔧"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
