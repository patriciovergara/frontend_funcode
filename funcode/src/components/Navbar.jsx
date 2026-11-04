import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { session, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = isAuthenticated && session?.user?.role === "admin";

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="bg-dark">
      <nav
        className="container d-flex flex-wrap align-items-center gap-3 py-3"
        aria-label="Navegación principal"
      >
        <Link to="/" className="text-white text-decoration-none fs-4 me-auto">
          Funcode
        </Link>

        <Link to="/" className="text-white">
          Inicio
        </Link>

        <Link to="/productos" className="text-white">
          Productos
        </Link>

        {isAuthenticated ? (
          <>
            {isAdmin ? (
              <Link to="/publicaciones/nueva" className="text-white">
                Publicar
              </Link>
            ) : null}

            <Link to="/mi-perfil" className="text-white">
              Mi perfil
            </Link>

            <span className="text-white">Hola, {session.user.name}</span>

            <button
              type="button"
              className="btn btn-outline-light btn-sm"
              onClick={handleLogout}
            >
              Salir
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white">
              Ingresar
            </Link>

            <Link to="/registro" className="text-white">
              Registrarse
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
