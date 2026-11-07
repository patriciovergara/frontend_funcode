import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    number: "01",
    symbol: "</>",
    title: "Páginas web profesionales",
    description:
      "Landing pages, sitios corporativos y páginas autoadministrables que presentan tu negocio con claridad.",
    examples:
      "Landing pages desde $129.990 CLP. Administración y funciones adicionales según cotización.",
    tags: ["Presencia digital", "Diseño adaptable"],
  },
  {
    id: 2,
    number: "02",
    symbol: "[ ]",
    title: "Catálogos digitales",
    description:
      "Productos y servicios organizados en una experiencia visual pensada para facilitar su exploración.",
    examples:
      "Imágenes, categorías, precios, búsqueda y filtros según el alcance de cada proyecto.",
    tags: ["Productos", "Catálogos administrables"],
  },
  {
    id: 3,
    number: "03",
    symbol: "{ }",
    title: "Sistemas a medida",
    description:
      "Aplicaciones con backend y base de datos para organizar información y apoyar la operación de tu empresa.",
    examples:
      "CRM, inventario, cotizaciones, reservas, paneles de gestión e integraciones.",
    tags: ["Gestión", "Integraciones"],
  },
];

const processSteps = [
  {
    title: "Entender",
    subtitle: "Conocemos tu proyecto",
    description:
      "Conversamos sobre tu negocio, tus necesidades y los objetivos que quieres alcanzar.",
  },
  {
    title: "Definir",
    subtitle: "Acordamos el alcance",
    description:
      "Preparamos una propuesta con funcionalidades, entregables, costos y plazos estimados.",
  },
  {
    title: "Construir",
    subtitle: "Diseñamos y desarrollamos",
    description:
      "Construimos la solución por etapas y revisamos los avances según lo acordado.",
  },
  {
    title: "Publicar",
    subtitle: "Probamos y entregamos",
    description:
      "Verificamos las funcionalidades y preparamos la puesta en producción de tu proyecto.",
  },
];

const capabilities = [
  {
    title: "Integración de APIs",
    description: "Conexiones entre las herramientas de tu negocio.",
  },
  {
    title: "Automatización",
    description: "Procesos definidos según tu operación.",
  },
  {
    title: "SEO técnico",
    description: "Estructura técnica para tu presencia en buscadores.",
  },
  {
    title: "Optimización web",
    description: "Revisión de experiencia y rendimiento.",
  },
];

const primaryButton = `
  tw:inline-flex tw:min-h-12 tw:items-center tw:justify-center tw:gap-3
  tw:rounded-xl tw:bg-funcode-accent tw:px-5 tw:py-3
  tw:text-sm tw:font-semibold tw:text-funcode-bg tw:no-underline
  tw:transition tw:duration-200
  tw:hover:bg-sky-200 tw:hover:text-funcode-bg
  tw:motion-safe:hover:-translate-y-0.5
  tw:focus-visible:outline-2 tw:focus-visible:outline-offset-4
  tw:focus-visible:outline-funcode-accent
  tw:motion-reduce:transition-none
`;

const secondaryButton = `
  tw:inline-flex tw:min-h-12 tw:items-center tw:justify-center tw:gap-3
  tw:rounded-xl tw:border tw:border-solid tw:border-funcode-line
  tw:bg-white/5 tw:px-5 tw:py-3
  tw:text-sm tw:font-medium tw:text-funcode-text tw:no-underline
  tw:transition-colors tw:hover:bg-white/10 tw:hover:text-white
  tw:focus-visible:outline-2 tw:focus-visible:outline-offset-4
  tw:focus-visible:outline-funcode-accent
  tw:motion-reduce:transition-none
`;

function Arrow({ diagonal = false }) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="tw:shrink-0"
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

function SectionHeading({ eyebrow, title, description, id }) {
  return (
    <div className="tw:mb-9 tw:max-w-2xl">
      <p
        className="
          tw:mb-3 tw:text-xs tw:font-semibold
          tw:tracking-widest tw:text-funcode-accent tw:uppercase
        "
      >
        {eyebrow}
      </p>

      <h2
        id={id}
        className="
          tw:m-0 tw:text-3xl tw:leading-tight
          tw:font-semibold tw:tracking-tight tw:text-funcode-text
          tw:md:text-4xl
        "
      >
        {title}
      </h2>

      {description && (
        <p
          className="
            tw:mt-4 tw:mb-0 tw:text-base
            tw:leading-relaxed tw:text-funcode-muted
          "
        >
          {description}
        </p>
      )}
    </div>
  );
}

