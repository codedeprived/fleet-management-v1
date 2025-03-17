import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        const token = result.token; // JWT token from response
        localStorage.setItem('adminJwtToken', token); // Store admin token
        login(); // Update isAuthenticated to true
        toast.success('Admin login successful! Redirecting...', {
          position: 'top-center',
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate('/dashboard', { replace: true }); // Redirect to admin dashboard
        }, 1500); // Delay navigation for toast display
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Login failed. Please try again.', {
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', {
        position: 'top-center',
      });
    }
  };

  return (
    <div
      className="relative flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/public/istockphoto-1500466535-1024x1024.jpg')` }}
    >
      {/* Background Blur */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Glassy Login Form */}
      <div className="relative z-10 text-center text-white bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-white border-opacity-30 max-w-md w-full">
        <header className="text-4xl font-bold mb-6">Admin Login</header>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white bg-opacity-20 text-gray-100 placeholder-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white bg-opacity-20 text-gray-100 placeholder-gray-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-md hover:bg-gradient-to-br focus:outline-none"
          >
            Login
          </button>
          <button
            type="button"
            className="text-blue-300 hover:underline mt-2"
          >
            Forgot Password?
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/register')}
            className="w-full py-2 mt-4 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white rounded-md hover:bg-gradient-to-br focus:outline-none"
          >
            Register?
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
