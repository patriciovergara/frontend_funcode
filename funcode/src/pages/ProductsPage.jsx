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

  const hasFilters = Boolean(search || category || page !== 1);

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
    if (nextPage < 1 || nextPage > totalPages) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("page", String(nextPage));

    setSearchParams(nextParams);
  }

  function clearFilters() {
    setSearchParams({});
  }

  return (
    <section aria-labelledby="catalog-title">
      <header className="mb-5">
        <p className="text-uppercase text-secondary small fw-semibold mb-2">
          Servicios Funcode
        </p>

        <h1 id="catalog-title" className="display-6 fw-bold mb-3">
          Soluciones digitales para tu negocio
        </h1>

        <p className="lead text-secondary mb-3">
          Creamos páginas web, catálogos digitales y sistemas a medida para
          mejorar tu presencia en línea y simplificar la gestión de tu empresa.
        </p>

        <p className="text-secondary mb-0">
          Explora nuestros servicios y revisa el alcance de cada propuesta. Las
          funcionalidades adicionales y los desarrollos personalizados se
          evalúan según las necesidades del proyecto.
        </p>
      </header>

      <div className="border rounded-3 bg-light p-3 p-md-4 mb-4">
        <div className="row g-3">
          <div className="col-12 col-md-8">
            <label htmlFor="catalog-search" className="form-label">
              Buscar servicio
            </label>

            <input
              id="catalog-search"
              type="search"
              className="form-control"
              placeholder="Ejemplo: landing page, CRM o catálogo"
              value={search}
              maxLength={150}
              onChange={(event) => updateFilter("search", event.target.value)}
            />
          </div>

          <div className="col-12 col-md-4">
            <label htmlFor="catalog-category" className="form-label">
              Categoría
            </label>

            <select
              id="catalog-category"
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
      </div>

      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div aria-live="polite" aria-atomic="true">
          {!isLoading && !error && pagination && (
            <p className="text-secondary mb-0">
              {pagination.total === 1
                ? "1 servicio encontrado"
                : `${pagination.total} servicios encontrados`}
            </p>
          )}
        </div>

        {hasFilters && (
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={clearFilters}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <div aria-busy={isLoading}>
        {isLoading ? (
          <div className="border rounded-3 p-5 text-center" role="status">
            <p className="mb-0 text-secondary">Cargando servicios...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            <h2 className="h6">No pudimos cargar el catálogo</h2>

            <p className="mb-0">{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="border rounded-3 bg-light p-4 p-md-5 text-center">
            <h2 className="h4 mb-3">
              {page > totalPages
                ? "Esta página no tiene resultados"
                : "No encontramos servicios"}
            </h2>

            <p className="text-secondary mb-0">
              {page > totalPages
                ? "Vuelve a la primera página para consultar los servicios disponibles."
                : search || category
                  ? "Prueba con otro término de búsqueda o selecciona una categoría diferente."
                  : "Pronto incorporaremos nuevas soluciones a nuestro catálogo."}
            </p>

            <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
              {page > 1 && (
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => changePage(1)}
                >
                  Volver a la primera página
                </button>
              )}

              {hasFilters && (
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={clearFilters}
                >
                  Ver todos los servicios
                </button>
              )}
            </div>
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
                aria-label="Paginación del catálogo de servicios"
                className="d-flex flex-wrap align-items-center justify-content-center gap-3 mt-5"
              >
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  disabled={page <= 1}
                  onClick={() => changePage(page - 1)}
                >
                  Anterior
                </button>

                <span className="text-secondary">
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
      </div>

      <aside
        className="border-top pt-4 mt-5"
        aria-labelledby="catalog-scope-title"
      >
        <h2 id="catalog-scope-title" className="h6">
          Alcance de los servicios
        </h2>

        <p className="small text-secondary mb-0">
          El alcance, los entregables y los plazos se definen en cada propuesta
          comercial. Los costos de dominio, alojamiento, licencias,
          mantenimiento y servicios de terceros se especifican por separado
          cuando correspondan.
        </p>
      </aside>
    </section>
  );
}

export default ProductsPage;
