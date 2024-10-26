const Driver = require('../models/Driver'); // Ensure correct import
const bcrypt = require('bcrypt');

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

module.exports = { register };
