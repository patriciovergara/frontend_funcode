import { useEffect, useState } from "react";

import { listProjects } from "../services/projectsApi";

function ProjectCard({ project }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article
      className="
        tw:overflow-hidden tw:rounded-2xl
        tw:border tw:border-solid tw:border-funcode-line
        tw:bg-funcode-surface
      "
    >
      {project.image_url && !imageFailed ? (
        <img
          src={project.image_url}
          alt={`Imagen de ${project.title}`}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="tw:aspect-[16/9] tw:w-full tw:bg-funcode-bg tw:object-cover"
        />
      ) : (
        <div
          className="
            tw:flex tw:aspect-[16/9] tw:items-center tw:justify-center
            tw:bg-funcode-bg tw:font-mono tw:text-4xl tw:text-funcode-accent
          "
          aria-hidden="true"
        >
          {"</>"}
        </div>
      )}

      <div className="tw:p-5 tw:sm:p-6">
        {project.featured && (
          <p className="tw:mb-3 tw:text-xs tw:font-semibold tw:tracking-widest tw:text-funcode-accent tw:uppercase">
            Proyecto destacado
          </p>
        )}

        <h2 className="tw:mb-3 tw:text-xl tw:font-semibold tw:text-funcode-text">
          {project.title}
        </h2>

        <p className="tw:mb-5 tw:text-sm tw:leading-relaxed tw:text-funcode-muted">
          {project.description}
        </p>

        {project.technologies.length > 0 && (
          <ul
            className="tw:mb-5 tw:flex tw:flex-wrap tw:gap-2 tw:p-0"
            aria-label="Tecnologías"
          >
            {project.technologies.map((technology) => (
              <li
                key={technology}
                className="
                  tw:list-none tw:rounded-full
                  tw:border tw:border-solid tw:border-funcode-line
                  tw:px-3 tw:py-1 tw:text-xs tw:text-funcode-muted
                "
              >
                {technology}
              </li>
            ))}
          </ul>
        )}

        <a
          href={project.project_url}
          target="_blank"
          rel="noopener noreferrer"
          className="
            tw:inline-flex tw:min-h-11 tw:items-center tw:gap-2
            tw:rounded-xl tw:bg-funcode-accent tw:px-4 tw:py-2.5
            tw:text-sm tw:font-semibold tw:text-funcode-bg
            tw:no-underline tw:hover:bg-sky-200
            tw:focus-visible:outline-2 tw:focus-visible:outline-offset-4
            tw:focus-visible:outline-funcode-accent
          "
        >
          Visitar proyecto
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProjects() {
      try {
        const data = await listProjects({ signal: controller.signal });

        if (!controller.signal.aborted) {
          setProjects(data);
          setError("");
        }
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "No fue posible cargar los proyectos.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadProjects();
    return () => controller.abort();
  }, []);

  return (
    <section
      aria-labelledby="projects-title"
      className="
        tw:mx-auto tw:w-full tw:max-w-7xl
        tw:px-5 tw:py-12 tw:font-sans tw:text-funcode-text
        tw:sm:px-8 tw:lg:px-10 tw:lg:py-16
      "
    >
      <header className="tw:mb-10 tw:max-w-3xl">
        <p className="tw:mb-3 tw:text-xs tw:font-semibold tw:tracking-widest tw:text-funcode-accent tw:uppercase">
          Portafolio
        </p>
        <h1
          id="projects-title"
          className="tw:mb-4 tw:text-3xl tw:font-bold tw:tracking-tight tw:text-funcode-text tw:sm:text-4xl"
        >
          Proyectos realizados
        </h1>
        <p className="tw:m-0 tw:text-base tw:leading-relaxed tw:text-funcode-muted">
          Una selección de sitios y soluciones digitales desarrolladas por Funcode.
        </p>
      </header>

      {isLoading ? (
        <p className="tw:rounded-xl tw:border tw:border-solid tw:border-funcode-line tw:p-5 tw:text-sm tw:text-funcode-muted" role="status">
          Cargando proyectos...
        </p>
      ) : error ? (
        <p className="tw:rounded-xl tw:border tw:border-solid tw:border-funcode-danger/30 tw:bg-funcode-danger/5 tw:p-5 tw:text-sm tw:text-funcode-danger" role="alert">
          {error}
        </p>
      ) : projects.length === 0 ? (
        <p className="tw:rounded-xl tw:border tw:border-solid tw:border-funcode-line tw:p-5 tw:text-sm tw:text-funcode-muted">
          Pronto compartiremos aquí nuestros proyectos.
        </p>
      ) : (
        <div className="tw:grid tw:gap-6 tw:md:grid-cols-2 tw:xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProjectsPage;
