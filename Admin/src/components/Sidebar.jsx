import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    logout();
    navigate("/");
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <svg>...</svg> },
    { name: "Drivers", path: "/drivers", icon: <svg>...</svg> },
    { name: "Fleet", path: "/fleet", icon: <svg>...</svg> },
    { name: "Trips", path: "/trips", icon: <svg>...</svg> },
    { name: "Maintenance", path: "/maintenance", icon: <svg>...</svg> },
    { name: "Fuel", path: "/Fuel", icon: <svg>...</svg> },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => navigate(item.path)}
                className={`flex items-center w-full text-left p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  location.pathname === item.path
                    ? "bg-gray-200 dark:bg-gray-600"
                    : "text-gray-900 dark:text-white"
                }`}
                aria-label={item.name}
              >
                <span className="w-5 h-5">{item.icon}</span>
                <span className="ms-3">{item.name}</span>
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center w-full text-left p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
              aria-label="Logout"
            >
              <span className="w-5 h-5">{/* Logout Icon */}</span>
              <span className="ms-3">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
