// src/components/AdminDashboard/MainView.jsx

import React from 'react';
import DriverList from '../ListView/DriverList';
import FleetList from '../ListView/FleetList';
import MaintenanceList from '../ListView/MaintenanceList';
import TripList from '../ListView/TripList';

const MainView = ({ selectedSection }) => {
  return (
    <div className="w-4/5 p-4">
      {selectedSection === 'drivers' && <DriverList />}
      {selectedSection === 'fleet' && <FleetList />}
      {selectedSection === 'maintenance' && <MaintenanceList />}
      {selectedSection === 'trips' && <TripList />}
    </div>
  );
};

export default MainView;
