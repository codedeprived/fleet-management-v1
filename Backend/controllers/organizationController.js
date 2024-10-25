const Organization = require('../models/Organization');

/**
 * Fetch all organizations from the database.
 * This function retrieves all records from the 'organizations' table and returns them as JSON.
 * Handles potential errors, such as database connection issues.
 */
const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.findAll();
    res.status(200).json(organizations);
  } catch (error) {
    console.error('Error fetching organizations:', error); // Logging for debugging
    res.status(500).json({
      message: 'An error occurred while fetching organizations. Please try again later.',
      error: error.message,
    });
  }
};

/**
 * Add a new organization to the database.
 * This function creates a new organization based on the provided request body.
 * Validates required fields and returns the created organization if successful.
 */
const addOrganization = async (req, res) => {
  const { name, address, contact_number, email } = req.body;

  // Basic validation to ensure all required fields are present
  if (!name || !address || !contact_number || !email) {
    return res.status(400).json({ message: 'All fields (name, address, contact number, email) are required.' });
  }

  try {
    // Check if organization with the same email already exists
    const existingOrganization = await Organization.findOne({ where: { email } });
    if (existingOrganization) {
      return res.status(409).json({ message: 'An organization with this email already exists.' });
    }

    const newOrganization = await Organization.create({
      name,
      address,
      contact_number,
      email,
    });

    res.status(201).json(newOrganization);
  } catch (error) {
    console.error('Error adding organization:', error); // Logging for debugging
    res.status(500).json({
      message: 'An error occurred while adding the organization. Please try again later.',
      error: error.message,
    });
  }
};

/**
 * Update an organization by ID.
 * This function updates an organization's details based on the provided ID and request body.
 * If the organization is not found, returns a 404 status.
 */
const updateOrganization = async (req, res) => {
  const { id } = req.params;
  const { name, address, contact_number, email } = req.body;

  try {
    const organization = await Organization.findByPk(id);
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found.' });
    }

    // Update only fields that are provided in the request body
    organization.name = name || organization.name;
    organization.address = address || organization.address;
    organization.contact_number = contact_number || organization.contact_number;
    organization.email = email || organization.email;

    await organization.save();
    res.status(200).json(organization);
  } catch (error) {
    console.error('Error updating organization:', error); // Logging for debugging
    res.status(500).json({
      message: 'An error occurred while updating the organization. Please try again later.',
      error: error.message,
    });
  }
};

/**
 * Delete an organization by ID.
 * This function deletes an organization based on the provided ID.
 * If the organization is not found, returns a 404 status.
 */
const deleteOrganization = async (req, res) => {
  const { id } = req.params;

  try {
    const organization = await Organization.findByPk(id);
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found.' });
    }

    await organization.destroy();
    res.status(200).json({ message: 'Organization deleted successfully.' });
  } catch (error) {
    console.error('Error deleting organization:', error); // Logging for debugging
    res.status(500).json({
      message: 'An error occurred while deleting the organization. Please try again later.',
      error: error.message,
    });
  }
};

/**
 * Find an organization by name.
 * This function searches for an organization based on the provided name.
 * If the organization is not found, returns a 404 status.
 */
const findOrganizationByName = async (req, res) => {
  const { name } = req.params;

  try {
    const organization = await Organization.findOne({ where: { name } });
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found.' });
    }

    res.status(200).json(organization);
  } catch (error) {
    console.error('Error finding organization:', error); // Logging for debugging
    res.status(500).json({
      message: 'An error occurred while finding the organization. Please try again later.',
      error: error.message,
    });
  }
};

module.exports = {
  getAllOrganizations,
  addOrganization,
  updateOrganization,
  deleteOrganization,
  findOrganizationByName,
};
