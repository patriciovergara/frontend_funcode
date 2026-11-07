import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import { legalConfig } from "./config/legal.js";

const legalLinkClass = `
  tw:text-funcode-accent! tw:underline
  tw:decoration-funcode-accent/30 tw:underline-offset-4
  tw:hover:decoration-funcode-accent
  tw:focus-visible:outline-2
  tw:focus-visible:outline-offset-4
  tw:focus-visible:outline-funcode-accent
`;

export function LegalSection({ id, title, children }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="
        tw:scroll-mt-28
        tw:border-0 tw:border-b tw:border-solid
        tw:border-funcode-line
        tw:py-7 tw:first:pt-0 tw:last:border-b-0 tw:last:pb-0
      "
    >
      <h2
        id={`${id}-title`}
        className="
          tw:mb-4 tw:text-lg tw:font-semibold
          tw:leading-snug tw:text-funcode-text
          tw:sm:text-xl
        "
      >
        {title}
      </h2>

      <div
        className="
          tw:text-sm tw:leading-8 tw:text-funcode-muted
          tw:sm:text-base

          tw:[&_p]:mb-4
          tw:[&_p:last-child]:mb-0

          tw:[&_ul]:mb-4 tw:[&_ul]:list-disc tw:[&_ul]:pl-6
          tw:[&_ol]:mb-4 tw:[&_ol]:list-decimal tw:[&_ol]:pl-6
          tw:[&_li]:mb-2

          tw:[&_a]:text-funcode-accent!
          tw:[&_a]:underline tw:[&_a]:underline-offset-4
          tw:[&_a]:decoration-funcode-accent/30
          tw:[&_a:hover]:decoration-funcode-accent
          tw:[&_a:focus-visible]:outline-2
          tw:[&_a:focus-visible]:outline-offset-4
          tw:[&_a:focus-visible]:outline-funcode-accent
        "
      >
        {children}
      </div>
    </section>
  );
}

