import React from "react";

const AnalyticsCard = ({ title, count, onClick, icon, cardClass }) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-lg cursor-pointer transition transform duration-300 ease-in-out hover:scale-105 ${cardClass} overflow-hidden max-w-full`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div className="p-4 bg-white rounded-full flex justify-center items-center">
          {icon}
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          <p className="text-lg font-medium text-white mt-2 truncate">{count}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;