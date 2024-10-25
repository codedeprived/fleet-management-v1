import React, { useState } from 'react'
import './Registeradmin.css'
import { assets } from '../../assets/assets.js'
import { Input } from 'postcss'

const Registeradmin =({ setShowLogin }) => {
    const [currState, setCurrtState] = useState("Login");
  
    // List of organizations for the dropdown menu
    const organizations = ["FleetX", "GoFleet", "TranspoCorp", "MoveIt Logistics"];
  
    return (
      <div className='login-popup'>
        <form className='login-popup-container'>
          <div className="login-popup-titile">
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
          </div>
  
          <div className="login-popup-inputs">
            {currState === "Login" && (
              <>
                {/* Organization dropdown */}
                <select required>
                  <option value="">Select Organization</option>
                  {organizations.map((org, index) => (
                    <option key={index} value={org}>{org}</option>
                  ))}
                </select>
  
                {/* Side-by-side fields for Username and Phone Number */}
                <div className="input-group">
                  <input type='text' placeholder='Username' required />
                  <input type='text' placeholder='Phone Number' required />
                </div>
  
                {/* Side-by-side fields for Email and License Number */}
                <div className="input-group">
                  <input type="email" placeholder='Your Email' required />
                  <input type="text" placeholder='License Number' required />
                </div>
  
                {/* Password and Re-enter password (full width for the last input) */}
                <input type="password" placeholder='Password' required />
                <input type="password" placeholder='Re-enter Password' required />
              </>
            )}
  
            {currState === "Sign up" && (
              <>
                <input type="text" placeholder='Email or Phone Number' required />
                <input type="password" placeholder='Password' required />
              </>
            )}
          </div>
  
          <button type="submit">{currState === "Login" ? "Login" : "Sign Up"}</button>
  
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
  
          {currState === "Login" ? (
            <p>Create a new Account. <span onClick={() => setCurrtState("Sign up")}>Click here</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setCurrtState("Login")}>Login here</span></p>
          )}
        </form>
      </div>
    );
  };
  

export default Registeradmin
