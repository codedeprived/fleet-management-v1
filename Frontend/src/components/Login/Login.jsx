// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use react-router-dom's useNavigate
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        emailOrPhone: '',
        password: ''
    });

    const navigate = useNavigate(); // useNavigate to redirect

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Simulate login request (replace with actual API call)
            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.emailOrPhone, // Assume login via email
                    password: formData.password
                })
            });

            if (response.ok) {
                // Navigate to home page on successful login
                navigate('/home');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="login-container">
            <header>Login</header>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <label>Email/Phone Number</label>
                    <input
                        type="text"
                        name="emailOrPhone"
                        placeholder="Enter email or phone number"
                        value={formData.emailOrPhone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-field">
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
                <button type="button" className="forgot-btn">Forgot Password?</button>
            </form>
        </div>
    );
};

export default Login;
