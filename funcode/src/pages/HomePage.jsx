import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listProjects } from "../services/projectsApi";
import "./HomePage.css";

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
          tw:font-display tw:font-semibold tw:tracking-tight tw:text-funcode-text
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
  const [previewMode, setPreviewMode] = useState("web");
  const previewVariants = {
    web: {
      label: "Experiencia web",
      title: "Tu negocio, listo para dar el siguiente paso.",
      description:
        "Una presencia clara y atractiva para presentar lo que haces y facilitar el contacto.",
      feature: "Una idea. Nuevas posibilidades.",
      action: "Explorar servicios",
    },
    system: {
      label: "Sistema a medida",
      title: "Menos tareas repetidas. Más claridad.",
      description:
        "Herramientas conectadas para ordenar información y apoyar el trabajo de tu equipo.",
      feature: "Procesos simples. Mejor organizados.",
      action: "Conocer soluciones",
    },
  };
  const content = previewVariants[previewMode];

  return (
    <figure className="fc-preview" aria-label="Vista conceptual de soluciones Funcode">
      <div className="fc-preview__window">
        <div className="fc-preview__topbar">
          <div className="fc-preview__brand">
            <span aria-hidden="true" className="fc-preview__brand-mark">
              F
            </span>
            <span>FUNCODE / DIGITAL STUDIO</span>
          </div>

          <div className="fc-preview__switcher" role="group" aria-label="Tipo de solución">
            <button
              type="button"
              aria-pressed={previewMode === "web"}
              onClick={() => setPreviewMode("web")}
            >
              Sitio web
            </button>
            <button
              type="button"
              aria-pressed={previewMode === "system"}
              onClick={() => setPreviewMode("system")}
            >
              Sistema
            </button>
          </div>
        </div>

        <div className="fc-preview__content" aria-live="polite">
          <div className="fc-preview__rail" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="fc-preview__main">
            <p className="fc-preview__caption">{content.label}</p>
            <h2 className="fc-preview__headline">{content.title}</h2>
            <p className="fc-preview__description">{content.description}</p>

            <div className="fc-preview__canvas">
              <span className="fc-preview__canvas-label">
                Diseñado para tu negocio
              </span>
              <p className="fc-preview__canvas-title">{content.feature}</p>
              <span className="fc-preview__canvas-action">
                {content.action} <Arrow />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="fc-preview__float" aria-hidden="true">
        <span className="fc-preview__float-icon">✳</span>
        <span>Diseño pensado<br />para personas</span>
      </div>
    </figure>
  );
}

function ProjectCard({ project, index }) {
  const [imageUnavailable, setImageUnavailable] = useState(!project.image_url);
  const initials = project.title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <a
      className="fc-work-card"
      href={project.project_url}
      target="_blank"
      rel="noreferrer"
      aria-label={`${project.title}: abrir sitio en una pestaña nueva`}
    >
      <div className="fc-work-card__image">
        <span className="fc-work-card__number">
          PROYECTO / {String(index + 1).padStart(2, "0")}
        </span>
        {project.image_url && !imageUnavailable ? (
          <img
            src={project.image_url}
            alt=""
            loading="lazy"
            onError={() => setImageUnavailable(true)}
          />
        ) : (
          <span className="fc-work-card__fallback" aria-hidden="true">
            {initials}
          </span>
        )}
        <span className="fc-work-card__open" aria-hidden="true">
          <Arrow diagonal />
        </span>
      </div>

      <div className="fc-work-card__body">
        <div>
          <p className="fc-work-card__eyebrow">Diseño y desarrollo web</p>
          <h3 className="fc-work-card__title">{project.title}</h3>
          {project.description && (
            <p className="fc-work-card__description">{project.description}</p>
          )}
        </div>
      </div>
    </a>
  );
}

