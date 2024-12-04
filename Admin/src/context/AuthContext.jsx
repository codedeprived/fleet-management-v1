import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize isAuthenticated based on the presence of the token in localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('adminJwtToken');
    return !!token; // true if token exists, false otherwise
  });

  const login = (token) => {
    localStorage.setItem('adminJwtToken', token); // Save token to localStorage
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('adminJwtToken'); // Remove token from localStorage
    setIsAuthenticated(false);
  };

  // Check if the token is valid when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('adminJwtToken');
    if (!token) {
      setIsAuthenticated(false);
    } else {
      // Optionally, validate token here (e.g., decoding and checking expiration)
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
