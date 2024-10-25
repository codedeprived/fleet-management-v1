// routes/organization.js
const express = require('express');
const Organization = require('../models/Organization');

const router = express.Router();

// GET route to fetch all organizations
router.get('/', async (req, res) => {
  try {
    const organizations = await Organization.findAll();
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching organizations', error });
  }
});

// POST route to add a new organization
router.post('/', async (req, res) => {
  const { name, address, contact_number, email } = req.body;

  try {
    const newOrganization = await Organization.create({
      name,
      address,
      contact_number,
      email,
    });
    res.status(201).json(newOrganization);
  } catch (error) {
    res.status(500).json({ message: 'Error adding organization', error });
  }
});

module.exports = router;
