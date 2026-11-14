import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  createProject,
  deleteProject,
  listProjects,
  updateProject,
} from "../services/projectsApi";

const emptyForm = {
  title: "",
  description: "",
  project_url: "",
  image_url: "",
  technologies: "",
  featured: false,
  is_published: true,
  display_order: "0",
};

const fieldClass = `
  tw:block tw:min-h-11 tw:w-full tw:rounded-xl
  tw:border tw:border-solid tw:border-funcode-line
  tw:bg-funcode-bg tw:px-3 tw:py-2.5 tw:text-sm tw:text-funcode-text
  tw:outline-none tw:focus:border-funcode-accent
  tw:focus:ring-2 tw:focus:ring-funcode-accent/15
`;

const labelClass = "tw:mb-2 tw:block tw:text-sm tw:font-medium tw:text-funcode-text";

function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function refreshProjects(signal) {
    const data = await listProjects({ manage: true, signal });
    setProjects(data);
  }

  useEffect(() => {
    const controller = new AbortController();

    async function loadProjects() {
      try {
        await refreshProjects(controller.signal);
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

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function startEditing(project) {
    setEditingId(project.id);
    setForm({
      title: project.title,
      description: project.description,
      project_url: project.project_url,
      image_url: project.image_url ?? "",
      technologies: project.technologies.join(", "),
      featured: project.featured,
      is_published: project.is_published,
      display_order: String(project.display_order),
    });
    setError("");
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSaving) return;

    setError("");
    setNotice("");

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      project_url: form.project_url.trim(),
      image_url: form.image_url.trim(),
      technologies: form.technologies
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean),
      featured: form.featured,
      is_published: form.is_published,
      display_order: Number(form.display_order),
    };

    setIsSaving(true);
    try {
      if (editingId === null) {
        await createProject(payload);
        setNotice("Proyecto agregado correctamente.");
      } else {
        await updateProject(editingId, payload);
        setNotice("Proyecto actualizado correctamente.");
      }

      resetForm();
      await refreshProjects();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "No fue posible guardar el proyecto.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(project) {
    if (deletingId !== null) return;

    const confirmed = window.confirm(
      `¿Eliminar el proyecto "${project.title}"?`,
    );
    if (!confirmed) return;

    setError("");
    setNotice("");
    setDeletingId(project.id);

    try {
      await deleteProject(project.id);
      setProjects((current) => current.filter((item) => item.id !== project.id));
      setNotice(`Proyecto eliminado: ${project.title}`);
      if (editingId === project.id) resetForm();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "No fue posible eliminar el proyecto.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section
      aria-labelledby="admin-projects-title"
      className="
        tw:mx-auto tw:w-full tw:max-w-7xl
        tw:px-5 tw:py-10 tw:font-sans tw:text-funcode-text
        tw:sm:px-8 tw:lg:px-10 tw:lg:py-14
      "
    >
      <header className="tw:mb-8">
        <Link
          to="/mi-perfil"
          className="tw:mb-5 tw:inline-flex tw:text-sm tw:text-funcode-muted! tw:underline-offset-4 tw:hover:text-funcode-accent!"
        >
          Volver al perfil
        </Link>
        <p className="tw:mb-2 tw:text-xs tw:font-semibold tw:tracking-widest tw:text-funcode-accent tw:uppercase">
          Administración
        </p>
        <h1 id="admin-projects-title" className="tw:m-0 tw:text-3xl tw:font-bold tw:text-funcode-text">
          Gestionar proyectos
        </h1>
      </header>

      {error && (
        <p role="alert" className="tw:mb-5 tw:rounded-xl tw:border tw:border-solid tw:border-funcode-danger/30 tw:bg-funcode-danger/5 tw:p-4 tw:text-sm tw:text-funcode-danger">
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="tw:mb-5 tw:rounded-xl tw:border tw:border-solid tw:border-funcode-success/30 tw:bg-funcode-success/5 tw:p-4 tw:text-sm tw:text-funcode-success">
          {notice}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        aria-busy={isSaving}
        className="tw:mb-10 tw:grid tw:gap-5 tw:rounded-2xl tw:border tw:border-solid tw:border-funcode-line tw:bg-funcode-surface tw:p-5 tw:sm:p-7"
      >
        <h2 className="tw:m-0 tw:text-xl tw:font-semibold tw:text-funcode-text">
          {editingId === null ? "Agregar proyecto" : "Editar proyecto"}
        </h2>

        <div className="tw:grid tw:gap-5 tw:md:grid-cols-2">
          <div>
            <label htmlFor="project-title" className={labelClass}>Nombre del proyecto</label>
            <input id="project-title" name="title" value={form.title} onChange={handleChange} className={fieldClass} maxLength={150} required />
          </div>
          <div>
            <label htmlFor="project-url" className={labelClass}>Enlace del proyecto</label>
            <input id="project-url" name="project_url" type="url" value={form.project_url} onChange={handleChange} className={fieldClass} placeholder="https://ejemplo.cl" maxLength={500} required />
          </div>
          <div>
            <label htmlFor="project-image" className={labelClass}>URL de imagen (opcional)</label>
            <input id="project-image" name="image_url" type="url" value={form.image_url} onChange={handleChange} className={fieldClass} placeholder="https://ejemplo.cl/imagen.jpg" maxLength={1000} />
          </div>
          <div>
            <label htmlFor="project-technologies" className={labelClass}>Tecnologías (separadas por coma)</label>
            <input id="project-technologies" name="technologies" value={form.technologies} onChange={handleChange} className={fieldClass} placeholder="React, Node.js, PostgreSQL" />
          </div>
          <div>
            <label htmlFor="project-order" className={labelClass}>Orden</label>
            <input id="project-order" name="display_order" type="number" min="0" max="100000" step="1" value={form.display_order} onChange={handleChange} className={fieldClass} required />
          </div>
          <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-x-6 tw:gap-y-3">
            <label className="tw:inline-flex tw:items-center tw:gap-2 tw:text-sm tw:text-funcode-text">
              <input name="featured" type="checkbox" checked={form.featured} onChange={handleChange} />
              Destacar
            </label>
            <label className="tw:inline-flex tw:items-center tw:gap-2 tw:text-sm tw:text-funcode-text">
              <input name="is_published" type="checkbox" checked={form.is_published} onChange={handleChange} />
              Publicado
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="project-description" className={labelClass}>Descripción</label>
          <textarea id="project-description" name="description" value={form.description} onChange={handleChange} className={`${fieldClass} tw:min-h-32`} rows="4" maxLength={3000} required />
        </div>

        <div className="tw:flex tw:flex-wrap tw:gap-3">
          <button type="submit" disabled={isSaving} className="tw:min-h-11 tw:rounded-xl tw:bg-funcode-accent tw:px-5 tw:py-2.5 tw:text-sm tw:font-semibold tw:text-funcode-bg tw:disabled:opacity-60">
            {isSaving ? "Guardando..." : editingId === null ? "Agregar proyecto" : "Guardar cambios"}
          </button>
          {editingId !== null && (
            <button type="button" onClick={resetForm} className="tw:min-h-11 tw:rounded-xl tw:border tw:border-solid tw:border-funcode-line tw:px-5 tw:py-2.5 tw:text-sm tw:text-funcode-text">
              Cancelar edición
            </button>
          )}
        </div>
      </form>

      <section aria-labelledby="projects-list-title">
        <h2 id="projects-list-title" className="tw:mb-5 tw:text-xl tw:font-semibold tw:text-funcode-text">
          Proyectos registrados
        </h2>

        {isLoading ? (
          <p role="status" className="tw:text-sm tw:text-funcode-muted">Cargando proyectos...</p>
        ) : projects.length === 0 ? (
          <p className="tw:text-sm tw:text-funcode-muted">Aún no hay proyectos registrados.</p>
        ) : (
          <ul className="tw:grid tw:gap-4 tw:p-0">
            {projects.map((project) => (
              <li key={project.id} className="tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-4 tw:rounded-2xl tw:border tw:border-solid tw:border-funcode-line tw:bg-funcode-surface tw:p-4">
                <div className="tw:min-w-0">
                  <h3 className="tw:mb-1 tw:text-base tw:font-semibold tw:text-funcode-text">{project.title}</h3>
                  <p className="tw:mb-1 tw:break-all tw:text-sm tw:text-funcode-muted">{project.project_url}</p>
                  <p className="tw:m-0 tw:text-xs tw:text-funcode-muted">
                    {project.is_published ? "Publicado" : "Borrador"}
                    {project.featured ? " · Destacado" : ""}
                  </p>
                </div>
                <div className="tw:flex tw:gap-2">
                  <button type="button" onClick={() => startEditing(project)} className="tw:min-h-10 tw:rounded-lg tw:border tw:border-solid tw:border-funcode-line tw:px-3 tw:text-sm tw:text-funcode-text">
                    Editar
                  </button>
                  <button type="button" onClick={() => handleDelete(project)} disabled={deletingId === project.id} className="tw:min-h-10 tw:rounded-lg tw:border tw:border-solid tw:border-funcode-danger/40 tw:px-3 tw:text-sm tw:text-funcode-danger tw:disabled:opacity-60">
                    {deletingId === project.id ? "Eliminando..." : "Eliminar"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}

export default AdminProjectsPage;
