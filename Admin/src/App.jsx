import React, { useState } from "react"; // Import useState
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminDashboard from "./components/AdminDashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import DriverPage from "./components/pages/DriverPage";
import FleetPage from "./components/pages/FleetPage";
import SearchDriver from "./components/pages/DriverComponents/SearchDriver";
import AddNewFleet from "./components/pages/FleetComponents/AddFleet";
import DrivesTable from "./components/Tables/DrivesTable";
import FuelTable from "./components/Tables/FuelTable";
import TripsTable from "./components/Tables/TripsTable";
import MaintenanceTable from "./components/Tables/MaintenanceTable";
import FleetTable from "./components/Tables/FleetTable";
import Login from "./components/Login/Login";
import ProfilePage from "./components/Profile/ProfilePage";
import FuelPage from "./components/pages/FuelPage";
import AssignFleet from "./components/pages/FleetComponents/AssignFleet";
import UnassignDriver from "./components/pages/FleetComponents/UnassignDriver";
import AdminRegistration from "./components/Registerion/AdminRegistration";

const AuthenticatedLayout = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-1 pt-16">
        <div
          className={`flex-1 ${
            isOpen ? "pl-64" : "pl-0"
          } md:pl-64 p-6 overflow-y-auto`}
        >
          <Routes>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/drivers" element={<DriverPage />} />
            <Route path="/driver/show" element={<DrivesTable />} />
            <Route path="/driver/search" element={<SearchDriver />} />
            <Route path="/fleet" element={<FleetPage />} />
            <Route path="/fleet/add" element={<AddNewFleet />} />
            <Route path="/fleet/assign-driver" element={<AssignFleet />} />
            <Route path="/fleet/unassign-driver" element={<UnassignDriver />} />
            <Route path="/fleet/show" element={<FleetTable />} />
            <Route path="/trips" element={<TripsTable />} />
            <Route path="/fuel" element={<FuelPage />} />
            <Route path="/fuel/view" element={<FuelTable />} />
            <Route path="/maintenance" element={<MaintenanceTable />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/register" element={<AdminRegistration />} /> {/* New Registration Route */}

      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AuthenticatedLayout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