function FeaturedWork() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    listProjects({ signal: controller.signal })
      .then((result) => {
        if (active) setProjects(result.slice(0, 2));
      })
      .catch(() => {
        if (active && !controller.signal.aborted) setHasError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  return (
    <section
      className="fc-home__section fc-home__work"
      aria-labelledby="featured-work-title"
    >
      <div className="fc-home__section-heading">
        <p className="tw:mb-3 tw:text-xs tw:font-semibold tw:tracking-widest tw:text-funcode-accent tw:uppercase">
          Trabajo seleccionado
        </p>
        <h2
          id="featured-work-title"
          className="tw:m-0 tw:text-3xl tw:leading-tight tw:font-semibold tw:tracking-tight tw:text-funcode-text tw:md:text-4xl"
        >
          Ideas que ya están en línea.
        </h2>
        <p className="tw:mt-4 tw:mb-0 tw:text-base tw:leading-relaxed tw:text-funcode-muted">
          Conoce algunos de los proyectos que hemos desarrollado junto a
          nuestros clientes.
        </p>
      </div>

      {loading && (
        <p className="tw:m-0 tw:text-sm tw:text-funcode-muted" role="status">
          Cargando proyectos…
        </p>
      )}

      {hasError && (
        <p className="fc-home__error" role="alert">
          No fue posible cargar los proyectos en este momento. Puedes visitar
          nuestro portafolio para conocerlos.
        </p>
      )}

      {!loading && !hasError && projects.length > 0 && (
        <div className="fc-home__work-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}

      <div className="fc-home__work-footer">
        <span>Proyectos reales, construidos para necesidades reales.</span>
        <Link to="/proyectos">
          Ver todos los proyectos <Arrow />
        </Link>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <div className="fc-home tw:font-sans">
      {/* HERO */}
      <section
        aria-labelledby="home-title"
        className="fc-home__hero"
      >
        <div className="fc-home__hero-grid tw:motion-safe:animate-funcode-enter">
          <div className="fc-home__hero-copy">
            <p className="fc-home__eyebrow">Funcode · estudio digital</p>
            <h1
              id="home-title"
              className="fc-home__title"
            >
              Hagamos que tu negocio
              <em>se vea y funcione mejor.</em>
            </h1>
            <p className="fc-home__lead">
              Diseñamos y desarrollamos sitios web, sistemas e integraciones
              para que tu negocio pueda dar el siguiente paso con una solución
              hecha a su medida.
            </p>
            <div className="fc-home__actions">
              <Link to="/contacto" className={primaryButton}>
                Cuéntanos tu idea
                <Arrow />
              </Link>
              <Link to="/proyectos" className={secondaryButton}>
                Ver proyectos <Arrow diagonal />
              </Link>
            </div>
            <p className="fc-home__hero-note">
              <span>Sitios web</span>
              <span>Sistemas a medida</span>
              <span>Integraciones</span>
            </p>
          </div>
          <InterfacePreview />
        </div>
      </section>

      <div className="fc-home__ticker" aria-label="Servicios Funcode">
        <span>Diseño web</span>
        <span>Desarrollo a medida</span>
        <span>Automatización</span>
        <span>Integraciones</span>
      </div>

      <FeaturedWork />

      {/* SERVICIO DESTACADO */}
      <section
        aria-labelledby="landing-title"
        className="fc-home__section tw:pt-4"
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
        className="fc-home__section tw:scroll-mt-28"
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
        className="fc-home__section"
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
        className="fc-home__section"
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
        className="fc-home__section"
      >
        <div className="fc-home__cta">
          <div className="tw:relative tw:max-w-3xl">
            <p className="tw:mb-3 tw:text-xs tw:tracking-widest tw:text-funcode-accent tw:uppercase">
              Tu próximo proyecto
            </p>

            <h2
              id="home-cta-title"
              className="tw:mb-4 tw:text-3xl tw:leading-tight tw:font-semibold tw:tracking-tight tw:text-funcode-text tw:md:text-4xl"
            >
              ¿Tienes un desafío? Convirtámoslo en una solución digital.
            </h2>

            <p className="tw:mb-6 tw:text-base tw:leading-relaxed tw:text-funcode-muted">
              Cuéntanos qué necesitas. Revisaremos tu idea y te ayudaremos a
              definir un camino claro para llevarla a cabo.
            </p>

            <Link to="/contacto" className={primaryButton}>
              Hablemos de tu proyecto
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
