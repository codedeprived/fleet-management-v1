// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import Registration from "./components/Register/Registration.jsx";
import Registeradmin from "./components/Registeradmin/Registeradmin.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/registerAdmin" element={<Registration />} />
      </Routes>
    </Router>
  );
}

export default App;
