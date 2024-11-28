import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    console.log("isAuthenticated:", isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
