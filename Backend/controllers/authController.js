const Driver = require('../models/Driver'); // Ensure correct import
const bcrypt = require('bcrypt');

// Register function
const register = async (req, res) => {
  const { organization_id, username, email, phone_number, license_number, password } = req.body; // Use organization_id
  console.log(organization_id); // Log the organization_id for debugging
  try {
    // Check if the organization_id is provided
    if (!organization_id) {
      return res.status(400).json({ message: 'Organization ID is required.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new driver with the organization_id
    const newDriver = await Driver.create({
      organization_id, // Use organization_id directly from the request body
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
