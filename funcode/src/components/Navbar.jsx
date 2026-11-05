import { useEffect, useRef, useState } from "react";
import { Link, NavLink, } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import "./Navbar.css";

function Navbar() {
  const { isAuthenticated } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const navbarRef = useRef(null);
  const toggleRef = useRef(null);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Permite cerrar el menú con Escape o al pulsar fuera.
  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    const handlePointerDown = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [menuOpen]);

  // Restablece el menú móvil al pasar a escritorio.
  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 992px)");

    const handleDesktopChange = (event) => {
      if (event.matches) {
        setMenuOpen(false);
      }
    };

    desktopQuery.addEventListener("change", handleDesktopChange);

    return () => {
      desktopQuery.removeEventListener("change", handleDesktopChange);
    };
  }, []);

  return (
    <nav
      ref={navbarRef}
      className="fc-navbar"
      aria-label="Navegación principal"
    >
      <div className="fc-navbar__container">
        {/* Marca */}
        <Link
          to="/"
          className="fc-navbar__brand"
          aria-label="Funcode: ir al inicio"
          onClick={closeMenu}
        >
          <span
            className="fc-navbar__brand-symbol"
            aria-hidden="true"
          >
            {"</>"}
          </span>

          <span>
            Fun
            <span className="fc-navbar__brand-accent">
              code
            </span>
          </span>
        </Link>

        {/* Botón del menú móvil */}
        <button
          ref={toggleRef}
          type="button"
          className="fc-navbar__toggle"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="fc-navbar-menu"
          onClick={() => setMenuOpen((previous) => !previous)}
        >
          <span
            className="fc-navbar__toggle-icon"
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </span>
        </button>

        {/* Menú */}
        <div
          id="fc-navbar-menu"
          className={`fc-navbar__menu${menuOpen ? " is-open" : ""}`}
        >
          <ul className="fc-navbar__links">
            <li>
              <NavLink
                to="/"
                end
                className="fc-navbar__link"
                onClick={closeMenu}
              >
                Inicio
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/productos"
                className="fc-navbar__link"
                onClick={closeMenu}
              >
                Servicios
              </NavLink>
            </li>
          </ul>

          <ul className="fc-navbar__actions">
            {isAuthenticated ? (
              <li>
                <NavLink
                  to="/mi-perfil"
                  className="fc-navbar__button fc-navbar__button--secondary"
                  onClick={closeMenu}
                >
                  Mi perfil

                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                  </svg>
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className="fc-navbar__link"
                    onClick={closeMenu}
                  >
                    Ingresar
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/registro"
                    className="fc-navbar__button"
                    onClick={closeMenu}
                  >
                    Crear cuenta

                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M4 12h16" />
                      <path d="m14 6 6 6-6 6" />
                    </svg>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;