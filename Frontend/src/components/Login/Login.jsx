// Login.jsx
import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        emailOrPhone: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log(formData);
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
                <button className="forgot-btn">Forgot Password?</button>
            </form>
        </div>
    );
};

export default Login;
