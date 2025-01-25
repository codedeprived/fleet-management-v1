import { Card, CardContent } from "../ui/Card";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FuelAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/fuel/analytics")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const { totalFuel, logs } = data || {};

  if (!logs || logs.length === 0) {
    return <div>No fuel logs available.</div>;
  }

  const chartData = {
    labels: logs.map((log, index) => `Log ${index + 1}`),
    datasets: [
      {
        label: "Fuel Consumed (Liters)",
        data: logs.map((log) => parseFloat(log.fuel_in_liters)),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 space-y-4">
      {/* Total Fuel Consumed Card */}
      <Card className="bg-white shadow-md rounded-2xl">
        <CardContent>
          <h2 className="text-lg font-bold">Total Fuel Consumed</h2>
          <p className="text-2xl mt-2">{totalFuel} liters</p>
        </CardContent>
      </Card>

      {/* Fuel Consumption Bar Chart */}
      <Card className="bg-white shadow-md rounded-2xl">
        <CardContent>
          <h2 className="text-lg font-bold">Fuel Consumption Logs</h2>
          <div className="mt-4">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                  },
                },
              }}
              height={300}
            />
          </div>
        </CardContent>
      </Card>

      {/* Table of Logs */}
      <Card className="bg-white shadow-md rounded-2xl">
        <CardContent>
          <h2 className="text-lg font-bold">Fuel Logs</h2>
          <table className="table-auto w-full mt-4 border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 p-2">Date</th>
                <th className="border border-gray-200 p-2">Fuel (Liters)</th>
                <th className="border border-gray-200 p-2">Cost</th>
                <th className="border border-gray-200 p-2">Location</th>
                <th className="border border-gray-200 p-2">Vehicle</th>
                <th className="border border-gray-200 p-2">Driver</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index}>
                  <td className="border border-gray-200 p-2">
                    {new Date(log.created_at).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-200 p-2">
                    {log.fuel_in_liters} L
                  </td>
                  <td className="border border-gray-200 p-2">${log.cost}</td>
                  <td className="border border-gray-200 p-2">{log.location}</td>
                  <td className="border border-gray-200 p-2">
                    {log.vehicle_id}
                  </td>
                  <td className="border border-gray-200 p-2">
                    {log.driver_id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FuelAnalytics;
