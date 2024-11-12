const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line
const { authenticateDatabase } = require('./config/db');
const authRoutes = require('./routes/auth');
const driverRoutes = require('./routes/driverRoutes');
const fleetRoutes = require('./routes/fleetRoutes'); 
const adminRoutes = require('./routes/adminRoutes');
const tripRoutes = require('./routes/tripRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' })); // Allow requests from the frontend (can be configured in .env)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);  
app.use('/api/drivers', driverRoutes); 
app.use('/api/fleet', fleetRoutes); 
app.use('/api/admin', adminRoutes); 
app.use('/api/trip', tripRoutes); 
app.use('/api/maintenance', maintenanceRoutes); 

// Define a route to handle GET requests to the root URL ('/')
app.get('/', (req, res) => {
  return res.send("API is working properly yup");
});

// Start the server and authenticate the database
app.listen(PORT, async () => {
  console.log(`Server started successfully on http://localhost:${PORT}`);
  await authenticateDatabase();
});
