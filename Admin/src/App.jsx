import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminDashboard from "./components/AdminDashboard"; // Import dashboard component
import { useState, useEffect } from "react";
import { Routes, Route,Navigate  } from "react-router-dom"; // Import Routes and Route


const App = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar state
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

  // Toggle dark mode
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
    <div className="flex flex-col h-screen">
      <div className="fixed top-0 left-0 w-full z-10">
        <Navbar
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      <div className="flex flex-1 pt-16">

        {/* Render AdminDashboard */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/dashboard" />} /> 
          </Routes>
        </main>
      </div>
    </div>
    </>
  );
};

export default App;
