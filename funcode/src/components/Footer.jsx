import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./Footer.css";

const solutions = [
  {
    label: "Páginas web",
    to: "/productos?category=1",
  },
  {
    label: "Catálogos digitales",
    to: "/productos?category=2",
  },
  {
    label: "Sistemas de gestión",
    to: "/productos?category=3",
  },
];

function ArrowIcon({ diagonal = false }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {diagonal ? (
        <>
          <path d="M7 17 17 7" />
          <path d="M7 7h10v10" />
        </>
      ) : (
        <>
          <path d="M4 12h16" />
          <path d="m14 6 6 6-6 6" />
        </>
      )}
    </svg>
  );
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link to={to} className="fc-footer__link">
        <span>{children}</span>
        <ArrowIcon diagonal />
      </Link>
    </li>
  );
}

function Footer() {
  const { isAuthenticated } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fc-footer">
      {/* Iluminación decorativa del fondo */}
      <div className="fc-footer__glow" aria-hidden="true" />

      <div className="fc-footer__container">
        {/* Llamada principal */}
        <section
          className="fc-footer__cta"
          aria-labelledby="fc-footer-title"
        >
          <div>
            <p className="fc-footer__eyebrow">
              <span
                className="fc-footer__dot"
                aria-hidden="true"
              />
              Diseño, desarrollo y tecnología
            </p>

            <h2
              id="fc-footer-title"
              className="fc-footer__title"
            >
              Tu siguiente paso,
              <br />
              <span>en digital.</span>
            </h2>

            <p className="fc-footer__intro">
              Sitios web y soluciones a medida para transformar
              la forma en que tu negocio se presenta y trabaja.
            </p>
          </div>

          <Link
            to="/productos"
            className="fc-footer__button"
          >
            <span>Explorar servicios</span>

            <span className="fc-footer__button-icon">
              <ArrowIcon />
            </span>
          </Link>
        </section>

        {/* Marca y navegación */}
        <div className="fc-footer__columns">
          <div className="fc-footer__brand-column">
            <Link
              to="/"
              className="fc-footer__brand"
              aria-label="Funcode: ir al inicio"
            >
              <span
                className="fc-footer__brand-symbol"
                aria-hidden="true"
              >
                {"</>"}
              </span>

              <span>
                Fun
                <span className="fc-footer__brand-accent">
                  code
                </span>
              </span>
            </Link>

            <p className="fc-footer__description">
              Desarrollo web y soluciones digitales para negocios
              que quieren dar el siguiente paso.
            </p>

            <span className="fc-footer__signature">
              Ideas claras. Soluciones funcionales.
            </span>
          </div>

          <nav aria-labelledby="fc-footer-solutions">
            <h3
              id="fc-footer-solutions"
              className="fc-footer__heading"
            >
              Soluciones
            </h3>

            <ul className="fc-footer__list">
              {solutions.map((solution) => (
                <FooterLink
                  key={solution.to}
                  to={solution.to}
                >
                  {solution.label}
                </FooterLink>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="fc-footer-explore">
            <h3
              id="fc-footer-explore"
              className="fc-footer__heading"
            >
              Explorar
            </h3>

            <ul className="fc-footer__list">
              <FooterLink to="/">
                Inicio
              </FooterLink>

              <FooterLink to="/productos">
                Todos los servicios
              </FooterLink>

              {isAuthenticated ? (
                <FooterLink to="/mi-perfil">
                  Mi perfil
                </FooterLink>
              ) : (
                <>
                  <FooterLink to="/login">
                    Ingresar
                  </FooterLink>

                  <FooterLink to="/registro">
                    Crear cuenta
                  </FooterLink>
                </>
              )}
            </ul>
          </nav>
        </div>

        {/* Marca de fondo decorativa */}
        <div
          className="fc-footer__wordmark"
          aria-hidden="true"
        >
          FUNCODE
        </div>

        {/* Copyright y documentos legales */}
        <div className="fc-footer__bottom">
          <p>
            &copy; {currentYear} Funcode. Todos los derechos reservados.
          </p>

          <nav aria-label="Información legal">
            <ul className="fc-footer__legal">
              <li>
                <Link to="/terminos">
                  Términos y condiciones
                </Link>
              </li>

              <li>
                <Link to="/privacidad">
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;