import { useEffect } from "react";
import { Link } from "react-router-dom";
import { legalConfig } from "./config/legal.js";

export function LegalSection({ id, title, children }) {
  return (
    <section
      id={id}
      className="mb-4"
      aria-labelledby={`${id}-title`}
    >
      <h2 id={`${id}-title`} className="h5 mb-3">
        {title}
      </h2>

      {children}
    </section>
  );
}

export function LegalContact() {
  const { marca, titular, rut, domicilio, email } = legalConfig;

  return (
    <div className="border rounded p-3 bg-light">
      <dl className="row mb-0">
        <dt className="col-sm-4">Marca</dt>
        <dd className="col-sm-8">{marca}</dd>

        <dt className="col-sm-4">Titular o razón social</dt>
        <dd className="col-sm-8">
          {titular || "Pendiente de completar"}
        </dd>

        <dt className="col-sm-4">RUT</dt>
        <dd className="col-sm-8">
          {rut || "Pendiente de completar"}
        </dd>

        <dt className="col-sm-4">Domicilio</dt>
        <dd className="col-sm-8">
          {domicilio || "Pendiente de completar"}
        </dd>

        <dt className="col-sm-4">Contacto</dt>
        <dd className="col-sm-8 mb-0">
          {email ? (
            <a href={`mailto:${email}`}>{email}</a>
          ) : (
            "Pendiente de configurar un correo real"
          )}
        </dd>
      </dl>
    </div>
  );
}

function LegalLayout({ title, introduction, children }) {
  const { titular, rut, domicilio, email } = legalConfig;
  const incomplete = !titular || !rut || !domicilio || !email;

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | ${legalConfig.marca}`;

    window.scrollTo(0, 0);

    return () => {
      document.title = previousTitle;
    };
  }, [title]);

  return (
    <main className="container py-5">
      <article
        className="mx-auto"
        style={{ maxWidth: "900px", lineHeight: 1.75 }}
      >
        <nav aria-label="Navegación de documentos legales" className="mb-4">
          <Link to="/" className="me-3">
            Inicio
          </Link>

          <Link to="/terminos" className="me-3">
            Términos y condiciones
          </Link>

          <Link to="/privacidad">
            Política de privacidad
          </Link>
        </nav>

        <header className="mb-4">
          <h1 className="mb-3">{title}</h1>

          <p className="text-secondary small">
            Última actualización: {legalConfig.actualizado}.
            {" "}Versión: {legalConfig.version}.
          </p>

          <p className="lead">{introduction}</p>
        </header>

        {incomplete && (
          <div className="alert alert-warning" role="note">
            Documento en preparación: falta completar la identificación
            y el contacto del proveedor. No utilizar esta versión como
            documento definitivo para contratar servicios.
          </div>
        )}

        {children}

        <div className="border-top pt-4 mt-5">
          <Link to="/productos" className="btn btn-dark">
            Volver a los servicios
          </Link>
        </div>
      </article>
    </main>
  );
}

export default LegalLayout;