export function LegalContact() {
  const { marca, titular, rut, domicilio, email } = legalConfig;

  const contactRows = [
    {
      label: "Marca",
      value: marca,
    },
    {
      label: "Titular o razón social",
      value: titular || "Pendiente de completar",
    },
    {
      label: "RUT",
      value: rut || "Pendiente de completar",
    },
    {
      label: "Domicilio",
      value: domicilio || "Pendiente de completar",
    },
    {
      label: "Contacto",
      value: email ? (
        <a href={`mailto:${email}`} className={legalLinkClass}>
          {email}
        </a>
      ) : (
        "Pendiente de configurar un correo real"
      ),
    },
  ];

  return (
    <div
      className="
        tw:mt-5 tw:overflow-hidden tw:rounded-xl
        tw:border tw:border-solid tw:border-funcode-line
        tw:bg-funcode-bg/60
      "
    >
      <dl className="tw:m-0">
        {contactRows.map(({ label, value }) => (
          <div
            key={label}
            className="
              tw:grid tw:gap-1
              tw:border-0 tw:border-b tw:border-solid
              tw:border-funcode-line
              tw:px-4 tw:py-4 tw:last:border-b-0
              tw:sm:grid-cols-[180px_minmax(0,1fr)] tw:sm:gap-5
              tw:sm:px-5
            "
          >
            <dt
              className="
                tw:m-0 tw:text-sm tw:font-medium
                tw:text-funcode-text
              "
            >
              {label}
            </dt>

            <dd
              className="
                tw:m-0 tw:min-w-0
                tw:text-sm tw:text-funcode-muted
                .tw\:\[overflow-wrap\:anywhere\] {overflow-wrap: anywhere;
              "
            >
              {value}
            </dd>
          </div>
        ))}
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

  function getDocumentLinkClass({ isActive }) {
    return `
      tw:inline-flex tw:min-h-11
      tw:items-center tw:justify-center
      tw:rounded-xl
      tw:border tw:border-solid
      tw:px-4 tw:py-2.5
      tw:text-sm tw:font-medium tw:no-underline!
      tw:transition-colors
      tw:focus-visible:outline-2
      tw:focus-visible:outline-offset-4
      tw:focus-visible:outline-funcode-accent
      tw:motion-reduce:transition-none
      ${
        isActive
          ? "tw:border-funcode-accent/30 tw:bg-funcode-accent/10 tw:text-funcode-accent!"
          : "tw:border-funcode-line tw:bg-funcode-surface tw:text-funcode-muted! tw:hover:bg-white/5 tw:hover:text-funcode-text!"
      }
    `;
  }

  return (
    <div
      className="
        tw:mx-auto tw:w-full tw:max-w-5xl
        tw:px-5 tw:py-10
        tw:font-sans tw:text-funcode-text
        tw:sm:px-8 tw:lg:px-10 tw:lg:py-14
      "
    >
      <Link
        to="/"
        className="
          tw:mb-7 tw:inline-flex tw:items-center tw:gap-2
          tw:text-sm tw:text-funcode-muted! tw:no-underline!
          tw:hover:text-funcode-accent!
          tw:focus-visible:outline-2
          tw:focus-visible:outline-offset-4
          tw:focus-visible:outline-funcode-accent
        "
      >
        <span aria-hidden="true">←</span>
        Volver al inicio
      </Link>

      <nav
        aria-label="Navegación de documentos legales"
        className="tw:mb-8 tw:flex tw:flex-wrap tw:gap-3"
      >
        <NavLink to="/terminos" end className={getDocumentLinkClass}>
          Términos y condiciones
        </NavLink>

        <NavLink to="/privacidad" end className={getDocumentLinkClass}>
          Política de privacidad
        </NavLink>
      </nav>

      <article aria-labelledby="legal-document-title">
        <header
          className="
            tw:relative tw:mb-7 tw:overflow-hidden
            tw:rounded-2xl
            tw:border tw:border-solid tw:border-funcode-line
            tw:bg-funcode-surface tw:p-6 tw:sm:p-8
          "
        >
          <div
            aria-hidden="true"
            className="
              tw:pointer-events-none
              tw:absolute tw:-top-20 tw:-right-20
              tw:h-56 tw:w-56 tw:rounded-full
              tw:bg-funcode-violet/10 tw:blur-3xl
            "
          />

          <div className="tw:relative">
            <p
              className="
                tw:mb-3 tw:text-xs tw:font-semibold
                tw:tracking-widest tw:text-funcode-accent tw:uppercase
              "
            >
              Información legal
            </p>

            <h1
              id="legal-document-title"
              className="
                tw:mb-5 tw:text-3xl tw:font-bold
                tw:leading-tight tw:tracking-tight
                tw:text-funcode-text tw:sm:text-4xl
              "
            >
              {title}
            </h1>

            <div
              className="
                tw:mb-5 tw:flex tw:flex-wrap tw:gap-x-5 tw:gap-y-2
                tw:text-xs tw:leading-relaxed tw:text-funcode-muted
              "
            >
              <span>Última actualización: {legalConfig.actualizado}</span>

              <span>Versión: {legalConfig.version}</span>
            </div>

            <p
              className="
                tw:m-0 tw:max-w-2xl
                tw:text-base tw:leading-relaxed tw:text-funcode-muted
              "
            >
              {introduction}
            </p>
          </div>
        </header>

        {incomplete && (
          <div
            role="note"
            className="
              tw:mb-7 tw:rounded-xl
              tw:border tw:border-solid tw:border-amber-400/25
              tw:bg-amber-400/5 tw:p-5
              tw:text-sm tw:leading-relaxed tw:text-amber-200
            "
          >
            <p className="tw:mb-2 tw:font-semibold">Documento en preparación</p>

            <p className="tw:m-0">
              Falta completar la identificación y el contacto del proveedor. No
              utilizar esta versión como documento definitivo para contratar
              servicios.
            </p>
          </div>
        )}

        <div
          className="
            tw:rounded-2xl
            tw:border tw:border-solid tw:border-funcode-line
            tw:bg-funcode-surface
            tw:p-5 tw:sm:p-8
          "
        >
          {children}
        </div>

        <footer
          className="
            tw:mt-8 tw:flex tw:flex-wrap
            tw:items-center tw:justify-between tw:gap-5
            tw:border-0 tw:border-t tw:border-solid
            tw:border-funcode-line tw:pt-7
          "
        >
          <p className="tw:m-0 tw:text-sm tw:text-funcode-muted">
            {legalConfig.marca} · Información legal
          </p>

          <Link
            to="/productos"
            className="
              tw:inline-flex tw:min-h-12
              tw:items-center tw:justify-center tw:gap-2
              tw:rounded-xl tw:border-0
              tw:bg-funcode-accent tw:px-5 tw:py-3
              tw:text-sm tw:font-semibold
              tw:text-funcode-bg! tw:no-underline!
              tw:transition-colors tw:hover:bg-sky-200
              tw:focus-visible:outline-2
              tw:focus-visible:outline-offset-4
              tw:focus-visible:outline-funcode-accent
              tw:motion-reduce:transition-none
            "
          >
            Ver servicios
            <span aria-hidden="true">→</span>
          </Link>
        </footer>
      </article>
    </div>
  );
}

export default LegalLayout;
