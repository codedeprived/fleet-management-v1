const Driver = require('../models/Driver');
const bcrypt = require('bcrypt');

/**
 * Register a new driver
 * @route POST /api/auth/registeration
 */
const register = async (req, res) => {
  const { username, email, phone_number, license_number, password } = req.body;

  try {
    // Check if the driver with the same email already exists
    const existingDriver = await Driver.findOne({ where: { email } });
    if (existingDriver) {
      return res.status(400).json({ message: 'Driver with this email already exists' });
    }

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
    return res.status(201).json({
      message: 'Registration successful!',
      driver: { id: newDriver.id, username: newDriver.username, email: newDriver.email }
    });
  } catch (error) {
    console.error('Error registering driver:', error);
    return res.status(500).json({ message: 'Error registering driver', error: error.message });
  }
};

/**
 * Login a driver
 * @route POST /api/auth/login
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the driver by email
    const driver = await Driver.findOne({ where: { email } });
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, driver.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Respond with success message
    return res.status(200).json({
      message: 'Login successful!',
      driver: { id: driver.id, username: driver.username, email: driver.email }
    });
  } catch (error) {
    console.error('Error logging in driver:', error);
    return res.status(500).json({ message: 'Error logging in driver', error: error.message });
  }
};

module.exports = {
  register,
  login
};
