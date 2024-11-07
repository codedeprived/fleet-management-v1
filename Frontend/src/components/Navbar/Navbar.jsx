import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Remove JWT token from localStorage
    localStorage.removeItem('jwtToken');
    
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-semibold">Fleet Manager</h1>
        
        {/* Hamburger Icon for Small Screens */}
        <button
          className="block md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Links for Desktop */}
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link to="/dashboard" className="hover:text-blue-200 transition">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/trip" className="hover:text-blue-200 transition">
              Trip
            </Link>
          </li>
          <li>
            <Link to="/maintenance" className="hover:text-blue-200 transition">
              Maintenance
            </Link>
          </li>
          {/* Logout Link */}
          <li>
            <Link
              to="/login"
              className="hover:text-blue-200 transition"
              onClick={handleLogout} // Logout action
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Dropdown Links for Mobile */}
      {isOpen && (
        <ul className="md:hidden mt-2 space-y-2 text-center bg-blue-700 p-4 rounded-lg">
          <li>
            <Link
              to="/dashboard"
              className="block text-white hover:text-blue-300 transition"
              onClick={toggleMenu}  // Close menu on link click
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/trip"
              className="block text-white hover:text-blue-300 transition"
              onClick={toggleMenu}
            >
              Trip
            </Link>
          </li>
          <li>
            <Link
              to="/maintenance"
              className="block text-white hover:text-blue-300 transition"
              onClick={toggleMenu}
            >
              Maintenance
            </Link>
          </li>
          {/* Logout Link for Mobile */}
          <li>
            <Link
              to="/login"
              className="block text-white hover:text-blue-300 transition"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
