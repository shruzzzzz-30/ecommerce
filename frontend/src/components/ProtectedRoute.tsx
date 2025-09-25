import { useAuth } from "../context/auth/AuthContext";//hooks from your AuthContext
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { token } = useAuth(); //check if jwt is exists

  return !token ? <Navigate to="/login" replace /> : <Outlet />;
};

export default ProtectedRoute;
