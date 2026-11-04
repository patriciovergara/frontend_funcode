import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import usePosts from "../hooks/usePosts";
import { categories } from "../data/mockData";
import { IS_DEMO_MODE } from "../services/apiConfig";
import { isValidImageSource } from "../utils/isValidImageSource";

const initialForm = {
  title: "",
  category_id: "",
  price_type: "from",
  price: "",
  description: "",
  image_url: "",
};

function CreatePostPage() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createPublication } = usePosts();
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
      setError("Selecciona una modalidad de precio válida.");
      return;
    }

    if (
      priceType !== "quote" &&
      (!Number.isSafeInteger(price) || price <= 0 || price > 999999999999)
    ) {
      setError("Ingresa un precio entero positivo de hasta 12 dígitos.");
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
      const createdPost = await createPublication({
        title,
        description,
        price,
        price_type: priceType,
        image_url: imageUrl,
        category_id: category.id,
      });

      navigate(`/productos/${createdPost.id}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No fue posible crear la publicación.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section>
      <h1 className="mb-3">Crear publicación</h1>

      <p className="text-secondary mb-4">
        Publica un producto o servicio digital. Todos los campos son
        obligatorios.
      </p>

      {IS_DEMO_MODE && (
        <p className="alert alert-warning">
          Modo demostración: las publicaciones se guardan en memoria y
          desaparecen al recargar la página.
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <fieldset disabled={isSubmitting}>
          <div className="row g-4">
            <div className="col-12 col-lg-8">
              <div className="mb-3">
                <label htmlFor="post-title" className="form-label">
                  Título
                </label>

                <input
                  id="post-title"
                  name="title"
                  type="text"
                  className="form-control"
                  maxLength={150}
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-12 col-md-6">
                  <label htmlFor="post-category" className="form-label">
                    Categoría
                  </label>

                  <select
                    id="post-category"
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
                  <label htmlFor="post-price-type" className="form-label">
                    Modalidad de precio
                  </label>

                  <select
                    id="post-price-type"
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
                      <label htmlFor="post-price" className="form-label">
                        {form.price_type === "from"
                          ? "Precio inicial (CLP)"
                          : "Precio (CLP)"}
                      </label>

                      <input
                        id="post-price"
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
                      El servicio mostrará “Cotiza con nosotros” y no publicará
                      un importe.
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="post-description" className="form-label">
                  Descripción
                </label>

                <textarea
                  id="post-description"
                  name="description"
                  className="form-control"
                  rows={6}
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="post-image" className="form-label">
                  Imagen: ruta local o URL
                </label>

                <input
                  id="post-image"
                  name="image_url"
                  type="text"
                  className="form-control"
                  placeholder="/assets/servicios/landing-profesional.webp"
                  value={form.image_url}
                  onChange={handleChange}
                  required
                />

                <p className="form-text">
                  <p className="form-text">
                    Usa /assets/servicios/nombre-del-archivo.webp o una URL
                    publica.
                  </p>
                </p>
              </div>
            </div>

            <aside className="col-12 col-lg-4">
              <div className="card bg-light">
                <div className="card-body">
                  <h2 className="h5">Vista previa de imagen</h2>

                  <div className="bg-secondary-subtle rounded p-3">
                    {isValidImageSource(form.image_url) ? (
                      <img
                        src={form.image_url.trim()}
                        alt="Vista previa de la publicación"
                        className="img-fluid rounded w-100"
                        style={{
                          maxHeight: "260px",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <p className="text-secondary text-center py-5 mb-0">
                        Ingresa una ruta local o una URL de imagen.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {error && (
            <p className="alert alert-danger" role="alert">
              {error}
            </p>
          )}

          <div className="d-flex gap-3 mt-3">
            <button type="submit" className="btn btn-dark">
              {isSubmitting ? "Publicando..." : "Publicar"}
            </button>

            {!isSubmitting && (
              <Link to="/mi-perfil" className="btn btn-outline-secondary">
                Cancelar
              </Link>
            )}
          </div>
        </fieldset>
      </form>
    </section>
  );
}

export default CreatePostPage;
