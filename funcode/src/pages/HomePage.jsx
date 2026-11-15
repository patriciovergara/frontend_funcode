import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import LayerStack from "../components/LayerStack";
import ServiceCarousel from "../components/ServiceCarousel";
import { listProjects } from "../services/projectsApi";
import "./HomePage.css";

const services = [
  {
    id: 1,
    number: "01 / 03",
    art: "web",
    title: "Páginas web profesionales",
    description:
      "Landing pages, sitios corporativos y páginas autoadministrables que presentan tu negocio con claridad.",
    examples:
      "Landing pages desde $64.995 CLP. Administración y funciones adicionales según cotización.",
    tags: ["Presencia digital", "Diseño adaptable"],
  },
  {
    id: 2,
    number: "02 / 03",
    art: "catalogo",
    title: "Catálogos digitales",
    description:
      "Productos y servicios organizados en una experiencia visual pensada para facilitar su exploración.",
    examples:
      "Imágenes, categorías, precios, búsqueda y filtros según el alcance de cada proyecto.",
    tags: ["Productos", "Catálogos administrables"],
  },
  {
    id: 3,
    number: "03 / 03",
    art: "sistemas",
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

function Arrow({ diagonal = false }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="square"
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

function SectionHeading({ index, label, title, description, id }) {
  return (
    <div className="fc-home__heading">
      <p className="fc-home__label">
        <span>[{index}]</span> {label}
      </p>
      <h2 id={id}>{title}</h2>
      {description && <p className="fc-home__heading-text">{description}</p>}
    </div>
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
        <p className="fc-work-card__eyebrow">Diseño y desarrollo web</p>
        <h3 className="fc-work-card__title">{project.title}</h3>
        {project.description && (
          <p className="fc-work-card__description">{project.description}</p>
        )}
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
      className="fc-home__section"
      aria-labelledby="featured-work-title"
    >
      <SectionHeading
        id="featured-work-title"
        index="02"
        label="Trabajo en producción"
        title="Ideas que ya están en línea."
        description="Proyectos reales que puedes visitar ahora mismo."
      />

      {loading && (
        <p className="fc-home__status" role="status">
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
    <div className="fc-home">
      <section aria-labelledby="home-title" className="fc-home__hero">
        <div className="fc-home__hero-grid">
          <div className="fc-home__hero-copy">
            <p className="fc-home__label fc-home__label--hero">
              <span>FC—01</span> Estudio de software · Chile
            </p>

            <h1 id="home-title" className="fc-home__title">
              Software hecho <mark>a medida</mark>, la presencia digital que tu negocio necesita.
            </h1>

            <p className="fc-home__lead">
              Diseñamos y programamos sitios web, catálogos y sistemas con base
              de datos propia. Tú nos cuentas qué necesitas; nosotros lo
              construimos de punta a punta.
            </p>

            <div className="fc-home__actions">
              <Link to="/contacto" className="fc-btn fc-btn--primary">
                Cotizar mi proyecto
                <Arrow />
              </Link>
              <Link to="/proyectos" className="fc-btn fc-btn--ghost">
                Ver proyectos reales
              </Link>
            </div>
          </div>

          <LayerStack />
        </div>
      </section>

      <div className="fc-home__ticker" aria-label="Qué hacemos">
        <span>Sitios web</span>
        <span>Catálogos digitales</span>
        <span>Sistemas a medida</span>
        <span>Integraciones</span>
      </div>

      <section
        id="servicios"
        aria-labelledby="services-title"
        className="fc-home__section fc-home__section--services"
      >
        <SectionHeading
          id="services-title"
          index="01"
          label="Servicios"
          title="Tres formas de llevar tu negocio a internet."
          description="Arrastra, usa las flechas o el teclado para recorrerlos."
        />

        <ServiceCarousel services={services} />

        <div className="fc-home__price">
          <div>
            <p className="fc-home__label">
              <span>[+]</span> Para empezar
            </p>
            <h3>Landing pages profesionales</h3>
            <p>
              Una página adaptable a celulares para presentar tus servicios y
              facilitar el contacto con tus clientes.
            </p>
          </div>

          <div className="fc-home__price-side">
            <p className="fc-home__amount">
              <small>Desde</small> $64.995 <small>CLP</small>
            </p>
            <Link to="/productos?category=1" className="fc-btn fc-btn--ghost">
              Ver servicios web <Arrow diagonal />
            </Link>
          </div>

          <p className="fc-home__fine">
            Precio correspondiente al alcance base. Panel de administración,
            dominio, alojamiento y funcionalidades adicionales se cotizan por
            separado.
          </p>
        </div>
      </section>

      <FeaturedWork />

      <section
        aria-labelledby="capabilities-title"
        className="fc-home__section"
      >
        <SectionHeading
          id="capabilities-title"
          index="03"
          label="Más allá de una página"
          title="Tecnología que conecta y simplifica."
          description="También evaluamos automatización, integraciones y mejoras técnicas. Cada servicio se define según los objetivos y las características del proyecto."
        />

        <div className="fc-home__caps">
          {capabilities.map((capability) => (
            <article key={capability.title}>
              <Arrow diagonal />
              <div>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="process-title" className="fc-home__section">
        <SectionHeading
          id="process-title"
          index="04"
          label="Del concepto a la publicación"
          title="Un proceso claro. Una solución a medida."
          description="El proyecto avanza por etapas, con alcance y entregables definidos antes de comenzar."
        />

        <ol className="fc-home__steps">
          {processSteps.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p className="fc-home__step-sub">{step.subtitle}</p>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="home-cta-title"
        className="fc-home__section fc-home__section--cta"
      >
        <div className="fc-home__cta">
          <p className="fc-home__label">
            <span>[05]</span> Tu próximo proyecto
          </p>
          <h2 id="home-cta-title">
            ¿Tienes un desafío? Convirtámoslo en una solución digital.
          </h2>
          <p>
            Cuéntanos qué necesitas. Revisaremos tu idea y te ayudaremos a
            definir un camino claro para llevarla a cabo.
          </p>
          <Link to="/contacto" className="fc-btn fc-btn--dark">
            Hablemos de tu proyecto
            <Arrow />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
