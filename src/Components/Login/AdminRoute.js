import { Navigate } from "react-router-dom";
import { useAuth } from "../Login/AuthContext";

const AdminRoute = ({ children }) => {
    const { user } = useAuth();
    return user?.role === "admin" ? children : <Navigate to="/" />;
};

export default AdminRoute;
