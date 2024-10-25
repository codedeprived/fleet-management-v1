const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line
const { authenticateDatabase } = require('./config/db');
const authRoutes = require('./routes/auth');
const organizationRoutes  = require('./routes/organization')
const driverRoutes = require('./routes/driverRoutes');
const fleetROutes = require('./routes/fleetRoutes')
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Add this line to allow requests from your frontend
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/organizations', organizationRoutes); // Add the organization routes
app.use('/api/drivers', driverRoutes); // Add the driver routes 
app.use('/api/fleet', driverRoutes); // Add the driver routes 

// Define a route to handle GET requests to the root URL ('/')
app.get('/', (req, res) => {
  return res.send("API is working properly yup");
});

// Start the server and authenticate the database
app.listen(PORT, async () => {
  console.log(`Server started successfully on http://localhost:${PORT}`);
  await authenticateDatabase();
});
