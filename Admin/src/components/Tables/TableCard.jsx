// src/components/TableCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const TableCard = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <div
        className="flex justify-center items-center bg-blue-500 text-white rounded-lg p-6 shadow-lg hover:bg-blue-600 transition-all cursor-pointer"
        onClick={() => navigate("/drivers")}
      >
        <h3 className="text-lg font-bold">Drivers</h3>
      </div>
      <div
        className="flex justify-center items-center bg-green-500 text-white rounded-lg p-6 shadow-lg hover:bg-green-600 transition-all cursor-pointer"
        onClick={() => navigate("/fleet")}
      >
        <h3 className="text-lg font-bold">Fleet</h3>
      </div>
      <div
        className="flex justify-center items-center bg-yellow-500 text-white rounded-lg p-6 shadow-lg hover:bg-yellow-600 transition-all cursor-pointer"
        onClick={() => navigate("/trips")}
      >
        <h3 className="text-lg font-bold">Trips</h3>
      </div>
      <div
        className="flex justify-center items-center bg-red-500 text-white rounded-lg p-6 shadow-lg hover:bg-red-600 transition-all cursor-pointer"
        onClick={() => navigate("/maintenance")}
      >
        <h3 className="text-lg font-bold">Maintenance</h3>
      </div>
    </div>
  );
};

export default TableCard;
