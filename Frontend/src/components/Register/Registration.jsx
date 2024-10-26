import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Registration.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    license_number: '',
    password: '',
    reenter_password: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send form data to the API
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Registration successful:', result);
        navigate('/login'); // Redirect to login page
      } else {
        const errorData = await response.json();
        console.log('Registration failed:', response.statusText, errorData);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container">
      <header>Registration</header>
      <form onSubmit={handleSubmit}>
        <div className="form first">
          <div className="details personal">
            <span className="title">Personal Details</span>
            <div className="fields">
              {/* Other form fields */}
              <div className="input-field">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-field">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone_number"
                  placeholder="Enter mobile number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-field">
                <label>License Number</label>
                <input
                  type="text"
                  name="license_number"
                  placeholder="Enter license number"
                  value={formData.license_number}
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

              <div className="input-field">
                <label>Re-enter Password</label>
                <input
                  type="password"
                  name="reenter_password"
                  placeholder="Re-enter your password"
                  value={formData.reenter_password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <button className="submit" type="submit">
            <span className="btnText">Submit</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
