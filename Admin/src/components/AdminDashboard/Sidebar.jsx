// src/components/AdminDashboard/Sidebar.jsx

import React from 'react';

const Sidebar = ({ setSelectedSection }) => {
  return (
    <div className="w-1/5 bg-gray-800 text-white flex flex-col">
      <button onClick={() => setSelectedSection('drivers')} className="p-4">Drivers</button>
      <button onClick={() => setSelectedSection('fleet')} className="p-4">Fleet</button>
      <button onClick={() => setSelectedSection('maintenance')} className="p-4">Maintenance</button>
      <button onClick={() => setSelectedSection('trips')} className="p-4">Trips</button>
    </div>
  );
};

export default Sidebar;
