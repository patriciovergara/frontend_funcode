import { useRef, useState, useSyncExternalStore } from "react";
import { Link } from "react-router-dom";
import "./ServiceCarousel.css";

function subscribeToMedia(query) {
  return (notify) => {
    const media = window.matchMedia(query);
    media.addEventListener("change", notify);
    return () => media.removeEventListener("change", notify);
  };
}

function useMediaQuery(query) {
  return useSyncExternalStore(
    subscribeToMedia(query),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

function ServiceArt({ type }) {
  if (type === "web") {
    return (
      <svg viewBox="0 0 240 150" role="img" aria-label="Maqueta de página web">
        <rect x="14" y="14" width="212" height="122" rx="4" />
        <path d="M14 36h212" />
        <circle cx="28" cy="25" r="3" />
        <circle cx="40" cy="25" r="3" />
        <circle cx="52" cy="25" r="3" />
        <rect className="is-fill" x="28" y="50" width="108" height="52" />
        <path d="M28 114h108M28 124h72" />
        <rect x="150" y="50" width="62" height="74" />
        <path className="is-accent" d="M160 64h42M160 76h30" />
      </svg>
    );
  }

  if (type === "catalogo") {
    return (
      <svg viewBox="0 0 240 150" role="img" aria-label="Maqueta de catálogo">
        {[0, 1, 2].map((column) =>
          [0, 1].map((row) => (
            <g key={`${column}-${row}`}>
              <rect
                className={column === 1 && row === 0 ? "is-fill" : ""}
                x={14 + column * 74}
                y={14 + row * 66}
                width="64"
                height="40"
              />
              <path d={`M${14 + column * 74} ${64 + row * 66}h46`} />
              <path
                className="is-accent"
                d={`M${14 + column * 74} ${74 + row * 66}h24`}
              />
            </g>
          )),
        )}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 240 150" role="img" aria-label="Maqueta de sistema de gestión">
      <rect x="14" y="14" width="64" height="122" />
      <path d="M26 34h40M26 50h40M26 66h28" />
      <path className="is-accent" d="M26 34h40" />
      <rect x="90" y="14" width="136" height="40" />
      <path className="is-accent" d="M102 34h30" />
      <path d="M90 66h136M90 84h136M90 102h136M90 120h136" />
      <rect className="is-fill" x="90" y="72" width="44" height="6" />
      <rect className="is-fill" x="90" y="108" width="82" height="6" />
    </svg>
  );
}

function ServiceCarousel({ services }) {
  const [active, setActive] = useState(0);
  const dragStart = useRef(null);
  const flat = useMediaQuery("(max-width: 760px)");
  const total = services.length;

  function go(index) {
    setActive((index + total) % total);
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(active + 1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(active - 1);
    }
  }

  function handlePointerDown(event) {
    if (flat || event.target.closest("a, button")) return;
    dragStart.current = event.clientX;
  }

  function handlePointerUp(event) {
    if (dragStart.current === null) return;

    const distance = event.clientX - dragStart.current;
    dragStart.current = null;

    if (Math.abs(distance) > 50) {
      go(active + (distance < 0 ? 1 : -1));
    }
  }

  function offsetOf(index) {
    const half = Math.floor(total / 2);
    return ((index - active + total + half) % total) - half;
  }

  return (
    <div
      className={`sc${flat ? " sc--flat" : ""}`}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Servicios de Funcode"
      onKeyDown={handleKeyDown}
    >
      <p className="visually-hidden" aria-live="polite">
        Servicio {active + 1} de {total}: {services[active].title}
      </p>

      <div
        className="sc__stage"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          dragStart.current = null;
        }}
      >
        {services.map((service, index) => {
          const offset = offsetOf(index);
          const isActive = offset === 0;

          return (
            <article
              key={service.id}
              className={`sc__card${isActive ? " is-active" : ""}`}
              style={{ "--o": offset, "--abs": Math.abs(offset) }}
              aria-roledescription="diapositiva"
              aria-label={`${index + 1} de ${total}`}
            >
              <div inert={!flat && !isActive}>
                <div className="sc__art">
                  <span className="sc__number">{service.number}</span>
                  <ServiceArt type={service.art} />
                </div>
                <h3 className="sc__title">{service.title}</h3>
                <p className="sc__text">{service.description}</p>
                <p className="sc__examples">{service.examples}</p>
                <ul className="sc__tags">
                  {service.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <Link to={`/productos?category=${service.id}`} className="sc__link">
                  Ver {service.title.toLowerCase()}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>

              {!flat && !isActive && (
                <button
                  type="button"
                  className="sc__peek"
                  aria-label={`Mostrar ${service.title}`}
                  onClick={() => go(index)}
                />
              )}
            </article>
          );
        })}
      </div>

      {!flat && (
        <div className="sc__controls">
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Servicio anterior"
          >
            ←
          </button>

          <div className="sc__dots">
            {services.map((service, index) => (
              <button
                key={service.id}
                type="button"
                onClick={() => go(index)}
                aria-label={`Ir al servicio ${index + 1}: ${service.title}`}
                aria-current={index === active ? "true" : undefined}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Servicio siguiente"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

export default ServiceCarousel;
