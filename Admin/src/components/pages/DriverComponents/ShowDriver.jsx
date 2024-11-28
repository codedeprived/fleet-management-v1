import React, { useEffect, useState } from "react";
import { getDrivers } from "../../../services/api";

const ShowDriver = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await getDrivers();
        setDrivers(response.data);
      } catch (error) {
        console.error("Error fetching drivers:", error.message);
      }
    };
    fetchDrivers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Registered Drivers</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.driver_id}>
              <td className="border p-2">{driver.driver_id}</td>
              <td className="border p-2">{driver.username}</td>
              <td className="border p-2">{driver.email}</td>
              <td className="border p-2">{driver.phone_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowDriver;
