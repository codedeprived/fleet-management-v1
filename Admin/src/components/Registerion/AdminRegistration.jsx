import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    reenter_password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.reenter_password) {
      toast.error('Passwords do not match!', { position: 'top-center' });
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password_hash: formData.password, // Ensure this is hashed in the backend
        }),
      });
      if (response.ok) {
        toast.success('Admin registered successfully! Redirecting to login...', {
          position: 'top-center',
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate('/admin/login');
        }, 1500);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Registration failed. Please try again.', {
          position: 'top-center',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred. Please try again.', { position: 'top-center' });
    }
  };

  return (
    <div
      className="relative flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/public/aiBackgroundImage.jpg')` }}
      >
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <ToastContainer />

      <div className="relative z-10 text-center text-white bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-white border-opacity-30 max-w-md w-full">
        <header className="text-4xl font-bold mb-6">Admin Register</header>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white bg-opacity-20 text-gray-100 placeholder-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white bg-opacity-20 text-gray-100 placeholder-gray-300"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white bg-opacity-20 text-gray-100 placeholder-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Re-enter Password</label>
            <input
              type="password"
              name="reenter_password"
              placeholder="Re-enter your password"
              value={formData.reenter_password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white bg-opacity-20 text-gray-100 placeholder-gray-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white rounded-md hover:bg-gradient-to-br"
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/login')}
            className="text-blue-300 hover:underline mt-4 block"
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegistration;
