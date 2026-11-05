import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import usePost from "../hooks/usePost";
import { formatPrice } from "../utils/formatPrice";
import { createServiceRequest } from "../services/serviceRequestsApi";

const initialRequestForm = {
  full_name: "",
  email: "",
  phone: "",
  message: "",
};

function ServiceRequestForm({ post }) {
  const { token, user } = useAuth();

  const [form, setForm] = useState({
    ...initialRequestForm,
    full_name: user?.name ?? "",
    email: user?.email ?? "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");
    setFieldErrors([]);

    try {
      await createServiceRequest(
        {
          post_id: post.id,
          full_name: form.full_name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        },
        token,
      );

      setSuccessMessage(
        "Solicitud enviada. Recibimos tu mensaje y te contactaremos pronto.",
      );

      setForm({
        ...initialRequestForm,
        full_name: user?.name ?? "",
        email: user?.email ?? "",
      });
    } catch (error) {
      setErrorMessage(
        error?.message ??
          "No pudimos enviar tu solicitud. Intentalo nuevamente.",
      );

      if (Array.isArray(error?.data?.details)) {
        setFieldErrors(error.data.details);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="bg-light rounded-3 p-4 mt-5">
      <h2 className="h4">Solicitar cotizacion</h2>

      <p className="text-secondary">
        Completa tus datos y cuentanos que necesitas. Un especialista de Funcode
        te respondera.
      </p>

      {successMessage ? (
        <div className="alert alert-success" role="status">
          {successMessage}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      ) : null}

      {fieldErrors.length > 0 ? (
        <ul className="alert alert-warning">
          {fieldErrors.map((fieldError) => (
            <li key={fieldError}>{fieldError}</li>
          ))}
        </ul>
      ) : null}

      <form onSubmit={handleSubmit} noValidate>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label htmlFor="request-name" className="form-label">
              Nombre completo
            </label>

            <input
              id="request-name"
              name="full_name"
              type="text"
              className="form-control"
              value={form.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="request-email" className="form-label">
              Correo electronico
            </label>

            <input
              id="request-email"
              name="email"
              type="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="request-phone" className="form-label">
              Telefono (opcional)
            </label>

            <input
              id="request-phone"
              name="phone"
              type="tel"
              className="form-control"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <label htmlFor="request-message" className="form-label">
              Mensaje
            </label>

            <textarea
              id="request-message"
              name="message"
              className="form-control"
              rows="4"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <button
              type="submit"
              className="btn btn-dark"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar solicitud"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

function PostDetailPage() {
  const { id } = useParams();
  const { post, isLoading, error, notFound } = usePost(id);

  if (isLoading) {
    return <p role="status">Cargando publicacion...</p>;
  }

  if (error) {
    return (
      <section>
        <h1 className="h3">No pude cargar la publicacion</h1>

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
        <h1 className="mb-3">Publicacion no encontrada</h1>

        <p className="text-secondary">
          La publicacion que buscas no esta disponible.
        </p>

        <Link to="/productos" className="btn btn-dark">
          Volver a productos
        </Link>
      </section>
    );
  }

  return (
    <article>
      <nav aria-label="Ruta de navegacion" className="mb-4">
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
            Categoria:{" "}
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

          <h2 className="h5 mt-4">Descripcion</h2>

          <p style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
            {post.description}
          </p>

          <Link to="/productos" className="btn btn-outline-dark mt-3">
            Volver al catalogo
          </Link>
        </div>
      </div>

      <ServiceRequestForm post={post} />
    </article>
  );
}

export default PostDetailPage;
