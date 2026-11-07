import { Link } from "react-router-dom";
import { authStyles } from "../styles/authStyles.js";

function AuthLayout({
  eyebrow,
  title,
  description,
  panelTitle,
  panelDescription,
  children,
  footer,
}) {
  return (
    <section
      aria-labelledby="auth-title"
      className="
        tw:mx-auto tw:w-full tw:max-w-7xl
        tw:px-5 tw:py-10 tw:sm:px-8 tw:lg:px-10 tw:lg:py-16
        tw:font-sans tw:text-funcode-text
      "
    >
      <Link
        to="/productos"
        className={`
          ${authStyles.link}
          tw:mb-8 tw:inline-flex tw:min-h-11
          tw:items-center tw:gap-2 tw:text-sm
        `}
      >
        <span aria-hidden="true">←</span>
        Explorar servicios
      </Link>

      <div
        className="
          tw:grid tw:items-center tw:gap-10
          tw:lg:grid-cols-2 tw:lg:gap-16
          tw:motion-safe:animate-funcode-enter
        "
      >
        {/* Presentación */}
        <div className="tw:relative tw:min-w-0">
          <p
            className="
              tw:mb-5 tw:text-xs tw:font-semibold
              tw:tracking-widest tw:text-funcode-accent tw:uppercase
            "
          >
            {eyebrow}
          </p>

          <h1
            id="auth-title"
            className="
              tw:mb-6 tw:max-w-xl
              tw:text-4xl tw:leading-tight tw:font-bold
              tw:tracking-tight tw:text-funcode-text tw:md:text-5xl
            "
          >
            {title}
          </h1>

          <p
            className="
              tw:mb-8 tw:max-w-lg tw:text-base
              tw:leading-relaxed tw:text-funcode-muted
            "
          >
            {description}
          </p>

          {/* Composición decorativa para escritorio */}
          <div
            aria-hidden="true"
            className="
              tw:relative tw:hidden tw:max-w-md tw:overflow-hidden
              tw:rounded-2xl
              tw:border tw:border-solid tw:border-funcode-line
              tw:bg-funcode-surface/50 tw:p-6 tw:lg:block
            "
          >
            <div
              className="
                tw:pointer-events-none tw:absolute
                tw:-top-12 tw:-right-12
                tw:h-48 tw:w-48 tw:rounded-full
                tw:bg-funcode-violet/15 tw:blur-3xl
              "
            />

            <div className="tw:relative">
              <div
                className="
                  tw:mb-8 tw:flex tw:items-center
                  tw:justify-between tw:gap-4
                "
              >
                <span
                  className="
                    tw:font-mono tw:text-lg tw:text-funcode-accent
                  "
                >
                  {"</>"}
                </span>

                <span className="tw:text-xs tw:text-funcode-muted">
                  Funcode / espacio digital
                </span>
              </div>

              <p
                className="
                  tw:mb-3 tw:text-lg
                  tw:font-semibold tw:text-funcode-text
                "
              >
                Ideas claras.
                <br />
                Soluciones funcionales.
              </p>

              <div className="tw:mt-6 tw:flex tw:gap-2">
                <span
                  className="
                    tw:h-1 tw:w-20 tw:rounded-full
                    tw:bg-funcode-accent
                  "
                />

                <span
                  className="
                    tw:h-1 tw:w-12 tw:rounded-full
                    tw:bg-funcode-violet/60
                  "
                />

                <span
                  className="
                    tw:h-1 tw:w-6 tw:rounded-full tw:bg-white/15
                  "
                />
              </div>

              <div className="tw:mt-6 tw:flex tw:flex-wrap tw:gap-2">
                {["Web", "Catálogos", "Sistemas"].map((label) => (
                  <span
                    key={label}
                    className="
                      tw:rounded-full tw:bg-white/5
                      tw:px-3 tw:py-1.5
                      tw:text-xs tw:text-funcode-muted
                    "
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Panel del formulario */}
        <div
          className="
            tw:relative tw:min-w-0 tw:overflow-hidden
            tw:rounded-3xl
            tw:border tw:border-solid tw:border-funcode-line
            tw:bg-funcode-surface tw:p-6 tw:sm:p-8
            tw:shadow-funcode-card
          "
        >
          <div
            aria-hidden="true"
            className="
              tw:absolute tw:inset-x-8 tw:top-0 tw:h-px
              tw:bg-linear-to-r tw:from-transparent
              tw:via-funcode-accent/70 tw:to-transparent
            "
          />

          <header className="tw:mb-7">
            <h2
              className="
                tw:mb-3 tw:text-2xl
                tw:font-semibold tw:text-funcode-text
              "
            >
              {panelTitle}
            </h2>

            <p
              className="
                tw:m-0 tw:text-sm
                tw:leading-relaxed tw:text-funcode-muted
              "
            >
              {panelDescription}
            </p>
          </header>

          {children}

          <div
            className="
              tw:mt-7
              tw:border-0 tw:border-t tw:border-solid
              tw:border-funcode-line tw:pt-6
              tw:text-sm tw:leading-relaxed tw:text-funcode-muted
            "
          >
            {footer}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthLayout;
