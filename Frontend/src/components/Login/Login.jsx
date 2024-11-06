import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import styles from './Login.module.css';
import Navbar from '../Navbar/Navbar';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '', // Change the name to "email"
    password: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Login successful:', result);
        navigate('/dashboard', { replace: true }); // Redirect to the dashboard page
      } else {
        const errorData = await response.json();
        console.log('Login failed:', errorData);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className={styles.loginContainer}>
      <header>Login</header>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputField}>
          <label>Email/Phone Number</label>
          <input
            type="text"
            name="email" // Change the name to "email"
            placeholder="Enter email or phone number"
            value={formData.email} // Change this to "email"
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
        <button type="submit">Login</button>
        <button className={styles.forgotBtn}>Forgot Password?</button>
        <button onClick={()=>navigate('/registration')} >Register ?</button>
      </form>
    </div>
    </>
  );
};

export default Login;
