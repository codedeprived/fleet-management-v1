import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const {login} = useAuth();

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
        const token = result.token; // Assuming the JWT token is in the "token" field
        localStorage.setItem('jwtToken', token); // Store token in local storage
        login();                                //  Update isAuthenticated to true
        console.log('Login successful:', result);
        console.log('Token-Content' , token )
        navigate('/dashboard', { replace: true });
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
          <button type="submit">Login</button>
          <button className={styles.forgotBtn}>Forgot Password?</button>
          <button type="button" onClick={() => navigate('/registration')}>
            Register?
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
