import { Link, useParams } from "react-router-dom";

import usePost from "../hooks/usePost";
import { formatPrice } from "../utils/formatPrice";
import { IS_DEMO_MODE } from "../services/apiConfig";

function PostDetailPage() {
  const { id } = useParams();
  const { post, isLoading, error, notFound } = usePost(id);

  if (isLoading) {
    return <p role="status">Cargando publicación...</p>;
  }

  if (error) {
    return (
      <section>
        <h1 className="h3">No pude cargar la publicación</h1>

        <p className="alert alert-danger" role="alert">
          {error}
        </p>

        <Link to="/productos" className="btn btn-outline-dark">
          Volver a productos
        </Link>
      </section>
    );
  }

  if (notFound || !post) {
    return (
      <section>
        <h1 className="mb-3">Publicación no encontrada</h1>

        <p className="text-secondary">
          La publicación que buscas no está disponible.
        </p>

        <Link to="/productos" className="btn btn-dark">
          Volver a productos
        </Link>
      </section>
    );
  }

  return (
    <article>
      <nav aria-label="Ruta de navegación" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-dark">
              Inicio
            </Link>
          </li>

          <li className="breadcrumb-item">
            <Link to="/productos" className="text-dark">
              Productos
            </Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            {post.title}
          </li>
        </ol>
      </nav>

      <div className="row g-4 g-lg-5 align-items-start">
        <div className="col-12 col-lg-6">
          {post.image_url ? (
            <img
              src={post.image_url}
              alt={post.title}
              className="img-fluid rounded-3 w-100"
              style={{ maxHeight: "420px", objectFit: "contain" }}
            />
          ) : (
            <div
              className="bg-secondary-subtle rounded-3 d-flex
                align-items-center justify-content-center text-center p-4"
              style={{ minHeight: "320px" }}
            >
              <span className="text-secondary">Vista previa del producto</span>
            </div>
          )}
        </div>

        <div className="col-12 col-lg-6">
          <h1 className="mb-3">{post.title}</h1>

          <p className="text-secondary">
            Categoría:{" "}
            <Link
              to={`/productos?category=${post.category.id}`}
              className="text-dark"
            >
              {post.category.name}
            </Link>
          </p>

          <p className="fs-2 fw-bold">
            {formatPrice(post.price, post.price_type)}
          </p>

          <p className="text-secondary">Publicado por: {post.user.name}</p>

          <h2 className="h5 mt-4">Descripción</h2>

          <p style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
            {post.description}
          </p>

          <Link to="/productos" className="btn btn-outline-dark mt-3">
            Volver al catálogo
          </Link>
        </div>
      </div>

      <section className="bg-light rounded-3 p-4 mt-5">
        <h2 className="h4">Información del vendedor</h2>

        <p className="mb-2">{post.user.name}</p>

        <p className="text-secondary mb-0">
          {IS_DEMO_MODE
            ? "Esta publicación utiliza datos de demostración. "
            : ""}
          La contratación y el contacto con el vendedor todavía no están
          implementados.
        </p>
      </section>
    </article>
  );
}

export default PostDetailPage;
