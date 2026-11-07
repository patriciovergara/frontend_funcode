import { useSearchParams } from "react-router-dom";

import PostCard from "../components/PostCard";
import useCatalog from "../hooks/useCatalog";
import { categories } from "../data/mockData";

const buttonClass = `
  tw:inline-flex tw:min-h-11
  tw:items-center tw:justify-center tw:gap-2
  tw:rounded-xl
  tw:border tw:border-solid tw:border-funcode-line
  tw:bg-funcode-surface tw:px-4 tw:py-2.5
  tw:font-sans tw:text-sm tw:font-medium tw:text-funcode-text
  tw:transition-colors
  tw:enabled:cursor-pointer
  tw:enabled:hover:border-funcode-accent/50
  tw:enabled:hover:bg-funcode-surface-raised
  tw:disabled:cursor-not-allowed tw:disabled:opacity-40
  tw:focus-visible:outline-2 tw:focus-visible:outline-offset-4
  tw:focus-visible:outline-funcode-accent
  tw:motion-reduce:transition-none
`;

const fieldClass = `
  tw:block tw:min-h-12 tw:w-full
  tw:rounded-xl
  tw:border tw:border-solid tw:border-funcode-line
  tw:bg-funcode-bg tw:px-4 tw:py-3
  tw:font-sans tw:text-sm tw:text-funcode-text
  tw:placeholder:text-funcode-muted
  tw:transition-colors
  tw:focus:border-funcode-accent
  tw:focus:outline-2 tw:focus:outline-offset-2
  tw:focus:outline-funcode-accent/40
  tw:motion-reduce:transition-none
`;

function SearchIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

