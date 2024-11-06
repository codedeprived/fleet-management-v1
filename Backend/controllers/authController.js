const Driver = require('../models/Driver'); // Ensure correct import
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import JWT



// Register function
const register = async (req, res) => {
  const { username, email, phone_number, license_number, password } = req.body; // Removed organization_id
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new driver without organization_id
    const newDriver = await Driver.create({
      username,
      password_hash: hashedPassword,
      email,
      license_number,
      phone_number,
    });

    // Respond with success message
    return res.status(201).json({ message: 'Registration successful!', driver: newDriver });
  } catch (error) {
    console.error("Error registering driver:", error); // More detailed logging
    return res.status(500).json({ message: 'Error registering driver', error: error.message });
  }
};


// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const driver = await Driver.findOne({ where: { email } }); // Find the driver by email
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' }); // If driver is not found, return an error
    }

    const isPasswordValid = await bcrypt.compare(password, driver.password_hash); // Compare the password with the hashed password
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' }); // If passwords don't match, return an error
    }

    // Generate JWT token with driver ID and email
    const token = jwt.sign(
      { driver_id: driver.driver_id, username: driver.username, email: driver.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    return res.status(200).json({
      message: 'Login successful!',
      driver: { driver_id: driver.driver_id, username: driver.username, email: driver.email },
      token, // Send token in the response
    });
  } catch (error) {
    console.error('Error logging in driver:', error);
    return res.status(500).json({ message: 'Error logging in driver', error: error.message });
  }
};


module.exports = { register , login };
