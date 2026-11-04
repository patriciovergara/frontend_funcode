import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import usePosts from "../hooks/usePosts";
import usePost from "../hooks/usePost";
import { isValidImageSource } from "../utils/isValidImageSource";

import { categories } from "../data/mockData";
import { IS_DEMO_MODE } from "../services/apiConfig";

function EditPostPage() {
  const { id } = useParams();
  const { session } = useAuth();

  const { post, isLoading, error, notFound } = usePost(id);

  if (isLoading) {
    return <p role="status">Cargando publicación para editar...</p>;
  }

  if (error) {
    return (
      <section>
        <h1 className="h3">No pude cargar la publicación</h1>

        <p className="alert alert-danger" role="alert">
          {error}
        </p>

        <Link to="/mi-perfil" className="btn btn-outline-dark">
          Volver a mi perfil
        </Link>
      </section>
    );
  }

  if (notFound || !post) {
    return (
      <section>
        <h1>Publicación no encontrada</h1>

        <Link to="/mi-perfil" className="btn btn-outline-dark">
          Volver a mi perfil
        </Link>
      </section>
    );
  }

  if (post.user.id !== session.user?.id) {
    return (
      <section>
        <h1>No tienes permiso para editar esta publicación</h1>

        <Link to="/mi-perfil" className="btn btn-outline-dark">
          Volver a mi perfil
        </Link>
      </section>
    );
  }

  return <EditPostForm key={post.id} post={post} />;
}

function EditPostForm({ post }) {
  const [form, setForm] = useState({
    title: post.title,
    category_id: String(post.category.id),
    price_type: post.price_type ?? "fixed",
    price: post.price == null ? "" : String(post.price),
    description: post.description,
    image_url: post.image_url,
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { updatePublication } = usePosts();
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setError("");

    const title = form.title.trim();
    const description = form.description.trim();
    const imageUrl = form.image_url.trim();
    const priceType = form.price_type;
    const price = priceType === "quote" ? null : Number(form.price);

    const category = categories.find(
      (item) => item.id === Number(form.category_id),
    );

    if (!title || !description || !imageUrl || !category) {
      setError("Completa todos los campos y selecciona una categoría.");
      return;
    }

    if (title.length > 150) {
      setError("El título no puede superar los 150 caracteres.");
      return;
    }
    if (!["fixed", "from", "quote"].includes(priceType)) {
      setError("Selecciona una modalidad de precio valida.");
      return;
    }

    if (
      priceType !== "quote" &&
      (!Number.isSafeInteger(price) || price <= 0 || price > 999999999999)
    ) {
      setError("Ingresa un precio entero positivo de hasta 12 digitos.");
      return;
    }

    if (!isValidImageSource(imageUrl)) {
      setError(
        "Ingresa una ruta de /assets/servicios/ o una URL HTTP/HTTPS valida.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const updatedPost = await updatePublication(post.id, {
        title,
        description,
        price,
        price_type: priceType,
        image_url: imageUrl,
        category_id: category.id,
      });

      navigate(`/productos/${updatedPost.id}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No fue posible actualizar la publicación.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section>
      <h1 className="mb-3">Editar publicación</h1>

      {IS_DEMO_MODE && (
        <p className="alert alert-warning">
          Modo demostración: los cambios desaparecen al recargar la página.
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <fieldset disabled={isSubmitting}>
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="edit-title" className="form-label">
                Título
              </label>

              <input
                id="edit-title"
                name="title"
                type="text"
                className="form-control"
                maxLength={150}
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="edit-category" className="form-label">
                Categoría
              </label>

              <select
                id="edit-category"
                name="category_id"
                className="form-select"
                value={form.category_id}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una categoría</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="edit-price-type" className="form-label">
                Modalidad de precio
              </label>

              <select
                id="edit-price-type"
                name="price_type"
                className="form-select"
                value={form.price_type}
                onChange={handleChange}
                required
              >
                <option value="fixed">Precio fijo</option>
                <option value="from">Precio desde</option>
                <option value="quote">Cotiza con nosotros</option>
              </select>

              {form.price_type !== "quote" ? (
                <div className="mt-3">
                  <label htmlFor="edit-price" className="form-label">
                    {form.price_type === "from"
                      ? "Precio inicial (CLP)"
                      : "Precio (CLP)"}
                  </label>

                  <input
                    id="edit-price"
                    name="price"
                    type="number"
                    className="form-control"
                    min="1"
                    max="999999999999"
                    step="1"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              ) : (
                <p className="form-text mb-0">
                  Se mostrara "Cotiza con nosotros" sin un importe.
                </p>
              )}
            </div>

            <div className="col-12">
              <label htmlFor="edit-description" className="form-label">
                Descripción
              </label>

              <textarea
                id="edit-description"
                name="description"
                className="form-control"
                rows={6}
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12">
              <label htmlFor="edit-image" className="form-label">
                Imagen: ruta local o URL
              </label>

              <input
                id="edit-image"
                name="image_url"
                type="text"
                className="form-control"
                placeholder="/assets/servicios/landing-profesional.webp"
                value={form.image_url}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <div className="col-12">
                <p className="alert alert-danger mb-0" role="alert">
                  {error}
                </p>
              </div>
            )}

            <div className="col-12 d-flex gap-3">
              <button type="submit" className="btn btn-dark">
                {isSubmitting ? "Guardando..." : "Guardar cambios"}
              </button>

              {!isSubmitting && (
                <Link to="/mi-perfil" className="btn btn-outline-secondary">
                  Cancelar
                </Link>
              )}
            </div>
          </div>
        </fieldset>
      </form>
    </section>
  );
}

export default EditPostPage;
