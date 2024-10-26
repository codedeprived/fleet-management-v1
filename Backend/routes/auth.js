// routes/auth.js
const express = require('express');
const { register } = require('../controllers/authController');

const router = express.Router();

// Registration route
router.post('/register', register);

module.exports = router;