function CatalogSkeleton() {
  return (
    <div role="status">
      <p className="tw:mb-5 tw:text-sm tw:text-funcode-muted">
        Cargando servicios...
      </p>

      <div
        aria-hidden="true"
        className="tw:grid tw:gap-6 tw:md:grid-cols-2 tw:xl:grid-cols-3"
      >
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="
              tw:overflow-hidden tw:rounded-2xl
              tw:border tw:border-solid tw:border-funcode-line
              tw:bg-funcode-surface
              tw:motion-safe:animate-pulse
            "
          >
            <div className="tw:aspect-video tw:bg-white/5" />

            <div className="tw:space-y-4 tw:p-6">
              <div className="tw:h-3 tw:w-1/3 tw:rounded tw:bg-white/10" />
              <div className="tw:h-6 tw:w-4/5 tw:rounded tw:bg-white/10" />
              <div className="tw:h-5 tw:w-1/2 tw:rounded tw:bg-white/10" />
              <div className="tw:mt-8 tw:h-11 tw:rounded-xl tw:bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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

  const totalPages =
    pagination && pagination.limit > 0
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
    <section
      aria-labelledby="catalog-title"
      className="
        tw:relative tw:isolate tw:mx-auto
        tw:w-full tw:max-w-7xl
        tw:px-5 tw:py-12
        tw:font-sans tw:text-funcode-text
        tw:sm:px-8 tw:lg:px-10 tw:lg:py-16
      "
    >
      {/* Encabezado */}
      <header
        className="
          tw:relative tw:mb-10 tw:overflow-hidden
          tw:rounded-3xl
          tw:border tw:border-solid tw:border-funcode-line
          tw:bg-funcode-surface/50 tw:p-6 tw:md:p-10
          tw:motion-safe:animate-funcode-enter
        "
      >
        <div
          aria-hidden="true"
          className="
            tw:pointer-events-none tw:absolute tw:-top-24 tw:-right-16
            tw:h-72 tw:w-72 tw:rounded-full
            tw:bg-funcode-violet/15 tw:blur-3xl
          "
        />

        <div className="tw:relative tw:max-w-3xl">
          <p
            className="
              tw:mb-4 tw:flex tw:items-center tw:gap-2
              tw:text-xs tw:font-semibold tw:tracking-widest
              tw:text-funcode-accent tw:uppercase
            "
          >
            <span
              aria-hidden="true"
              className="
                tw:h-1.5 tw:w-1.5 tw:rounded-full
                tw:bg-funcode-accent
              "
            />
            Servicios Funcode
          </p>

          <h1
            id="catalog-title"
            className="
              tw:m-0 tw:text-4xl tw:leading-tight
              tw:font-bold tw:tracking-tight tw:text-funcode-text
              tw:md:text-5xl
            "
          >
            Tecnología para
            <span className="tw:block tw:text-funcode-accent">
              tu siguiente etapa.
            </span>
          </h1>

          <p
            className="
              tw:mt-5 tw:mb-0 tw:max-w-2xl
              tw:text-base tw:leading-relaxed tw:text-funcode-muted
            "
          >
            Páginas web, catálogos digitales y sistemas a medida. Explora las
            soluciones de Funcode y encuentra el punto de partida para tu
            proyecto.
          </p>
        </div>
      </header>

      {/* Filtros */}
      <div
        className="
          tw:mb-6 tw:rounded-2xl
          tw:border tw:border-solid tw:border-funcode-line
          tw:bg-funcode-surface tw:p-5 tw:md:p-6
        "
      >
        <div className="tw:grid tw:gap-5 tw:md:grid-cols-3">
          <div className="tw:md:col-span-2">
            <label
              htmlFor="catalog-search"
              className="
                tw:mb-2 tw:block
                tw:text-sm tw:font-medium tw:text-funcode-text
              "
            >
              ¿Qué necesita tu negocio?
            </label>

            <div className="tw:relative">
              <span
                aria-hidden="true"
                className="
                  tw:pointer-events-none
                  tw:absolute tw:inset-y-0 tw:left-4
                  tw:flex tw:items-center tw:text-funcode-muted
                "
              >
                <SearchIcon />
              </span>

              <input
                id="catalog-search"
                type="search"
                className={`${fieldClass} tw:pl-12`}
                placeholder="Busca una landing page, un CRM o un catálogo"
                value={search}
                maxLength={150}
                onChange={(event) => updateFilter("search", event.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="catalog-category"
              className="
                tw:mb-2 tw:block
                tw:text-sm tw:font-medium tw:text-funcode-text
              "
            >
              Categoría
            </label>

            <select
              id="catalog-category"
              className={`${fieldClass} tw:color-scheme:dark]`}
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

      {/* Resumen de resultados */}
      <div
        className="
          tw:mb-6 tw:flex tw:min-h-11
          tw:flex-wrap tw:items-center tw:justify-between tw:gap-3
        "
      >
        <div aria-live="polite" aria-atomic="true">
          {!isLoading && !error && pagination && (
            <p className="tw:m-0 tw:text-sm tw:text-funcode-muted">
              <span className="tw:font-semibold tw:text-funcode-text">
                {pagination.total}
              </span>{" "}
              {pagination.total === 1
                ? "servicio encontrado"
                : "servicios encontrados"}
            </p>
          )}
        </div>

        {hasFilters && (
          <button type="button" className={buttonClass} onClick={clearFilters}>
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Contenido */}
      <div aria-busy={isLoading}>
        {isLoading ? (
          <CatalogSkeleton />
        ) : error ? (
          <div
            role="alert"
            className="
              tw:rounded-2xl
              tw:border tw:border-solid tw:border-funcode-danger/40
              tw:bg-funcode-danger/5 tw:p-6 tw:md:p-8
            "
          >
            <h2 className="tw:mb-3 tw:text-xl tw:font-semibold tw:text-funcode-danger">
              No pudimos cargar el catálogo
            </h2>

            <p className="tw:m-0 tw:text-sm tw:leading-relaxed tw:text-funcode-muted">
              {error}
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div
            className="
              tw:rounded-2xl
              tw:border tw:border-solid tw:border-funcode-line
              tw:bg-funcode-surface tw:px-6 tw:py-12 tw:text-center
            "
          >
            <div
              aria-hidden="true"
              className="
                tw:mx-auto tw:mb-5 tw:grid tw:h-14 tw:w-14
                tw:place-items-center tw:rounded-2xl
                tw:bg-funcode-accent/10 tw:text-funcode-accent
              "
            >
              <SearchIcon />
            </div>

            <h2 className="tw:mb-3 tw:text-2xl tw:font-semibold tw:text-funcode-text">
              {page > totalPages
                ? "Esta página no tiene resultados"
                : "No encontramos servicios"}
            </h2>

            <p className="tw:mx-auto tw:mb-0 tw:max-w-lg tw:text-sm tw:leading-relaxed tw:text-funcode-muted">
              {page > totalPages
                ? "Vuelve a la primera página para consultar los servicios disponibles."
                : search || category
                  ? "Prueba con otro término o selecciona una categoría diferente."
                  : "Pronto incorporaremos nuevas soluciones a nuestro catálogo."}
            </p>

            <div className="tw:mt-6 tw:flex tw:flex-wrap tw:justify-center tw:gap-3">
              {page > 1 && (
                <button
                  type="button"
                  className={buttonClass}
                  onClick={() => changePage(1)}
                >
                  Volver a la primera página
                </button>
              )}

              {hasFilters && (
                <button
                  type="button"
                  className={buttonClass}
                  onClick={clearFilters}
                >
                  Ver todos los servicios
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="tw:grid tw:auto-rows-fr tw:gap-6 tw:md:grid-cols-2 tw:xl:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav
                aria-label="Paginación del catálogo de servicios"
                className="
                  tw:mt-10 tw:flex tw:flex-wrap
                  tw:items-center tw:justify-center tw:gap-4
                "
              >
                <button
                  type="button"
                  className={buttonClass}
                  disabled={page <= 1}
                  onClick={() => changePage(page - 1)}
                >
                  Anterior
                </button>

                <span className="tw:text-sm tw:text-funcode-muted">
                  Página{" "}
                  <span className="tw:font-medium tw:text-funcode-text">
                    {page}
                  </span>{" "}
                  de {totalPages}
                </span>

                <button
                  type="button"
                  className={buttonClass}
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

      {/* Condiciones del alcance */}
      <aside
        aria-labelledby="catalog-scope-title"
        className="
          tw:mt-12
          tw:border-0 tw:border-t tw:border-solid tw:border-funcode-line
          tw:pt-6
        "
      >
        <h2
          id="catalog-scope-title"
          className="tw:mb-3 tw:text-sm tw:font-semibold tw:text-funcode-text"
        >
          Una propuesta clara antes de comenzar
        </h2>

        <p className="tw:m-0 tw:max-w-4xl tw:text-xs tw:leading-relaxed tw:text-funcode-muted">
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
