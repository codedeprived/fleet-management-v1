import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

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
     <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
    </>
  );
};

export default App;