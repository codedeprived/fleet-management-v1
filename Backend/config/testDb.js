// Backend/config/testDb.js
const { sequelize, authenticateDatabase, syncDatabase } = require('./db'); // Adjust path as needed
const Admin = require('../models/Admin'); // Adjusted path
const Driver = require('../models/Driver'); // Adjusted path
const Organization = require('../models/Organization'); // Adjusted path
const Fleet = require('../models/Fleet'); // Adjusted path
const Trip = require('../models/Trip'); // Adjusted path
const Maintenance = require('../models/Maintenance'); // Adjusted path

const testDatabase = async () => {
  try {
    await authenticateDatabase(); // Authenticate database connection

    // Sync the models in the correct order
    await Organization.sync({ force: true }); // First sync Organizations
    console.log('Organizations table created.');

    await Admin.sync({ force: true }); // Then sync Admins
    console.log('Admins table created.');

    await Driver.sync({ force: true }); // Then sync Drivers
    console.log('Drivers table created.');

    await Fleet.sync({ force: true }); // Then sync Fleets
    console.log('Fleets table created.');

    await Trip.sync({ force: true }); // Then sync Trips
    console.log('Trips table created.');

    await Maintenance.sync({ force: true }); // Finally sync Maintenance
    console.log('Maintenance table created.');

    // Create sample data for organizations with all fields
    const organization = await Organization.create({
      name: 'Test Organization',
      address: '123 Test St',
      contact_number: '123-456-7890',
      email: 'testorg@example.com',
      created_at: new Date(), // You can also omit this as it's auto-generated
    });

    // Create sample admin linked to the organization
    const admin = await Admin.create({
      organization_id: organization.organization_id, // Use the ID from the created organization
      username: 'adminUser',
      password_hash: 'hashedPassword123',
      email: 'admin@example.com',
    });

    console.log('Admin created successfully:', admin.toJSON());

  } catch (error) {
    console.error('Error in database operations:', error);
  } finally {
    await sequelize.close(); // Close connection after operations
    console.log('Database connection closed.');
  }
};

testDatabase();
