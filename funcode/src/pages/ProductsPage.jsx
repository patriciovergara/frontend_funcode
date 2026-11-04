import { useSearchParams } from "react-router-dom";

import PostCard from "../components/PostCard";
import useCatalog from "../hooks/useCatalog";
import { categories } from "../data/mockData";

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";

  const requestedPage = Number(searchParams.get("page") ?? "1");
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const { posts, pagination, isLoading, error } = useCatalog({
    category,
    search,
    page,
  });

  const totalPages = pagination
    ? Math.max(1, Math.ceil(pagination.total / pagination.limit))
    : 1;

  function updateFilter(name, value) {
    const nextParams = new URLSearchParams(searchParams);

    if (value) {
      nextParams.set(name, value);
    } else {
      nextParams.delete(name);
    }

    nextParams.delete("page");
    setSearchParams(nextParams, { replace: true });
  }

  function changePage(nextPage) {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("page", String(nextPage));
    setSearchParams(nextParams);
  }

  return (
    <section>
      <h1 className="mb-3">Soluciones digitales para tu negocio</h1>

      <p className="text-secondary mb-4">
        Creamos páginas web, catálogos y sistemas a medida. Explora nuestros
        servicios y revisa el alcance de cada solución.
      </p>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-8">
          <label htmlFor="search" className="form-label">
            Buscar servicio
          </label>

          <input
            id="search"
            type="search"
            className="form-control"
            placeholder="Ejemplo: landing page, CRM o catálogo"
            value={search}
            onChange={(event) => updateFilter("search", event.target.value)}
          />
        </div>

        <div className="col-12 col-md-4">
          <label htmlFor="category" className="form-label">
            Categoría
          </label>

          <select
            id="category"
            className="form-select"
            value={category}
            onChange={(event) => updateFilter("category", event.target.value)}
          >
            <option value="">Todas las categorías</option>

            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
        {!isLoading && !error && pagination && (
          <p className="text-secondary mb-0" role="status">
            Resultados: {pagination.total}
          </p>
        )}

        {(search || category || page !== 1) && (
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setSearchParams({})}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {isLoading ? (
        <p role="status">Cargando servicios...</p>
      ) : error ? (
        <p className="alert alert-danger" role="alert">
          {error}
        </p>
      ) : posts.length === 0 ? (
        <div className="alert alert-info">
          <p className="mb-0">
            {page > totalPages
              ? "La página solicitada no tiene resultados."
              : "No encontramos servicios con esos filtros."}
          </p>

          {page > 1 && (
            <button
              type="button"
              className="btn btn-outline-dark btn-sm mt-3"
              onClick={() => changePage(1)}
            >
              Volver a la primera página
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="row g-4">
            {posts.map((post) => (
              <div key={post.id} className="col-12 col-md-6 col-lg-4">
                <PostCard post={post} />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              aria-label="Paginación de publicaciones"
              className="d-flex flex-wrap align-items-center gap-3 mt-4"
            >
              <button
                type="button"
                className="btn btn-outline-dark"
                disabled={page <= 1}
                onClick={() => changePage(page - 1)}
              >
                Anterior
              </button>

              <span>
                Página {page} de {totalPages}
              </span>

              <button
                type="button"
                className="btn btn-outline-dark"
                disabled={page >= totalPages}
                onClick={() => changePage(page + 1)}
              >
                Siguiente
              </button>
            </nav>
          )}
        </>
      )}
    </section>
  );
}

export default ProductsPage;
