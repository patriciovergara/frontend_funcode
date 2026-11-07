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

const pageClass = `
  tw:mx-auto tw:w-full tw:max-w-7xl
  tw:px-5 tw:py-10 tw:sm:px-8 tw:lg:px-10 tw:lg:py-14
  tw:font-sans tw:text-funcode-text
`;

const panelClass = `
  tw:rounded-2xl
  tw:border tw:border-solid tw:border-funcode-line
  tw:bg-funcode-surface
`;

const primaryButton = `
  tw:inline-flex tw:min-h-12
  tw:items-center tw:justify-center tw:gap-3
  tw:rounded-xl tw:border-0
  tw:bg-funcode-accent tw:px-5 tw:py-3
  tw:font-sans tw:text-sm tw:font-semibold
  tw:text-funcode-bg! tw:no-underline!
  tw:transition-colors
  tw:enabled:cursor-pointer
  tw:hover:bg-sky-200
  tw:disabled:cursor-not-allowed tw:disabled:opacity-60
  tw:focus-visible:outline-2 tw:focus-visible:outline-offset-4
  tw:focus-visible:outline-funcode-accent
  tw:motion-reduce:transition-none
`;

const secondaryButton = `
  tw:inline-flex tw:min-h-12
  tw:items-center tw:justify-center tw:gap-3
  tw:rounded-xl
  tw:border tw:border-solid tw:border-funcode-line
  tw:bg-white/5 tw:px-5 tw:py-3
  tw:text-sm tw:font-medium
  tw:text-funcode-text! tw:no-underline!
  tw:transition-colors tw:hover:bg-white/10
  tw:focus-visible:outline-2 tw:focus-visible:outline-offset-4
  tw:focus-visible:outline-funcode-accent
  tw:motion-reduce:transition-none
`;

const fieldClass = `
  tw:block tw:min-h-12 tw:w-full
  tw:rounded-xl
  tw:border tw:border-solid tw:border-funcode-line
  tw:bg-funcode-bg tw:px-4 tw:py-3
  tw:font-sans tw:text-base tw:text-funcode-text
  tw:placeholder:text-funcode-muted
  tw:transition-colors
  tw:focus:border-funcode-accent
  tw:focus:outline-2 tw:focus:outline-offset-2
  tw:focus:outline-funcode-accent/40
  tw:disabled:opacity-60
  tw:motion-reduce:transition-none
`;

const inlineLink = `
  tw:text-funcode-accent! tw:underline tw:underline-offset-4
  tw:hover:text-sky-200!
  tw:focus-visible:outline-2 tw:focus-visible:outline-offset-4
  tw:focus-visible:outline-funcode-accent
`;

function Arrow({ back = false }) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="tw:shrink-0"
    >
      {back ? (
        <>
          <path d="M20 12H4" />
          <path d="m10 6-6 6 6 6" />
        </>
      ) : (
        <>
          <path d="M4 12h16" />
          <path d="m14 6 6 6-6 6" />
        </>
      )}
    </svg>
  );
}