function InterfacePreview() {
  return (
    <figure className="tw:relative tw:m-0 tw:min-w-0">
      <div
        aria-hidden="true"
        className="
          tw:pointer-events-none tw:absolute tw:inset-8
          tw:rounded-full tw:bg-funcode-violet/15 tw:blur-3xl
        "
      />

      {/* Composición decorativa, no es una aplicación interactiva. */}
      <div
        aria-hidden="true"
        className="
          tw:relative tw:overflow-hidden tw:rounded-2xl
          tw:border tw:border-solid tw:border-white/15
          tw:bg-funcode-surface tw:shadow-funcode-card
          tw:transition-transform tw:duration-500
          tw:motion-safe:hover:-translate-y-1
          tw:motion-reduce:transition-none
        "
      >
        <div
          className="
            tw:flex tw:items-center tw:gap-2
            tw:border-0 tw:border-b tw:border-solid tw:border-white/10
            tw:bg-white/5 tw:px-4 tw:py-3
          "
        >
          <span className="tw:h-2 tw:w-2 tw:rounded-full tw:bg-rose-300/70" />
          <span className="tw:h-2 tw:w-2 tw:rounded-full tw:bg-amber-200/70" />
          <span className="tw:h-2 tw:w-2 tw:rounded-full tw:bg-emerald-200/70" />

          <span
            className="
              tw:ml-auto tw:font-mono
              tw:text-[10px] tw:text-funcode-muted
            "
          >
            concepto / interfaz digital
          </span>
        </div>

        <div className="tw:grid tw:grid-cols-[48px_minmax(0,1fr)] tw:sm:grid-cols-[64px_minmax(0,1fr)]">
          <div
            className="
              tw:flex tw:flex-col tw:items-center tw:gap-5
              tw:border-0 tw:border-r tw:border-solid tw:border-white/10
              tw:bg-funcode-bg/50 tw:py-6
            "
          >
            <span className="tw:font-mono tw:text-sm tw:text-funcode-accent">
              {"</>"}
            </span>

            {[0, 1, 2, 3].map((item) => (
              <span
                key={item}
                className="
                  tw:h-5 tw:w-5 tw:rounded-md
                  tw:border tw:border-solid tw:border-white/15
                  tw:bg-white/5
                "
              />
            ))}
          </div>

          <div className="tw:min-w-0 tw:p-4 tw:sm:p-6">
            <div className="tw:mb-6 tw:flex tw:items-center tw:justify-between tw:gap-3">
              <span className="tw:text-xs tw:font-semibold tw:text-funcode-text">
                Tu negocio, conectado.
              </span>

              <span
                className="
                  tw:rounded-full tw:bg-funcode-accent/10
                  tw:px-2 tw:py-1 tw:text-[10px] tw:text-funcode-accent
                "
              >
                Vista conceptual
              </span>
            </div>

            <div
              className="
                tw:relative tw:mb-4 tw:overflow-hidden tw:rounded-xl
                tw:border tw:border-solid tw:border-white/10
                tw:bg-funcode-bg tw:p-5
              "
            >
              <div
                className="
                  tw:absolute tw:-right-5 tw:-bottom-12
                  tw:h-36 tw:w-36 tw:rounded-full
                  tw:border tw:border-solid tw:border-funcode-accent/25
                "
              />

              <div
                className="
                  tw:absolute tw:right-2 tw:-bottom-8
                  tw:h-24 tw:w-24 tw:rounded-full
                  tw:border tw:border-solid tw:border-funcode-violet/30
                "
              />

              <span className="tw:relative tw:text-[10px] tw:tracking-widest tw:text-funcode-accent tw:uppercase">
                Experiencias digitales
              </span>

              <p className="tw:relative tw:mt-3 tw:mb-5 tw:max-w-48 tw:text-xl tw:leading-tight tw:font-semibold tw:text-white">
                Una idea.
                <br />
                Nuevas posibilidades.
              </p>

              <div className="tw:h-2 tw:w-20 tw:rounded-full tw:bg-funcode-accent/80" />
            </div>

            <div className="tw:grid tw:grid-cols-2 tw:gap-3">
              {[
                { label: "Catálogo", color: "tw:bg-funcode-accent/15" },
                { label: "Gestión", color: "tw:bg-funcode-violet/15" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="
                    tw:rounded-xl tw:border tw:border-solid
                    tw:border-white/10 tw:bg-white/3 tw:p-3
                  "
                >
                  <div
                    className={`tw:mb-3 tw:h-12 tw:rounded-lg ${item.color}`}
                  />

                  <p className="tw:m-0 tw:text-xs tw:text-funcode-text">
                    {item.label}
                  </p>

                  <div className="tw:mt-2 tw:h-1.5 tw:w-2/3 tw:rounded-full tw:bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <figcaption className="tw:mt-4 tw:text-center tw:text-xs tw:leading-relaxed tw:text-funcode-muted">
        Composición conceptual de interfaces. El diseño y las funcionalidades se
        definen para cada proyecto.
      </figcaption>
    </figure>
  );
}

function HomePage() {
  return (
    <div
      className="
    tw:relative tw:isolate
    tw:mx-auto tw:w-full tw:max-w-7xl
    tw:overflow-hidden
    tw:bg-funcode-bg tw:font-sans tw:text-funcode-text
  "
    >
      {/* HERO */}
      <section
        aria-labelledby="home-title"
        className="
          tw:relative tw:px-5 tw:pt-12 tw:pb-10
          tw:sm:px-8 tw:lg:px-10 tw:lg:pt-20 tw:lg:pb-16
        "
      >
        <div
          aria-hidden="true"
          className="
            tw:pointer-events-none tw:absolute tw:-top-32 tw:-left-32
            tw:h-96 tw:w-96 tw:rounded-full
            tw:bg-funcode-accent/10 tw:blur-3xl
          "
        />

        <div
          className="
            tw:relative tw:grid tw:items-center tw:gap-12
            tw:lg:grid-cols-2
            tw:motion-safe:animate-funcode-enter
          "
        >
          <div className="tw:min-w-0">
            <p
              className="
                tw:mb-5 tw:inline-flex tw:items-center tw:gap-2
                tw:rounded-full tw:border tw:border-solid tw:border-white/10
                tw:bg-white/5 tw:px-3 tw:py-2
                tw:text-[11px] tw:font-medium tw:text-funcode-accent
              "
            >
              <span
                aria-hidden="true"
                className="tw:h-1.5 tw:w-1.5 tw:rounded-full tw:bg-funcode-accent"
              />
              Desarrollo web y soluciones empresariales
            </p>

            <h1
              id="home-title"
              className="
                tw:m-0 tw:text-4xl tw:leading-[1.08]
                tw:font-bold tw:tracking-tight tw:text-funcode-text
                tw:sm:text-5xl tw:xl:text-6xl
              "
            >
              Tu negocio.
              <br />
              Su siguiente
              <br />
              <span
                className="
                  tw:bg-linear-to-r tw:from-funcode-accent
                  tw:to-funcode-violet tw:bg-clip-text tw:text-transparent
                "
              >
                versión digital.
              </span>
            </h1>

            <p className="tw:mt-6 tw:mb-0 tw:max-w-xl tw:text-base tw:leading-relaxed tw:text-funcode-muted">
              Funcode desarrolla páginas web, aplicaciones y sistemas de gestión
              para presentar tu negocio, organizar tus procesos y conectar con
              tus clientes.
            </p>

            <div className="tw:mt-8 tw:flex tw:flex-wrap tw:gap-3">
              <Link to="/productos" className={primaryButton}>
                Explorar servicios
                <Arrow />
              </Link>

              <a href="#servicios" className={secondaryButton}>
                Conocer soluciones
              </a>
            </div>

            <p className="tw:mt-5 tw:mb-0 tw:text-xs tw:leading-relaxed tw:text-funcode-muted">
              Desde una landing page hasta una plataforma con backend y base de
              datos.
            </p>
          </div>

          <InterfacePreview />
        </div>
      </section>

      {/* SERVICIO DESTACADO */}
      <section
        aria-labelledby="landing-title"
        className="tw:px-5 tw:pb-12 tw:sm:px-8 tw:lg:px-10"
      >
        <div
          className="
            tw:grid tw:items-center tw:gap-6
            tw:rounded-2xl tw:border tw:border-solid tw:border-funcode-line
            tw:bg-funcode-surface tw:p-6 tw:md:p-8
            tw:lg:grid-cols-[minmax(0,1fr)_auto]
          "
        >
          <div>
            <p className="tw:mb-2 tw:text-xs tw:font-medium tw:text-funcode-accent">
              TU NEGOCIO EN LÍNEA
            </p>

            <h2
              id="landing-title"
              className="tw:m-0 tw:text-2xl tw:font-semibold tw:text-funcode-text"
            >
              Landing pages profesionales
            </h2>

            <p className="tw:mt-3 tw:mb-0 tw:max-w-2xl tw:text-sm tw:leading-relaxed tw:text-funcode-muted">
              Una página adaptable a celulares para presentar tus servicios y
              facilitar el contacto con tus clientes.
            </p>
          </div>

          <div className="tw:lg:text-right">
            <p className="tw:mb-4 tw:text-2xl tw:font-bold tw:tracking-tight tw:text-funcode-text">
              <span className="tw:mr-2 tw:text-sm tw:font-normal tw:text-funcode-muted">
                Desde
              </span>
              $129.990
              <span className="tw:ml-2 tw:text-xs tw:font-normal tw:text-funcode-muted">
                CLP
              </span>
            </p>

            <Link to="/productos?category=1" className={secondaryButton}>
              Ver servicios web
              <Arrow diagonal />
            </Link>
          </div>

          <p
            className="
              tw:m-0 tw:border-0 tw:border-t tw:border-solid
              tw:border-funcode-line tw:pt-4
              tw:text-xs tw:leading-relaxed tw:text-funcode-muted
              tw:lg:col-span-2
            "
          >
            Precio correspondiente al alcance base. Panel de administración,
            dominio, alojamiento y funcionalidades adicionales se cotizan por
            separado.
          </p>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section
        id="servicios"
        aria-labelledby="services-title"
        className="
          tw:scroll-mt-28 tw:px-5 tw:py-12
          tw:sm:px-8 tw:lg:px-10 tw:lg:py-16
        "
      >
        <SectionHeading
          id="services-title"
          eyebrow="Lo que podemos construir"
          title="Soluciones para cada etapa de tu negocio."
          description="Presencia digital, información organizada y herramientas que responden a las necesidades de tu proyecto."
        />

        <div className="tw:grid tw:gap-5 tw:lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
              className="
                tw:group tw:flex tw:min-w-0 tw:flex-col
                tw:rounded-2xl tw:border tw:border-solid tw:border-funcode-line
                tw:bg-funcode-surface/70 tw:p-6
                tw:transition tw:duration-300
                tw:hover:border-funcode-accent/50
                tw:hover:bg-funcode-surface
                tw:motion-safe:hover:-translate-y-1
                tw:motion-reduce:transition-none
              "
            >
              <div className="tw:mb-7 tw:flex tw:items-center tw:justify-between">
                <span
                  aria-hidden="true"
                  className="
                    tw:grid tw:h-12 tw:w-12 tw:place-items-center
                    tw:rounded-xl tw:bg-funcode-accent/10
                    tw:font-mono tw:text-lg tw:text-funcode-accent
                  "
                >
                  {service.symbol}
                </span>

                <span className="tw:font-mono tw:text-xs tw:text-funcode-muted">
                  / {service.number}
                </span>
              </div>

              <h3 className="tw:mb-4 tw:text-xl tw:leading-snug tw:font-semibold tw:text-funcode-text">
                {service.title}
              </h3>

              <p className="tw:mb-4 tw:text-sm tw:leading-relaxed tw:text-funcode-muted">
                {service.description}
              </p>

              <p className="tw:mb-6 tw:text-xs tw:leading-relaxed tw:text-funcode-muted">
                {service.examples}
              </p>

              <ul className="tw:mt-auto tw:mb-6 tw:flex tw:list-none tw:flex-wrap tw:gap-2 tw:p-0">
                {service.tags.map((tag) => (
                  <li
                    key={tag}
                    className="
                      tw:rounded-full tw:bg-white/5
                      tw:px-3 tw:py-1.5 tw:text-[11px] tw:text-funcode-muted
                    "
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <Link
                to={`/productos?category=${service.id}`}
                className="
                  tw:flex tw:min-h-11 tw:items-center tw:justify-between
                  tw:gap-3 tw:border-0 tw:border-t tw:border-solid
                  tw:border-funcode-line tw:pt-4
                  tw:text-sm tw:font-medium tw:text-funcode-text
                  tw:no-underline tw:hover:text-funcode-accent
                  tw:focus-visible:outline-2
                  tw:focus-visible:outline-offset-4
                  tw:focus-visible:outline-funcode-accent
                "
              >
                Explorar soluciones
                <Arrow diagonal />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* CAPACIDADES */}
      <section
        aria-labelledby="capabilities-title"
        className="tw:px-5 tw:py-12 tw:sm:px-8 tw:lg:px-10 tw:lg:py-16"
      >
        <SectionHeading
          id="capabilities-title"
          eyebrow="Más allá de una página"
          title="Tecnología que conecta y simplifica."
          description="También evaluamos automatización, integraciones y mejoras técnicas. Cada servicio se define según los objetivos y las características del proyecto."
        />

        <div className="tw:grid tw:gap-4 tw:sm:grid-cols-2">
          {capabilities.map((capability) => (
            <article
              key={capability.title}
              className="
                tw:flex tw:gap-4 tw:rounded-xl
                tw:border tw:border-solid tw:border-funcode-line
                tw:bg-white/2 tw:p-5
              "
            >
              <span
                aria-hidden="true"
                className="tw:mt-1 tw:text-funcode-accent"
              >
                <Arrow diagonal />
              </span>

              <div>
                <h3 className="tw:mb-2 tw:text-base tw:font-semibold tw:text-funcode-text">
                  {capability.title}
                </h3>

                <p className="tw:m-0 tw:text-sm tw:leading-relaxed tw:text-funcode-muted">
                  {capability.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PROCESO */}
      <section
        aria-labelledby="process-title"
        className="tw:px-5 tw:py-12 tw:sm:px-8 tw:lg:px-10 tw:lg:py-16"
      >
        <SectionHeading
          id="process-title"
          eyebrow="Del concepto a la publicación"
          title="Un proceso claro. Una solución a medida."
          description="El proyecto avanza por etapas, con alcance y entregables definidos antes de comenzar."
        />

        <ol className="tw:m-0 tw:grid tw:list-none tw:gap-6 tw:p-0 tw:sm:grid-cols-2 tw:lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li key={step.title}>
              <article
                className="
                  tw:h-full tw:border-0 tw:border-t tw:border-solid
                  tw:border-funcode-line tw:pt-5
                "
              >
                <span className="tw:font-mono tw:text-sm tw:text-funcode-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="tw:mt-5 tw:mb-2 tw:text-xl tw:font-semibold tw:text-funcode-text">
                  {step.title}
                </h3>

                <p className="tw:mb-3 tw:text-xs tw:font-medium tw:text-funcode-accent">
                  {step.subtitle}
                </p>

                <p className="tw:m-0 tw:text-sm tw:leading-relaxed tw:text-funcode-muted">
                  {step.description}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </section>

      {/* CIERRE */}
      <section
        aria-labelledby="home-cta-title"
        className="tw:px-5 tw:pt-8 tw:pb-12 tw:sm:px-8 tw:lg:px-10 tw:lg:pb-16"
      >
        <div
          className="
            tw:relative tw:overflow-hidden tw:rounded-2xl
            tw:border tw:border-solid tw:border-funcode-accent/25
            tw:bg-funcode-surface tw:p-7 tw:md:p-10
          "
        >
          <div
            aria-hidden="true"
            className="
              tw:pointer-events-none tw:absolute tw:-top-24 tw:-right-24
              tw:h-72 tw:w-72 tw:rounded-full
              tw:bg-funcode-violet/15 tw:blur-3xl
            "
          />

          <div className="tw:relative tw:max-w-2xl">
            <p className="tw:mb-3 tw:text-xs tw:tracking-widest tw:text-funcode-accent tw:uppercase">
              Tu próximo proyecto
            </p>

            <h2
              id="home-cta-title"
              className="
                tw:mb-4 tw:text-3xl tw:leading-tight
                tw:font-semibold tw:tracking-tight tw:text-funcode-text
                tw:md:text-4xl
              "
            >
              Una buena idea merece una solución bien construida.
            </h2>

            <p className="tw:mb-6 tw:text-base tw:leading-relaxed tw:text-funcode-muted">
              Explora los servicios de Funcode, revisa su alcance y encuentra el
              punto de partida para tu negocio.
            </p>

            <Link to="/productos" className={primaryButton}>
              Ver catálogo de servicios
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
