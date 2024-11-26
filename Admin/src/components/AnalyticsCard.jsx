// src/components/AnalyticsCard.jsx
import React from "react";

const AnalyticsCard = ({ title, count, onClick, icon }) => {
  return (
    <div
      className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="text-gray-700">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-3xl font-extrabold mt-2">{count}</p>
        </div>
        {icon && <div className="text-4xl text-gray-400">{icon}</div>}
      </div>
    </div>
  );
};

export default AnalyticsCard;
