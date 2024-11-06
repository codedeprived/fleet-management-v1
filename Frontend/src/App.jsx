// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import Registration from "./components/Register/Registration.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import DriverDashboard from "./pages/DriverDashboard/DriverDashboard.jsx";


function App() {
  return (
    <>
    {/* <Navbar/> */}
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<DriverDashboard/>} />

        {/* <Route path="/" element={<TestingCom />} /> */}
      </Routes>
    </Router>
    </>
  );
}

export default App;
