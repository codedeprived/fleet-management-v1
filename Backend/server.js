// main server file (e.g., app.js or server.js)

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { authenticateDatabase, syncDatabase } = require('./config/db');
const authRoutes = require('./routes/auth');
const driverRoutes = require('./routes/driverRoutes');
const fleetRoutes = require('./routes/fleetRoutes'); 
const adminRoutes = require('./routes/adminRoutes');
const tripRoutes = require('./routes/tripRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5001;
const frontendUrl = process.env.FRONTEND_URL || 'https://fleet-management-v1-8l18r7dw0-codedepriveds-projects.vercel.app';
app.use(cors({
  origin: frontendUrl,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);  
app.use('/api/drivers', driverRoutes); 
app.use('/api/fleet', fleetRoutes); 
app.use('/api/admin', adminRoutes); 
app.use('/api/trip', tripRoutes); 
app.use('/api/maintenance', maintenanceRoutes); 

// Root Route
app.get('/', (req, res) => {
  return res.send("API is working properly yup");
});

// Start the server and authenticate the database
app.listen(PORT, async () => {
  console.log(`Server started successfully on ${process.env.BACKEND_URL || `http://localhost:${PORT}`}`);
  try {
    await authenticateDatabase();
    await syncDatabase(); // Sync the database models with the tables
  } catch (error) {
    console.error("Error during server setup:", error);
  }
});
