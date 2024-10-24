// Inside your models/index.js or wherever you initialize Sequelize models

const Admin = require('./Admin');
const Driver = require('./Driver');
const Organization = require('./Organization');
const Fleet = require('./Fleet');
const Trip = require('./Trip');
const Maintenance = require('./Maintenance');

// Associations
Organization.hasMany(Admin, { foreignKey: 'organization_id' });
Organization.hasMany(Driver, { foreignKey: 'organization_id' });
Organization.hasMany(Fleet, { foreignKey: 'organization_id' });

Driver.hasMany(Trip, { foreignKey: 'driver_id' });
Driver.hasMany(Maintenance, { foreignKey: 'driver_id' });

Fleet.hasMany(Maintenance, { foreignKey: 'vehicle_id' });
Fleet.belongsTo(Driver, { foreignKey: 'driver_id' });

Trip.belongsTo(Driver, { foreignKey: 'driver_id' });
Maintenance.belongsTo(Driver, { foreignKey: 'driver_id' });
Maintenance.belongsTo(Fleet, { foreignKey: 'vehicle_id' });
