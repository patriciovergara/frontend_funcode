import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import usePosts from "../hooks/usePosts";
import useMyPosts from "../hooks/useMyPosts";
import useCurrentUser from "../hooks/useCurrentUser";
import PostCard from "../components/PostCard";

const panelClass = `
  tw:rounded-2xl
  tw:border tw:border-solid tw:border-funcode-line
  tw:bg-funcode-surface
`;

const buttonClass = `
  tw:inline-flex tw:min-h-11
  tw:items-center tw:justify-center tw:gap-2
  tw:rounded-xl
  tw:border tw:border-solid tw:border-funcode-line
  tw:bg-white/5 tw:px-4 tw:py-3
  tw:font-sans tw:text-sm tw:font-medium
  tw:text-funcode-text! tw:no-underline!
  tw:transition-colors
  tw:enabled:cursor-pointer
  tw:hover:bg-white/10
  tw:disabled:cursor-not-allowed tw:disabled:opacity-40
  tw:focus-visible:outline-2 tw:focus-visible:outline-offset-4
  tw:focus-visible:outline-funcode-accent
  tw:motion-reduce:transition-none
`;

const primaryButton = `
  tw:inline-flex tw:min-h-12
  tw:items-center tw:justify-center tw:gap-2
  tw:rounded-xl tw:border-0
  tw:bg-funcode-accent tw:px-5 tw:py-3
  tw:font-sans tw:text-sm tw:font-semibold
  tw:text-funcode-bg! tw:no-underline!
  tw:transition-colors tw:hover:bg-sky-200
  tw:focus-visible:outline-2 tw:focus-visible:outline-offset-4
  tw:focus-visible:outline-funcode-accent
  tw:motion-reduce:transition-none
`;

function Feedback({ children, success = false }) {
  return (
    <p
      role={success ? "status" : "alert"}
      className={`
        tw:mb-5 tw:rounded-xl
        tw:border tw:border-solid tw:p-4
        tw:text-sm tw:leading-relaxed
        ${
          success
            ? "tw:border-funcode-success/30 tw:bg-funcode-success/5 tw:text-funcode-success"
            : "tw:border-funcode-danger/30 tw:bg-funcode-danger/5 tw:text-funcode-danger"
        }
      `}
    >
      {children}
    </p>
  );
}

