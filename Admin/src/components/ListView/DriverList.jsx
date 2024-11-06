// src/components/ListView/DriverList.jsx

import { useState, useEffect } from 'react';
import { getDrivers, deleteDriver, updateDriver, getDriverById } from '../../services/api'; // Import your delete function
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify

const DriverList = () => {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        driver_id: '',
        username: '',
        email: '',
        license_number: '',
        phone_number: ''
    });

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await getDrivers();
                setDrivers(response.data);
            } catch (error) {
                toast.error("Error fetching drivers: " + error.message); // Show error notification
                setError("Error fetching drivers. Please try again later.");
                console.error("Error fetching drivers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDrivers();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this driver?");
        if (confirmed) {
            try {
                const response = await deleteDriver(id); // Use the delete function from api.js
                if (response.status === 200) { // Check if the response status is 200 (OK)
                    setDrivers(drivers.filter(driver => driver.driver_id !== id));
                    toast.success("Driver deleted successfully."); // Show success notification
                } else {
                    toast.error("Failed to delete driver."); // Show error notification
                }
            } catch (error) {
                toast.error("An error occurred while deleting the driver: " + error.message); // Show error notification
                console.error("Error deleting driver:", error);
            }
        }
    };


    const openEditModal = async (id) => {
        try {
            const response = await getDriverById(id);
            setEditData(response.data);
            setIsEditing(true);
        } catch (error) {
            toast.error("Failed to fetch driver details.");
            console.error("Error fetching driver details:", error);
        }
    };

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await updateDriver(editData.driver_id, editData);
            if (response.status === 200) {
                setDrivers(drivers.map(driver => driver.driver_id === editData.driver_id ? response.data : driver));
                toast.success("Driver updated successfully.");
                setIsEditing(false);
            } else {
                toast.error("Failed to update driver.");
            }
        } catch (error) {
            toast.error("An error occurred while updating the driver.");
            console.error("Error updating driver:", error);
        }
    };


    if (loading) return <p>Loading drivers...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <ToastContainer />
            <h2 className="text-2xl font-semibold">Driver List</h2>
            <table className="min-w-full bg-white border border-gray-300 mt-4">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border">ID</th>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">License Number</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map(driver => (
                        <tr key={driver.driver_id}>
                            <td className="border px-4 py-2">{driver.driver_id}</td>
                            <td className="border px-4 py-2">{driver.username}</td>
                            <td className="border px-4 py-2">{driver.license_number}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => openEditModal(driver.driver_id)}
                                    className="mr-2 text-blue-600 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(driver.driver_id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h3 className="text-xl font-semibold mb-4">Edit Driver</h3>
                        <form onSubmit={handleUpdate}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={editData.username}
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editData.email}
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">License Number</label>
                                <input
                                    type="text"
                                    name="license_number"
                                    value={editData.license_number}
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone_number"
                                    value={editData.phone_number}
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="mr-4 px-4 py-2 bg-gray-300 rounded-lg text-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DriverList;
