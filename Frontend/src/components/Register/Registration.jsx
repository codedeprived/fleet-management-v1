import React, { useState } from 'react';
import './Registration.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    organization: '',
    username: '',
    email: '',
    phone_number: '',
    license_number: '',
    password: '',
    reenter_password: ''
  });

  const organizations = [
    "Organization A",
    "Organization B",
    "Organization C",
    "Organization D"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Registration successful:', result);
      } else {
        const errorData = await response.json(); // Get error details
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
              <div className="input-field">
                <label>Organization</label>
                <select name="organization" value={formData.organization} onChange={handleChange} required>
                  <option value="" disabled>Select organization</option>
                  {organizations.map((org, index) => (
                    <option key={index} value={org}>{org}</option>
                  ))}
                </select>
              </div>

              <div className="input-field">
                <label>Username</label>
                <input type="text" name="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} required />
              </div>

              <div className="input-field">
                <label>Email</label>
                <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="input-field">
                <label>Phone Number</label>
                <input type="tel" name="phone_number" placeholder="Enter mobile number" value={formData.phone_number} onChange={handleChange} required />
              </div>

              <div className="input-field">
                <label>License Number</label>
                <input type="text" name="license_number" placeholder="Enter license number" value={formData.license_number} onChange={handleChange} required />
              </div>

              <div className="input-field">
                <label>Password</label>
                <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
              </div>

              <div className="input-field">
                <label>Re-enter Password</label>
                <input type="password" name="reenter_password" placeholder="Re-enter your password" value={formData.reenter_password} onChange={handleChange} required />
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
