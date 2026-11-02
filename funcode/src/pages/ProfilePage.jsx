import { useState } from "react";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import usePosts from "../hooks/usePosts";
import useMyPosts from "../hooks/useMyPosts";
import PostCard from "../components/PostCard";
import useCurrentUser from "../hooks/useCurrentUser";

function ProfilePage() {
  const {
    user: profileUser,
    isLoading: isProfileLoading,
    error: profileError,
  } = useCurrentUser();

  const { session } = useAuth();
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

  const user = session.user;

  if (!user) {
    return null;
  }

  const totalPages = pagination
    ? Math.max(1, Math.ceil(pagination.total / pagination.limit))
    : 1;

  async function handleDelete(post) {
    if (deletingId !== null) {
      return;
    }

    setMessage("");
    setActionError("");

    if (post.user.id !== user.id) {
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
    <section>
      <h1 className="mb-4">Mi perfil</h1>

      <div className="row g-4">
        <aside className="col-12 col-lg-3">
          <div className="card bg-light">
            <div className="card-body p-4">
              {isProfileLoading ? (
                <p className="mb-0" role="status">
                  Cargando perfil...
                </p>
              ) : profileError ? (
                <p className="alert alert-danger mb-0" role="alert">
                  {profileError}
                </p>
              ) : profileUser ? (
                <>
                  <h2 className="h5">{profileUser.name}</h2>

                  <p
                    className="text-secondary"
                    style={{ overflowWrap: "anywhere" }}
                  >
                    {profileUser.email}
                  </p>

                  <p className="mb-0">Miembro de Funcode</p>
                </>
              ) : (
                <p className="mb-0">No hay datos de perfil disponibles.</p>
              )}
            </div>
          </div>
        </aside>

        <div className="col-12 col-lg-9">
          <div
            className="d-flex flex-wrap justify-content-between
              align-items-center gap-3 mb-4"
          >
            <h2 className="h4 mb-0">Mis publicaciones</h2>

            <Link to="/publicaciones/nueva" className="btn btn-dark">
              Crear publicación
            </Link>
          </div>

          {message && (
            <p className="alert alert-success" role="status">
              {message}
            </p>
          )}

          {actionError && (
            <p className="alert alert-danger" role="alert">
              {actionError}
            </p>
          )}

          {isLoading ? (
            <p role="status">Cargando tus publicaciones...</p>
          ) : loadError ? (
            <p className="alert alert-danger" role="alert">
              {loadError}
            </p>
          ) : (
            <>
              <p className="text-secondary">
                Publicaciones propias: {pagination?.total ?? 0}
              </p>

              {myPosts.length === 0 ? (
                <div className="alert alert-info">
                  <p className="mb-0">
                    {page > 1
                      ? "No hay publicaciones en esta página."
                      : "Todavía no tienes publicaciones."}
                  </p>

                  {page > 1 && (
                    <button
                      type="button"
                      className="btn btn-outline-dark btn-sm mt-3"
                      onClick={() => setPage(1)}
                    >
                      Volver a la primera página
                    </button>
                  )}
                </div>
              ) : (
                <div className="row g-4">
                  {myPosts.map((post) => (
                    <div key={post.id} className="col-12 col-md-6">
                      <div className="d-flex flex-column h-100">
                        <PostCard post={post} />

                        <Link
                          to={`/publicaciones/${post.id}/editar`}
                          className="btn btn-outline-dark mt-2 align-self-start"
                        >
                          Editar
                        </Link>

                        <button
                          type="button"
                          className="btn btn-outline-danger mt-2 align-self-start"
                          aria-label={`Eliminar ${post.title}`}
                          disabled={deletingId !== null}
                          onClick={() => handleDelete(post)}
                        >
                          {deletingId === post.id
                            ? "Eliminando..."
                            : "Eliminar"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <nav
                  aria-label="Paginación de mis publicaciones"
                  className="d-flex flex-wrap align-items-center gap-3 mt-4"
                >
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    disabled={page <= 1 || deletingId !== null}
                    onClick={() => setPage(page - 1)}
                  >
                    Anterior
                  </button>

                  <span>
                    Página {page} de {totalPages}
                  </span>

                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    disabled={page >= totalPages || deletingId !== null}
                    onClick={() => setPage(page + 1)}
                  >
                    Siguiente
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
