import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function AdminRoute() {
  const { session, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (session?.user?.role !== "admin") {
    return <Navigate to="/mi-perfil" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;