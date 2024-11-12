import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Redirect if user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message

    const apiUrl = process.env.REACT_APP_API_URL; // Use dynamic API URL from environment variable

    try {
      const response = await fetch('https://fleet-management-v1.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        const token = result.token; // Assuming the JWT token is in the "token" field
        localStorage.setItem('jwtToken', token); // Store token in local storage
        login(); // Update isAuthenticated to true
        console.log('Login successful:', result);
        navigate('/dashboard', { replace: true });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed. Please try again.');
        console.log('Login failed:', errorData);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <header>Login</header>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputField}>
          <label>Email/Phone Number</label>
          <input
            type="text"
            name="email"
            placeholder="Enter email or phone number"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputField}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
        <button type="submit">Login</button>
        <button className={styles.forgotBtn}>Forgot Password?</button>
        <button type="button" onClick={() => navigate('/registration')}>
          Register?
        </button>
      </form>
    </div>
  );
};

export default Login;
