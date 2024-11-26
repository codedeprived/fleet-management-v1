import { useState } from "react";
import { getDriverById  , findDriverByUsername} from "../../../services/api"

const SearchDriver = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [driver, setDriver] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      setError(""); // Clear any previous errors
      setDriver(null); // Reset driver state before a new search

      let response;
      if (isNaN(searchTerm)) {
        // If the search term is not a number, search by username
        response = await findDriverByUsername(searchTerm);
      } else {
        // If the search term is a number, search by ID
        response = await getDriverById(searchTerm);
      }

      if (response?.data) {
        setDriver(response.data); // Update driver state with API response
      } else {
        setError("No driver found.");
      }
    } catch (error) {
      console.error("Error searching driver:", error);
      setError("An error occurred while searching. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Search Driver</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Driver ID or Username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>
      <div className="mt-4">
        {error && <p className="text-red-500">{error}</p>}
        {driver && (
          <div className="border p-4 rounded">
            <h3 className="font-bold">Driver Details</h3>
            <p><strong>ID:</strong> {driver.id}</p>
            <p><strong>Username:</strong> {driver.username}</p>
            <p><strong>Email:</strong> {driver.email}</p>
            {/* Add more driver details as needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDriver;
