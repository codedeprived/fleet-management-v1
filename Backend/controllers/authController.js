const { Driver } = require('../models/Driver'); // Adjust path as needed
const { Organization } = require('../models/Organization'); // Adjust path as needed
const bcrypt = require('bcrypt');

// Register function
const register = async (req, res) => {
  const { organization, username, email, phone_number, license_number, password } = req.body;

  try {
    // Check if organization exists
    let org = await Organization.findOne({ where: { name: organization } });

    // If organization not found, create a new one
    if (!org) {
      org = await Organization.create({
        name: organization,
        // Add other necessary fields, like address and contact_number
        address: 'Default Address', // Set a default or received value
        contact_number: '000-000-0000', // Set a default or received value
        email: 'default@example.com' // Set a default or received value
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new driver with the found or created organization ID
    const newDriver = await Driver.create({
      organization_id: org.organization_id, // Use organization ID from DB
      username,
      email,
      phone_number,
      license_number,
      password_hash: hashedPassword,
    });

    // Respond with success message
    return res.status(201).json({ message: 'Registration successful!', driver: newDriver });
  } catch (error) {
    console.error("Error registering driver:", error); // More detailed logging
    return res.status(500).json({ message: 'Error registering driver', error: error.message });
  }
};

module.exports = { register };
