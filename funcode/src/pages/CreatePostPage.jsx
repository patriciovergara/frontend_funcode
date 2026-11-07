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

const panelClass = `
  tw:rounded-2xl
  tw:border tw:border-solid tw:border-funcode-line
  tw:bg-funcode-surface
`;

const labelClass = `
  tw:mb-2 tw:block
  tw:text-sm tw:font-medium tw:text-funcode-text
`;

const inputClass = `
  tw:block tw:min-h-12 tw:w-full
  tw:rounded-xl
  tw:border tw:border-solid tw:border-funcode-line
  tw:bg-funcode-bg tw:px-4 tw:py-3
  tw:font-sans tw:text-sm tw:text-funcode-text
  tw:placeholder:text-funcode-muted/60
  tw:outline-none
  tw:transition-colors
  tw:focus:border-funcode-accent
  tw:focus:ring-2 tw:focus:ring-funcode-accent/15
  tw:disabled:cursor-not-allowed tw:disabled:opacity-60
  tw:motion-reduce:transition-none
`;

const helpClass = `
  tw:mt-2 tw:mb-0
  tw:text-xs tw:leading-relaxed tw:text-funcode-muted
`;

function CreatePostPage() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [failedImageUrl, setFailedImageUrl] = useState(null);

  const { createPublication } = usePosts();
  const navigate = useNavigate();

  const previewUrl = form.image_url.trim();

  const canPreview =
    isValidImageSource(previewUrl) &&
    failedImageUrl !== previewUrl;

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    if (name === "image_url") {
      setFailedImageUrl(null);
    }
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
        "Ingresa una ruta de /assets/servicios/ o una URL HTTP/HTTPS válida.",
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
    <section
      aria-labelledby="create-post-title"
      className="
        tw:mx-auto tw:w-full tw:max-w-7xl
        tw:px-5 tw:py-10
        tw:font-sans tw:text-funcode-text
        tw:sm:px-8 tw:lg:px-10 tw:lg:py-14
      "
    >
      <header className="tw:mb-9">
        <Link
          to="/mi-perfil"
          className="
            tw:mb-6 tw:inline-flex tw:items-center tw:gap-2
            tw:text-sm tw:text-funcode-muted! tw:no-underline!
            tw:hover:text-funcode-accent!
            tw:focus-visible:outline-2
            tw:focus-visible:outline-offset-4
            tw:focus-visible:outline-funcode-accent
          "
        >
          <span aria-hidden="true">←</span>
          Volver a mi perfil
        </Link>

        <p
          className="
            tw:mb-3 tw:text-xs tw:font-semibold
            tw:tracking-widest tw:text-funcode-accent tw:uppercase
          "
        >
          Administración del catálogo
        </p>

        <h1
          id="create-post-title"
          className="
            tw:mb-4 tw:text-3xl tw:font-bold
            tw:tracking-tight tw:text-funcode-text
            tw:sm:text-4xl tw:lg:text-5xl
          "
        >
          Publica tu próxima solución.
        </h1>

        <p
          className="
            tw:m-0 tw:max-w-2xl
            tw:text-base tw:leading-relaxed tw:text-funcode-muted
          "
        >
          Agrega un producto o servicio digital al catálogo de Funcode.
          Completa sus datos y revisa la imagen antes de publicar.
          El importe solo es obligatorio cuando no eliges cotización.
        </p>
      </header>

      {IS_DEMO_MODE && (
        <p
          role="status"
          className="
            tw:mb-6 tw:rounded-xl
            tw:border tw:border-solid tw:border-amber-400/25
            tw:bg-amber-400/5 tw:p-4
            tw:text-sm tw:leading-relaxed tw:text-amber-200
          "
        >
          Modo demostración: las publicaciones se guardan en memoria
          y desaparecen al recargar la página.
        </p>
      )}

      <form onSubmit={handleSubmit} aria-busy={isSubmitting}>
        <fieldset
          disabled={isSubmitting}
          className="tw:m-0 tw:min-w-0 tw:border-0 tw:p-0"
        >
          <legend className="tw:sr-only">
            Datos de la nueva publicación
          </legend>

          <div
            className="
              tw:grid tw:items-start tw:gap-6
              tw:lg:grid-cols-[minmax(0,1fr)_320px]
              tw:xl:grid-cols-[minmax(0,1fr)_360px]
            "
          >
            <div className={`${panelClass} tw:min-w-0 tw:p-5 tw:sm:p-7`}>
              <div className="tw:mb-7">
                <h2
                  className="
                    tw:mb-2 tw:text-xl tw:font-semibold
                    tw:text-funcode-text
                  "
                >
                  Información del servicio
                </h2>

                <p className="tw:m-0 tw:text-sm tw:text-funcode-muted">
                  Define qué ofreces y cómo se mostrará en el catálogo.
                </p>
              </div>

              <div className="tw:space-y-6">
                <div>
                  <label htmlFor="post-title" className={labelClass}>
                    Título
                  </label>

                  <input
                    id="post-title"
                    name="title"
                    type="text"
                    className={inputClass}
                    placeholder="Ej.: Sitio web profesional para tu negocio"
                    maxLength={150}
                    value={form.title}
                    onChange={handleChange}
                    aria-describedby="post-title-help"
                    required
                  />

                  <p id="post-title-help" className={helpClass}>
                    Usa un nombre claro y específico. Máximo 150 caracteres.
                  </p>
                </div>

                <div className="tw:grid tw:gap-6 tw:md:grid-cols-2">
                  <div>
                    <label htmlFor="post-category" className={labelClass}>
                      Categoría
                    </label>

                    <select
                      id="post-category"
                      name="category_id"
                      className={inputClass}
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

                  <div>
                    <label htmlFor="post-price-type" className={labelClass}>
                      Modalidad de precio
                    </label>

                    <select
                      id="post-price-type"
                      name="price_type"
                      className={inputClass}
                      value={form.price_type}
                      onChange={handleChange}
                      required
                    >
                      <option value="fixed">Precio fijo</option>
                      <option value="from">Precio desde</option>
                      <option value="quote">Cotiza con nosotros</option>
                    </select>
                  </div>
                </div>

                {form.price_type !== "quote" ? (
                  <div>
                    <label htmlFor="post-price" className={labelClass}>
                      {form.price_type === "from"
                        ? "Precio inicial (CLP)"
                        : "Precio (CLP)"}
                    </label>

                    <input
                      id="post-price"
                      name="price"
                      type="number"
                      className={inputClass}
                      placeholder="Ej.: 250000"
                      min="1"
                      max="999999999999"
                      step="1"
                      value={form.price}
                      onChange={handleChange}
                      aria-describedby="post-price-help"
                      required
                    />

                    <p id="post-price-help" className={helpClass}>
                      Ingresa el importe en pesos chilenos, sin puntos ni
                      decimales.
                    </p>
                  </div>
                ) : (
                  <p
                    className="
                      tw:m-0 tw:rounded-xl
                      tw:border tw:border-solid tw:border-funcode-accent/20
                      tw:bg-funcode-accent/5 tw:p-4
                      tw:text-sm tw:leading-relaxed tw:text-funcode-accent
                    "
                  >
                    El servicio mostrará “Cotiza con nosotros” y no
                    publicará un importe.
                  </p>
                )}

                <div>
                  <label htmlFor="post-description" className={labelClass}>
                    Descripción
                  </label>

                  <textarea
                    id="post-description"
                    name="description"
                    className={`${inputClass} tw:resize-y`}
                    rows={7}
                    placeholder="Explica qué incluye el servicio, para quién está pensado y cuál es su alcance."
                    value={form.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="post-image" className={labelClass}>
                    Imagen: ruta local o URL
                  </label>

                  <input
                    id="post-image"
                    name="image_url"
                    type="text"
                    className={inputClass}
                    placeholder="/assets/servicios/landing-profesional.webp"
                    value={form.image_url}
                    onChange={handleChange}
                    aria-describedby="post-image-help"
                    required
                  />

                  <p id="post-image-help" className={helpClass}>
                    Usa /assets/servicios/nombre-del-archivo.webp o una
                    URL pública HTTP/HTTPS. Este campo referencia una
                    imagen; no sube archivos.
                  </p>
                </div>
              </div>
            </div>

            <aside
              aria-labelledby="preview-title"
              className={`${panelClass} tw:min-w-0 tw:p-5 tw:sm:p-6`}
            >
              <p
                className="
                  tw:mb-2 tw:text-xs tw:tracking-widest
                  tw:text-funcode-accent tw:uppercase
                "
              >
                Antes de publicar
              </p>

              <h2
                id="preview-title"
                className="
                  tw:mb-5 tw:text-lg tw:font-semibold tw:text-funcode-text
                "
              >
                Vista previa de imagen
              </h2>

              <div
                className="
                  tw:flex tw:min-h-52 tw:items-center tw:justify-center
                  tw:overflow-hidden tw:rounded-xl
                  tw:border tw:border-solid tw:border-funcode-line
                  tw:bg-funcode-bg
                "
              >
                {canPreview ? (
                  <img
                    key={previewUrl}
                    src={previewUrl}
                    alt="Vista previa de la nueva publicación"
                    className="
                      tw:block tw:max-h-72 tw:w-full tw:object-contain
                    "
                    onError={() => setFailedImageUrl(previewUrl)}
                  />
                ) : (
                  <div className="tw:px-5 tw:py-9 tw:text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      focusable="false"
                      className="tw:mx-auto tw:mb-4 tw:text-funcode-muted"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="3" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="m21 15-5-5L5 21" />
                    </svg>

                    <p
                      className="
                        tw:m-0 tw:text-sm tw:leading-relaxed
                        tw:text-funcode-muted
                      "
                    >
                      {previewUrl && failedImageUrl === previewUrl
                        ? "No se pudo cargar la imagen. Revisa la ruta o prueba otra URL."
                        : "Ingresa una ruta local o una URL de imagen para verla aquí."}
                    </p>
                  </div>
                )}
              </div>

              <p className={`${helpClass} tw:mt-4`}>
                Comprueba que la imagen corresponda al servicio y que
                sus detalles se distingan con claridad.
              </p>

              <div
                className="
                  tw:mt-6 tw:border-0 tw:border-t tw:border-solid
                  tw:border-funcode-line tw:pt-5
                "
              >
                <h3
                  className="
                    tw:mb-3 tw:text-sm tw:font-semibold
                    tw:text-funcode-text
                  "
                >
                  Revisa antes de publicar
                </h3>

                <ul
                  className="
                    tw:m-0 tw:list-disc tw:space-y-2 tw:pl-5
                    tw:text-xs tw:leading-relaxed tw:text-funcode-muted
                  "
                >
                  <li>El título describe el servicio.</li>
                  <li>La categoría corresponde a lo que ofreces.</li>
                  <li>La modalidad de precio es la correcta.</li>
                  <li>La descripción explica el alcance.</li>
                </ul>
              </div>
            </aside>
          </div>

          {error && (
            <p
              role="alert"
              className="
                tw:mt-6 tw:mb-0 tw:rounded-xl
                tw:border tw:border-solid tw:border-funcode-danger/30
                tw:bg-funcode-danger/5 tw:p-4
                tw:text-sm tw:leading-relaxed tw:text-funcode-danger
              "
            >
              {error}
            </p>
          )}

          <div
            className="
              tw:mt-7 tw:flex tw:flex-wrap tw:items-center tw:gap-3
            "
          >
            <button
              type="submit"
              className="
                tw:inline-flex tw:min-h-12
                tw:items-center tw:justify-center tw:gap-2
                tw:rounded-xl! tw:border-0
                tw:bg-funcode-accent tw:px-6 tw:py-3
                tw:font-sans tw:text-sm tw:font-semibold
                tw:text-funcode-bg!
                tw:transition-colors tw:cursor-pointer
                tw:enabled:hover:bg-sky-200
                tw:disabled:cursor-wait tw:disabled:opacity-60
                tw:focus-visible:outline-2
                tw:focus-visible:outline-offset-4
                tw:focus-visible:outline-funcode-accent
                tw:motion-reduce:transition-none
              "
            >
              {isSubmitting ? "Publicando..." : "Publicar servicio"}
            </button>

            {!isSubmitting && (
              <Link
                to="/mi-perfil"
                className="
                  tw:inline-flex tw:min-h-12
                  tw:items-center tw:justify-center
                  tw:rounded-xl
                  tw:border tw:border-solid tw:border-funcode-line
                  tw:bg-funcode-surface tw:px-5 tw:py-3
                  tw:text-sm tw:font-medium
                  tw:text-funcode-text! tw:no-underline!
                  tw:transition-colors tw:hover:bg-white/5
                  tw:focus-visible:outline-2
                  tw:focus-visible:outline-offset-4
                  tw:focus-visible:outline-funcode-accent
                  tw:motion-reduce:transition-none
                "
              >
                Cancelar
              </Link>
            )}

            <span
              role="status"
              className="tw:sr-only"
            >
              {isSubmitting ? "Publicando el servicio. Espera un momento." : ""}
            </span>
          </div>
        </fieldset>
      </form>
    </section>
  );
}

export default CreatePostPage;