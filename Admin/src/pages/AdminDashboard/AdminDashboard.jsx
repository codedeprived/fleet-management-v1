// import "./App.css";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import { useState, useEffect } from "react";
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import DriverPage from "./components/pages/DriverPage"; // Import DriverPage
// import FleetPage from "./components/pages/FleetPage"; // Import DriverPage
// import SearchDriver from "./components/pages/DriverComponents/SearchDriver"; // Import SearchDriver
// import AddNewFleet from "./components/pages/FleetComponents/AddFleet";
// import DrivesTable from "./components/Tables/DrivesTable";
// import TripsTable from "./components/Tables/TripsTable";
// import MaintenanceTable from "./components/Tables/MaintenanceTable";
// import FleetTable from "./components/Tables/FleetTable";
// const AdminDashboard = () => {

  
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
//   const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode toggle state
//   const location = useLocation(); // Get the current route

//   // Toggle dark mode and update body class
//   const toggleDarkMode = () => {
//     setIsDarkMode((prevMode) => !prevMode);
//   };

//   // Set the initial theme based on localStorage
//   useEffect(() => {
//     const storedTheme = localStorage.getItem("theme");
//     if (storedTheme === "dark") {
//       setIsDarkMode(true);
//       document.body.classList.add("dark");
//     } else {
//       document.body.classList.remove("dark");
//     }
//   }, []);

//   // Update theme in localStorage whenever dark mode state changes
//   useEffect(() => {
//     if (isDarkMode) {
//       localStorage.setItem("theme", "dark");
//       document.body.classList.add("dark");
//     } else {
//       localStorage.setItem("theme", "light");
//       document.body.classList.remove("dark");
//     }
//   }, [isDarkMode]);

//   return (
//     <>
//       <Navbar
//         isDarkMode={isDarkMode}
//         toggleDarkMode={toggleDarkMode}
//         isOpen={isSidebarOpen}
//         setIsOpen={setIsSidebarOpen}
//       />
//       <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
//       <div className="flex flex-1 pt-16">
//         <div
//           className={`flex-1 ${
//             isSidebarOpen ? "pl-64" : "pl-0"
//           } md:pl-64 p-6 overflow-y-auto`}
//         >
//           <main>
//             <Routes>
//               {/* <Route path="/dashboard" element={<AdminDashboard />} /> */}
//               <Route path="/drivers" element={<DriverPage />} />
//               <Route path="/driver/show" element={<DrivesTable />} />
//               <Route path="/driver/search" element={<SearchDriver />} />
//               <Route path="/fleet" element={<FleetPage />} />
//               <Route path="/fleet/add" element={<AddNewFleet/>} />
//               <Route path="/fleet/show" element={<FleetTable />} />
//               <Route path="/trips" element={<TripsTable />} />
//               <Route path="/maintenance" element={<MaintenanceTable />} />
//               <Route path="*" element={<Navigate to="/dashboard" />} />
//             </Routes>
//           </main>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminDashboard
