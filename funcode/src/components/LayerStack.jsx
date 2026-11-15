import { useEffect, useRef, useState } from "react";
import "./LayerStack.css";

const layers = [
  {
    id: "interfaz",
    number: "01",
    name: "Interfaz",
    tech: "React",
    text: "Lo que ve y toca tu cliente: un sitio, un catálogo o un panel de gestión, pensado para celular y escritorio.",
  },
  {
    id: "api",
    number: "02",
    name: "API",
    tech: "Node.js · Express",
    text: "Las reglas de tu negocio: cuentas de usuario, formularios, envío de correos y conexión con otras herramientas.",
  },
  {
    id: "datos",
    number: "03",
    name: "Datos",
    tech: "PostgreSQL",
    text: "Tu información ordenada: productos, clientes, solicitudes y todo lo que tu operación necesite guardar.",
  },
];

function PlateContent({ id }) {
  if (id === "interfaz") {
    return (
      <>
        <span className="ls__bar">
          <i />
          <i />
          <i />
        </span>
        <span className="ls__block ls__block--hero" />
        <span className="ls__row">
          <span className="ls__block" />
          <span className="ls__block" />
          <span className="ls__block" />
        </span>
      </>
    );
  }

  if (id === "api") {
    return (
      <span className="ls__code">
        <b>GET</b> /productos <em>200</em>
        <b>POST</b> /contacto <em>202</em>
        <b>POST</b> /login <em>200</em>
        <b>GET</b> /proyectos <em>200</em>
      </span>
    );
  }

  return (
    <span className="ls__table">
      {Array.from({ length: 12 }, (_, index) => (
        <i key={index} />
      ))}
    </span>
  );
}

function LayerStack() {
  const [active, setActive] = useState("interfaz");
  const rootRef = useRef(null);
  const frameRef = useRef(0);
  const tabRefs = useRef({});

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  function handlePointerMove(event) {
    if (
      event.pointerType === "touch" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const bounds = rootRef.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      rootRef.current?.style.setProperty("--tilt-x", `${y * -5}deg`);
      rootRef.current?.style.setProperty("--tilt-z", `${x * 7}deg`);
    });
  }

  function resetTilt() {
    cancelAnimationFrame(frameRef.current);
    rootRef.current?.style.setProperty("--tilt-x", "0deg");
    rootRef.current?.style.setProperty("--tilt-z", "0deg");
  }

  function handleKeyDown(event) {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    const step = keys[event.key];

    if (!step) return;

    event.preventDefault();
    const index = layers.findIndex((layer) => layer.id === active);
    const next = layers[(index + step + layers.length) % layers.length];

    setActive(next.id);
    tabRefs.current[next.id]?.focus();
  }

  const activeLayer = layers.find((layer) => layer.id === active);

  return (
    <div
      className="ls"
      ref={rootRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <div className="ls__stage" aria-hidden="true">
        <div className="ls__float">
          <div className="ls__scene">
            {layers.map((layer) => (
              <div
                key={layer.id}
                className={`ls__plate ls__plate--${layer.id}${
                  active === layer.id ? " is-active" : ""
                }`}
                onPointerEnter={() => setActive(layer.id)}
              >
                <span className="ls__tag">
                  {layer.number} / {layer.tech}
                </span>
                <PlateContent id={layer.id} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ls__panel">
        <div
          className="ls__tabs"
          role="tablist"
          aria-label="Capas de una solución a medida"
          onKeyDown={handleKeyDown}
        >
          {layers.map((layer) => (
            <button
              key={layer.id}
              ref={(node) => {
                tabRefs.current[layer.id] = node;
              }}
              type="button"
              role="tab"
              id={`layer-tab-${layer.id}`}
              aria-selected={active === layer.id}
              aria-controls="layer-panel"
              tabIndex={active === layer.id ? 0 : -1}
              onClick={() => setActive(layer.id)}
            >
              <span>{layer.number}</span>
              {layer.name}
            </button>
          ))}
        </div>

        <div
          id="layer-panel"
          role="tabpanel"
          aria-labelledby={`layer-tab-${active}`}
          className="ls__desc"
        >
          <p className="ls__tech">{activeLayer.tech}</p>
          <p>{activeLayer.text}</p>
        </div>
      </div>
    </div>
  );
}

export default LayerStack;
