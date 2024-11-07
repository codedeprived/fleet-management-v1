// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import Registration from "./components/Register/Registration.jsx";
import DriverDashboard from "./pages/DriverDashboard/DriverDashboard.jsx";
import TripForm from "./components/TripForm.jsx";
import MaintenanceForm from "./components/MaintenanceForm.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<DriverDashboard />} />
        <Route path="/trip" element={<TripForm />} />
        <Route path="/maintenance" element={<MaintenanceForm />} />
      </Routes>
    </Router>
  );
}

export default App;
