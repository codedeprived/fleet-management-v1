// routes/organization.js
const express = require('express');

// routes/organization.js
const {
  getAllOrganizations,
  addOrganization,
  updateOrganization,
  deleteOrganization,
  findOrganizationByName
} = require('../controllers/organizationController');

const router = express.Router();


// GET all organizations  ROUTE- http://localhost:5001/api/organizations
router.get('/', getAllOrganizations);

// POST a new organization  ROUTE-http://localhost:5001/api/organizations
router.post('/', addOrganization);

// PUT (update) an organization by ID  ROUTE-http://localhost:5001/api/organizations/id
router.put('/:id', updateOrganization);

// DELETE an organization by ID  ROUTE-http://localhost:5001/api/organizations/id
router.delete('/:id', deleteOrganization);

// GET an organization by name  ROUTE-http://localhost:5001/api/organizations/name/name of organization 
router.get('/name/:name', findOrganizationByName);


module.exports = router;
