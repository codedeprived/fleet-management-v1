import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminDashboard from "./components/AdminDashboard"; // Import dashboard component
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Import Routes and Route
import DrivesTable from "./components/Tables/DrivesTable";
import TableCard from "./components/Tables/TableCard";
import FleetTable from "./components/Tables/FleetTable"; // Import FleetTable
import TripsTable from "./components/Tables/TripsTable"; // Import TripsTable
import MaintenanceTable from "./components/Tables/MaintenanceTable"; // Import MaintenanceTable

const App = () => {
  const [isOpen, setIsOpen] = useState(false); // Dropdown menu state
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

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


  return (
    <>
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-1 pt-16">
        <div
          className={`flex-1 ${isOpen ? "pl-64" : "pl-0"
            } md:pl-64 p-6 overflow-y-auto`}
        >
          <main>
            <Routes>
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/drivers" element={<DrivesTable />} />
              <Route path="/fleet" element={<FleetTable />} />
              <Route path="/trips" element={<TripsTable />} />
              <Route path="/maintenance" element={<MaintenanceTable />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>
          <TableCard />
        </div>
      </div>
    </>
  );
};

export default App;