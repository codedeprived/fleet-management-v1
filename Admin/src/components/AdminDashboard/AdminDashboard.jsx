// src/components/AdminDashboard/AdminDashboard.jsx

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainView from './MainView';

const AdminDashboard = () => {
  // State to keep track of selected section
  const [selectedSection, setSelectedSection] = useState('drivers');

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar setSelectedSection={setSelectedSection} />

      {/* Main Display Area */}
      <MainView selectedSection={selectedSection} />
    </div>
  );
};

export default AdminDashboard;
