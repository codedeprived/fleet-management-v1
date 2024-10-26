const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line
const { authenticateDatabase } = require('./config/db');
const authRoutes = require('./routes/auth');
const driverRoutes = require('./routes/driverRoutes');
const fleetRoutes = require('./routes/fleetRoutes'); // Fixed typo here
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Add this line to allow requests from your frontend
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/drivers', driverRoutes); // Add the driver routes 
app.use('/api/fleet', fleetRoutes); // Use the correct fleet routes

// Define a route to handle GET requests to the root URL ('/')
app.get('/', (req, res) => {
  return res.send("API is working properly yup");
});

// Start the server and authenticate the database
app.listen(PORT, async () => {
  console.log(`Server started successfully on http://localhost:${PORT}`);
  await authenticateDatabase();
});