function ServicePreview({ src, title }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`${panelClass} tw:overflow-hidden`}>
      <div
        className="
          tw:flex tw:items-center tw:gap-2
          tw:border-0 tw:border-b tw:border-solid tw:border-funcode-line
          tw:px-5 tw:py-4
        "
      >
        <span
          aria-hidden="true"
          className="tw:h-1.5 tw:w-1.5 tw:rounded-full tw:bg-funcode-accent"
        />

        <span className="tw:text-xs tw:text-funcode-muted">
          Presentación del servicio
        </span>
      </div>

      {src && !hasError ? (
        <div className="tw:bg-funcode-bg/50 tw:p-3 tw:sm:p-5">
          <img
            src={src}
            alt={title}
            decoding="async"
            onError={() => setHasError(true)}
            className="
              tw:block tw:aspect-[4/3] tw:w-full
              tw:rounded-xl tw:object-contain
            "
          />
        </div>
      ) : (
        <div
          className="
            tw:relative tw:flex tw:aspect-[4/3]
            tw:items-center tw:justify-center tw:overflow-hidden
            tw:p-6 tw:text-center
          "
        >
          <div
            aria-hidden="true"
            className="
              tw:absolute tw:h-48 tw:w-48 tw:rounded-full
              tw:bg-funcode-accent/10 tw:blur-3xl
            "
          />

          <div className="tw:relative">
            <span
              aria-hidden="true"
              className="tw:mb-4 tw:block tw:font-mono tw:text-5xl tw:text-funcode-accent"
            >
              {"</>"}
            </span>

            <p className="tw:mb-2 tw:text-base tw:font-semibold tw:text-funcode-text">
              Funcode
            </p>

            <p className="tw:m-0 tw:text-sm tw:text-funcode-muted">
              Vista previa no disponible.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

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

    if (isSubmitting) {
      return;
    }

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
          "No pudimos enviar tu solicitud. Inténtalo nuevamente.",
      );

      if (Array.isArray(error?.data?.details)) {
        setFieldErrors(error.data.details);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="solicitar-cotizacion"
      aria-labelledby="request-title"
      className="tw:mt-14 tw:scroll-mt-28"
    >
      <div className="tw:grid tw:gap-8 tw:lg:grid-cols-[0.8fr_1.2fr] tw:lg:gap-12">
        <div>
          <p
            className="
              tw:mb-3 tw:text-xs tw:font-semibold
              tw:tracking-widest tw:text-funcode-accent tw:uppercase
            "
          >
            El siguiente paso
          </p>

          <h2
            id="request-title"
            className="
              tw:mb-5 tw:text-3xl tw:leading-tight
              tw:font-semibold tw:tracking-tight tw:text-funcode-text
              tw:md:text-4xl
            "
          >
            Cuéntanos qué
            <span className="tw:block tw:text-funcode-accent">
              quieres construir.
            </span>
          </h2>

          <p className="tw:mb-6 tw:text-base tw:leading-relaxed tw:text-funcode-muted">
            Completa tus datos y describe tu proyecto. Funcode revisará
            tu solicitud para conversar sobre sus necesidades y alcance.
          </p>

          <div
            className="
              tw:border-0 tw:border-l-2 tw:border-solid
              tw:border-funcode-accent/40 tw:pl-4
            "
          >
            <p className="tw:mb-2 tw:text-xs tw:text-funcode-muted">
              Servicio de interés
            </p>

            <p className="tw:m-0 tw:text-sm tw:font-medium tw:text-funcode-text">
              {post.title}
            </p>
          </div>

          <p className="tw:mt-6 tw:mb-0 tw:text-xs tw:leading-relaxed tw:text-funcode-muted">
            Enviar esta solicitud no realiza un cobro ni confirma
            la contratación de un servicio.
          </p>
        </div>

        <div className={`${panelClass} tw:p-5 tw:sm:p-7`}>
          {successMessage && (
            <div
              role="status"
              className="
                tw:mb-5 tw:rounded-xl
                tw:border tw:border-solid tw:border-funcode-success/30
                tw:bg-funcode-success/5 tw:p-4
                tw:text-sm tw:leading-relaxed tw:text-funcode-success
              "
            >
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div
              role="alert"
              className="
                tw:mb-5 tw:rounded-xl
                tw:border tw:border-solid tw:border-funcode-danger/30
                tw:bg-funcode-danger/5 tw:p-4
                tw:text-sm tw:leading-relaxed tw:text-funcode-danger
              "
            >
              {errorMessage}
            </div>
          )}

          {fieldErrors.length > 0 && (
            <div
              role="alert"
              className="
                tw:mb-5 tw:rounded-xl
                tw:border tw:border-solid tw:border-funcode-warning/30
                tw:bg-funcode-warning/5 tw:p-4
                tw:text-sm tw:text-funcode-warning
              "
            >
              <p className="tw:mb-2 tw:font-medium">
                Revisa los siguientes datos:
              </p>

              <ul className="tw:m-0 tw:list-disc tw:space-y-1 tw:pl-5">
                {fieldErrors.map((fieldError, index) => (
                  <li key={index}>{fieldError}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
            <fieldset
              disabled={isSubmitting}
              className="tw:m-0 tw:min-w-0 tw:border-0 tw:p-0"
            >
              <legend className="tw:sr-only">
                Datos de contacto y descripción del proyecto
              </legend>

              <div className="tw:grid tw:gap-5 tw:sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="request-name"
                    className="tw:mb-2 tw:block tw:text-sm tw:font-medium"
                  >
                    Nombre completo
                    <span className="tw:ml-1 tw:text-funcode-muted">
                      (obligatorio)
                    </span>
                  </label>

                  <input
                    id="request-name"
                    name="full_name"
                    type="text"
                    autoComplete="name"
                    className={fieldClass}
                    value={form.full_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="request-email"
                    className="tw:mb-2 tw:block tw:text-sm tw:font-medium"
                  >
                    Correo electrónico
                    <span className="tw:ml-1 tw:text-funcode-muted">
                      (obligatorio)
                    </span>
                  </label>

                  <input
                    id="request-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={fieldClass}
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="tw:sm:col-span-2">
                  <label
                    htmlFor="request-phone"
                    className="tw:mb-2 tw:block tw:text-sm tw:font-medium"
                  >
                    Teléfono
                    <span className="tw:ml-1 tw:text-funcode-muted">
                      (opcional)
                    </span>
                  </label>

                  <input
                    id="request-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={fieldClass}
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="tw:sm:col-span-2">
                  <label
                    htmlFor="request-message"
                    className="tw:mb-2 tw:block tw:text-sm tw:font-medium"
                  >
                    Cuéntanos sobre tu proyecto
                    <span className="tw:ml-1 tw:text-funcode-muted">
                      (obligatorio)
                    </span>
                  </label>

                  <textarea
                    id="request-message"
                    name="message"
                    className={`${fieldClass} tw:min-h-40 tw:resize-y`}
                    rows={5}
                    placeholder="Describe tu negocio, qué necesitas y las funciones que tienes en mente."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="tw:sm:col-span-2">
                  <p className="tw:mb-5 tw:text-xs tw:leading-relaxed tw:text-funcode-muted">
                    Consulta cómo se tratan tus datos en la{" "}
                    <Link to="/privacidad" className={inlineLink}>
                      Política de privacidad
                    </Link>
                    . No incluyas contraseñas ni información sensible
                    en tu mensaje.
                  </p>

                  <button
                    type="submit"
                    className={`${primaryButton} tw:w-full tw:sm:w-auto`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando solicitud..." : "Enviar solicitud"}
                    {!isSubmitting && <Arrow />}
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </section>
  );
}

function DetailState({ title, description, isError = false }) {
  return (
    <section className={pageClass}>
      <div
        className={`${panelClass} tw:px-6 tw:py-12 tw:text-center`}
      >
        <p className="tw:mb-3 tw:text-xs tw:tracking-widest tw:text-funcode-accent tw:uppercase">
          Servicios Funcode
        </p>

        <h1 className="tw:mb-4 tw:text-3xl tw:font-semibold tw:text-funcode-text">
          {title}
        </h1>

        <p
          role={isError ? "alert" : undefined}
          className="tw:mx-auto tw:mb-7 tw:max-w-xl tw:text-sm tw:leading-relaxed tw:text-funcode-muted"
        >
          {description}
        </p>

        <Link to="/productos" className={secondaryButton}>
          <Arrow back />
          Volver al catálogo
        </Link>
      </div>
    </section>
  );
}

function PostDetailPage() {
  const { id } = useParams();
  const { post, isLoading, error, notFound } = usePost(id);

  if (isLoading) {
    return (
      <section className={pageClass} aria-busy="true">
        <p role="status" className="tw:mb-6 tw:text-sm tw:text-funcode-muted">
          Cargando servicio...
        </p>

        <div
          aria-hidden="true"
          className="tw:grid tw:gap-8 tw:lg:grid-cols-2 tw:motion-safe:animate-pulse"
        >
          <div className={`${panelClass} tw:aspect-[4/3] tw:bg-white/5`} />

          <div className="tw:space-y-5 tw:py-4">
            <div className="tw:h-4 tw:w-1/3 tw:rounded tw:bg-white/10" />
            <div className="tw:h-12 tw:w-4/5 tw:rounded tw:bg-white/10" />
            <div className="tw:h-8 tw:w-1/2 tw:rounded tw:bg-white/10" />
            <div className="tw:h-28 tw:rounded-xl tw:bg-white/5" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <DetailState
        title="No pudimos cargar el servicio"
        description={error}
        isError
      />
    );
  }

  if (notFound || !post) {
    return (
      <DetailState
        title="Servicio no encontrado"
        description="El servicio que buscas no está disponible. Puedes consultar las demás soluciones del catálogo."
      />
    );
  }

  return (
    <article className={pageClass}>
      <nav aria-label="Ruta de navegación" className="tw:mb-8">
        <ol
          className="
            tw:m-0 tw:flex tw:list-none tw:flex-wrap
            tw:items-center tw:gap-x-3 tw:gap-y-2
            tw:p-0 tw:text-xs tw:text-funcode-muted
          "
        >
          <li>
            <Link to="/" className={inlineLink}>
              Inicio
            </Link>
          </li>

          <li aria-hidden="true">/</li>

          <li>
            <Link to="/productos" className={inlineLink}>
              Servicios
            </Link>
          </li>

          <li aria-hidden="true">/</li>

          <li className="tw:min-w-0 tw:break-words" aria-current="page">
            {post.title}
          </li>
        </ol>
      </nav>

      <div
        className="
          tw:grid tw:items-start tw:gap-8 tw:lg:grid-cols-2 tw:lg:gap-12
          tw:motion-safe:animate-funcode-enter
        "
      >
        <ServicePreview
          key={post.image_url || "no-image"}
          src={post.image_url}
          title={post.title}
        />

        <div className="tw:min-w-0">
          {post.category && (
            <Link
              to={`/productos?category=${post.category.id}`}
              className="
                tw:mb-5 tw:inline-flex tw:rounded-full
                tw:border tw:border-solid tw:border-funcode-accent/25
                tw:bg-funcode-accent/5 tw:px-3 tw:py-2
                tw:text-xs tw:font-medium
                tw:text-funcode-accent! tw:no-underline!
                tw:hover:bg-funcode-accent/10
                tw:focus-visible:outline-2 tw:focus-visible:outline-offset-4
                tw:focus-visible:outline-funcode-accent
              "
            >
              {post.category.name}
            </Link>
          )}

          <h1
            className="
              tw:mb-6 tw:text-3xl tw:leading-tight
              tw:font-bold tw:tracking-tight tw:text-funcode-text
              tw:md:text-4xl
            "
          >
            {post.title}
          </h1>

          <div className={`${panelClass} tw:mb-6 tw:p-5`}>
            <p className="tw:mb-2 tw:text-xs tw:text-funcode-muted">
              Precio del servicio
            </p>

            <p className="tw:mb-3 tw:text-3xl tw:font-semibold tw:tracking-tight tw:text-funcode-text">
              {formatPrice(post.price, post.price_type)}
            </p>

            <p className="tw:m-0 tw:text-xs tw:leading-relaxed tw:text-funcode-muted">
              Revisa el alcance descrito. Las funciones adicionales
              y los costos externos se especifican en la propuesta
              cuando correspondan.
            </p>
          </div>

          <div className="tw:flex tw:flex-wrap tw:gap-3">
            <a href="#solicitar-cotizacion" className={primaryButton}>
              Solicitar cotización
              <Arrow />
            </a>

            <Link to="/productos" className={secondaryButton}>
              Volver al catálogo
            </Link>
          </div>

          <p className="tw:mt-4 tw:mb-0 tw:text-xs tw:leading-relaxed tw:text-funcode-muted">
            Consulta el alcance antes de contratar. La solicitud
            permite conversar sobre las necesidades de tu proyecto.
          </p>
        </div>
      </div>

      <section
        aria-labelledby="description-title"
        className="
          tw:mt-10 tw:rounded-2xl
          tw:border tw:border-solid tw:border-funcode-line
          tw:bg-funcode-surface/50 tw:p-6 tw:md:p-8
        "
      >
        <p className="tw:mb-3 tw:text-xs tw:tracking-widest tw:text-funcode-accent tw:uppercase">
          Información del servicio
        </p>

        <h2
          id="description-title"
          className="tw:mb-5 tw:text-2xl tw:font-semibold tw:text-funcode-text"
        >
          Descripción y alcance
        </h2>

        <p
          className="
            tw:m-0 tw:max-w-4xl
            tw:text-base tw:leading-relaxed tw:whitespace-pre-wrap
            tw:text-funcode-muted tw:overflow-wrap:anywhere]
          "
        >
          {post.description}
        </p>
      </section>

      <ServiceRequestForm key={post.id} post={post} />
    </article>
  );
}

export default PostDetailPage;