function AdminPublications({ user }) {
  const { deletePublication } = usePosts();

  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const {
    posts: myPosts,
    pagination,
    isLoading,
    error: loadError,
  } = useMyPosts(page);

  const totalPages =
    pagination && pagination.limit > 0
      ? Math.max(1, Math.ceil(pagination.total / pagination.limit))
      : 1;

  async function handleDelete(post) {
    if (deletingId !== null) {
      return;
    }

    setMessage("");
    setActionError("");

    if (user.role !== "admin" || post.user?.id !== user.id) {
      setActionError("No tienes permiso para eliminar esta publicación.");
      return;
    }

    const confirmed = window.confirm(
      `¿Eliminar la publicación "${post.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(post.id);

    try {
      await deletePublication(post.id);
      setMessage(`Publicación eliminada: ${post.title}`);
    } catch (err) {
      setActionError(
        err instanceof Error
          ? err.message
          : "No fue posible eliminar la publicación.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section aria-labelledby="publications-title">
      <header className="tw:mb-6 tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-4">
        <div>
          <p className="tw:mb-2 tw:text-xs tw:tracking-widest tw:text-funcode-accent tw:uppercase">
            Administración
          </p>

          <h2
            id="publications-title"
            className="tw:m-0 tw:text-2xl tw:font-semibold tw:text-funcode-text"
          >
            Mis publicaciones
          </h2>
        </div>

        <Link to="/publicaciones/nueva" className={primaryButton}>
          <span aria-hidden="true">+</span>
          Crear publicación
        </Link>
      </header>

      {message && <Feedback success>{message}</Feedback>}
      {actionError && <Feedback>{actionError}</Feedback>}

      <div aria-busy={isLoading}>
        {isLoading ? (
          <div className={`${panelClass} tw:p-8`} role="status">
            <p className="tw:m-0 tw:text-sm tw:text-funcode-muted">
              Cargando tus publicaciones...
            </p>
          </div>
        ) : loadError ? (
          <Feedback>{loadError}</Feedback>
        ) : (
          <>
            <p className="tw:mb-5 tw:text-sm tw:text-funcode-muted">
              Publicaciones propias:{" "}
              <span className="tw:font-semibold tw:text-funcode-text">
                {pagination?.total ?? 0}
              </span>
            </p>

            {myPosts.length === 0 ? (
              <div className={`${panelClass} tw:p-7`}>
                <h3 className="tw:mb-3 tw:text-lg tw:font-semibold tw:text-funcode-text">
                  {page > 1
                    ? "Esta página no tiene publicaciones"
                    : "Todavía no tienes publicaciones"}
                </h3>

                <p className="tw:mb-0 tw:text-sm tw:leading-relaxed tw:text-funcode-muted">
                  {page > 1
                    ? "Puedes volver a la primera página para consultar las publicaciones disponibles."
                    : "Crea tu primera publicación para incorporarla al catálogo de Funcode."}
                </p>

                {page > 1 && (
                  <button
                    type="button"
                    className={`${buttonClass} tw:mt-5`}
                    onClick={() => setPage(1)}
                  >
                    Volver a la primera página
                  </button>
                )}
              </div>
            ) : (
              <div className="tw:grid tw:gap-6 tw:md:grid-cols-2">
                {myPosts.map((post) => (
                  <div
                    key={post.id}
                    className="tw:flex tw:min-w-0 tw:flex-col"
                  >
                    <div className="tw:flex-1">
                      <PostCard post={post} />
                    </div>

                    {post.user?.id === user.id && (
                      <div className="tw:mt-3 tw:flex tw:flex-wrap tw:gap-3">
                        <Link
                          to={`/publicaciones/${post.id}/editar`}
                          className={buttonClass}
                          aria-label={`Editar ${post.title}`}
                        >
                          Editar
                        </Link>

                        <button
                          type="button"
                          className={`
                            ${buttonClass}
                            tw:border-funcode-danger/30
                            tw:text-funcode-danger!
                          `}
                          aria-label={`Eliminar ${post.title}`}
                          disabled={deletingId !== null}
                          onClick={() => handleDelete(post)}
                        >
                          {deletingId === post.id
                            ? "Eliminando..."
                            : "Eliminar"}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <nav
                aria-label="Paginación de mis publicaciones"
                className="tw:mt-8 tw:flex tw:flex-wrap tw:items-center tw:gap-4"
              >
                <button
                  type="button"
                  className={buttonClass}
                  disabled={page <= 1 || deletingId !== null}
                  onClick={() => setPage((current) => current - 1)}
                >
                  Anterior
                </button>

                <span className="tw:text-sm tw:text-funcode-muted">
                  Página {page} de {totalPages}
                </span>

                <button
                  type="button"
                  className={buttonClass}
                  disabled={page >= totalPages || deletingId !== null}
                  onClick={() => setPage((current) => current + 1)}
                >
                  Siguiente
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function ProfilePage() {
  const {
    user: profileUser,
    isLoading: isProfileLoading,
    error: profileError,
  } = useCurrentUser();

  const { session, logout } = useAuth();
  const navigate = useNavigate();

  const user = session?.user;

  if (!user) {
    return null;
  }

  const isAdmin = user.role === "admin";

  const initials = (profileUser?.name || user.name || "Usuario")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <section
      aria-labelledby="profile-title"
      className="
        tw:mx-auto tw:w-full tw:max-w-7xl
        tw:px-5 tw:py-10 tw:sm:px-8 tw:lg:px-10 tw:lg:py-14
        tw:font-sans tw:text-funcode-text
      "
    >
      <header
        className="
          tw:relative tw:mb-10 tw:overflow-hidden
          tw:rounded-3xl
          tw:border tw:border-solid tw:border-funcode-line
          tw:bg-funcode-surface/50 tw:p-6 tw:md:p-9
          tw:motion-safe:animate-funcode-enter
        "
      >
        <div
          aria-hidden="true"
          className="
            tw:pointer-events-none tw:absolute tw:-top-24 tw:-right-20
            tw:h-64 tw:w-64 tw:rounded-full
            tw:bg-funcode-violet/15 tw:blur-3xl
          "
        />

        <div className="tw:relative">
          <p className="tw:mb-3 tw:text-xs tw:font-semibold tw:tracking-widest tw:text-funcode-accent tw:uppercase">
            Tu cuenta en Funcode
          </p>

          <h1
            id="profile-title"
            className="
              tw:mb-4 tw:text-4xl tw:font-bold
              tw:tracking-tight tw:text-funcode-text tw:md:text-5xl
            "
          >
            Mi espacio.
          </h1>

          <p className="tw:m-0 tw:max-w-xl tw:text-base tw:leading-relaxed tw:text-funcode-muted">
            {isAdmin
              ? "Consulta tu perfil y administra tus publicaciones en el catálogo."
              : "Consulta los datos de tu cuenta y explora las soluciones digitales de Funcode."}
          </p>
        </div>
      </header>

      <div className="tw:grid tw:items-start tw:gap-8 tw:lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside
          aria-label="Información de la cuenta"
          className={`${panelClass} tw:p-6`}
        >
          <div
            aria-hidden="true"
            className="
              tw:mb-5 tw:grid tw:h-16 tw:w-16 tw:place-items-center
              tw:rounded-2xl tw:bg-funcode-accent/10
              tw:text-xl tw:font-semibold tw:text-funcode-accent
            "
          >
            {initials}
          </div>

          {isProfileLoading ? (
            <p role="status" className="tw:mb-5 tw:text-sm tw:text-funcode-muted">
              Cargando perfil...
            </p>
          ) : profileError ? (
            <Feedback>{profileError}</Feedback>
          ) : profileUser ? (
            <>
              <h2 className="tw:mb-3 tw:break-words tw:text-xl tw:font-semibold tw:text-funcode-text">
                {profileUser.name}
              </h2>

              <p className="tw:mb-5 tw:text-sm tw:text-funcode-muted tw:[overflow-wrap:anywhere]">
                {profileUser.email}
              </p>
            </>
          ) : (
            <p className="tw:mb-5 tw:text-sm tw:text-funcode-muted">
              No hay datos de perfil disponibles.
            </p>
          )}

          <span
            className="
              tw:inline-flex tw:rounded-full
              tw:border tw:border-solid tw:border-funcode-accent/20
              tw:bg-funcode-accent/5 tw:px-3 tw:py-1.5
              tw:text-xs tw:text-funcode-accent
            "
          >
            {isAdmin ? "Administrador" : "Miembro de Funcode"}
          </span>

          <div
            className="
              tw:mt-6 tw:flex tw:flex-col tw:gap-3
              tw:border-0 tw:border-t tw:border-solid
              tw:border-funcode-line tw:pt-6
            "
          >
            <Link to="/productos" className={buttonClass}>
              Explorar servicios
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className={buttonClass}
            >
              Cerrar sesión
            </button>
          </div>
        </aside>

        <div className="tw:min-w-0">
          {isAdmin ? (
            <AdminPublications user={user} />
          ) : (
            <section
              aria-labelledby="profile-services-title"
              className={`${panelClass} tw:relative tw:overflow-hidden tw:p-7 tw:md:p-9`}
            >
              <p className="tw:mb-3 tw:text-xs tw:tracking-widest tw:text-funcode-accent tw:uppercase">
                Tu próximo proyecto
              </p>

              <h2
                id="profile-services-title"
                className="
                  tw:mb-5 tw:max-w-xl tw:text-3xl
                  tw:leading-tight tw:font-semibold tw:text-funcode-text
                "
              >
                Encuentra el siguiente paso para tu negocio.
              </h2>

              <p className="tw:mb-7 tw:max-w-xl tw:text-base tw:leading-relaxed tw:text-funcode-muted">
                Revisa páginas web, catálogos digitales y sistemas
                a medida. Desde el detalle de cada servicio puedes
                consultar su alcance y enviar una solicitud de cotización.
              </p>

              <Link to="/productos" className={primaryButton}>
                Ver catálogo de servicios
              </Link>

              <div className="tw:mt-8 tw:grid tw:gap-3 tw:sm:grid-cols-3">
                {["Páginas web", "Catálogos digitales", "Sistemas a medida"].map(
                  (label) => (
                    <div
                      key={label}
                      className="
                        tw:rounded-xl tw:border tw:border-solid
                        tw:border-funcode-line tw:bg-funcode-bg/50
                        tw:p-4 tw:text-sm tw:text-funcode-muted
                      "
                    >
                      {label}
                    </div>
                  ),
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;