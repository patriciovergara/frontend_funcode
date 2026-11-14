import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function AdminRoute() {
  const { session, isAuthenticated, isLoading, error } = useAuth();

  if (isLoading) {
    return (
      <p className="container py-5" role="status">
        Verificando la sesión...
      </p>
    );
  }

  if (error) {
    return (
      <p className="container py-5" role="alert">
        No se pudo verificar la sesión: {error}
      </p>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (session?.user?.role !== "admin") {
    return <Navigate to="/mi-perfil" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;