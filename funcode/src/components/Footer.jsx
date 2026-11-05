import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const solutions = [
  {
    label: "Paginas web",
    to: "/productos?category=1",
  },
  {
    label: "Catalogos digitales",
    to: "/productos?category=2",
  },
  {
    label: "Sistemas de gestion",
    to: "/productos?category=3",
  },
];

function Footer() {
  const { isAuthenticated } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light mt-auto">
      <div className="container">
        <section
          className="py-5 border-bottom border-secondary"
          aria-labelledby="footer-cta-title"
        >
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-8">
              <p className="small text-uppercase text-light mb-2">
                Soluciones digitales para tu negocio
              </p>

              <h2 id="footer-cta-title" className="h3 mb-3">
                Tu proximo proyecto digital comienza aqui.
              </h2>

              <p className="text-light mb-0">
                Explora nuestras soluciones y cuentanos que necesita
                tu negocio.
              </p>
            </div>

            <div className="col-12 col-lg-4 text-lg-end">
              <Link
                to="/productos"
                className="btn btn-light px-4 py-3"
              >
                Ver servicios y cotizar
              </Link>
            </div>
          </div>
        </section>

        <div className="row g-5 py-5">
          <div className="col-12 col-lg-6">
            <Link
              to="/"
              className="d-inline-block text-white text-decoration-none fs-3 fw-semibold mb-3"
              aria-label="Funcode: volver al inicio"
            >
              Funcode
            </Link>

            <p
              className="text-light mb-3"
              style={{ maxWidth: "380px" }}
            >
              Desarrollo web y soluciones digitales para impulsar
              tu negocio.
            </p>

            <p
              className="small text-light mb-0"
              style={{ maxWidth: "380px" }}
            >
              Desde tu primera pagina web hasta herramientas de
              gestion adaptadas a tu forma de trabajar.
            </p>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <nav aria-labelledby="footer-solutions-title">
              <h2
                id="footer-solutions-title"
                className="h6 text-uppercase mb-4"
              >
                Soluciones
              </h2>

              <ul className="list-unstyled mb-0">
                {solutions.map((solution) => (
                  <li
                    key={solution.to}
                    className="border-bottom border-secondary"
                  >
                    <Link
                      to={solution.to}
                      className="d-block text-light py-3 link-offset-3"
                    >
                      {solution.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <nav aria-labelledby="footer-explore-title">
              <h2
                id="footer-explore-title"
                className="h6 text-uppercase mb-4"
              >
                Explorar
              </h2>

              <ul className="list-unstyled mb-0">
                <li className="border-bottom border-secondary">
                  <Link
                    to="/"
                    className="d-block text-light py-3 link-offset-3"
                  >
                    Inicio
                  </Link>
                </li>

                <li className="border-bottom border-secondary">
                  <Link
                    to="/productos"
                    className="d-block text-light py-3 link-offset-3"
                  >
                    Servicios
                  </Link>
                </li>

                {isAuthenticated ? (
                  <li className="border-bottom border-secondary">
                    <Link
                      to="/mi-perfil"
                      className="d-block text-light py-3 link-offset-3"
                    >
                      Mi perfil
                    </Link>
                  </li>
                ) : (
                  <>
                    <li className="border-bottom border-secondary">
                      <Link
                        to="/login"
                        className="d-block text-light py-3 link-offset-3"
                      >
                        Ingresar
                      </Link>
                    </li>

                    <li className="border-bottom border-secondary">
                      <Link
                        to="/registro"
                        className="d-block text-light py-3 link-offset-3"
                      >
                        Registrarse
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>

        <div className="border-top border-secondary py-4">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
            <p className="small text-light mb-0">
              &copy; {currentYear} Funcode. Todos los derechos reservados.
            </p>

            <p className="small text-light mb-0">
              Desarrollo web y sistemas a medida.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;