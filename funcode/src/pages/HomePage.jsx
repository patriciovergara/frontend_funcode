import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    title: "Página web de presentación",
    description:
      "Presenta tu negocio, sus servicios y sus datos de contacto en un solo lugar.",
  },
  {
    id: 2,
    title: "Catálogo digital",
    description:
      "Muestra productos con imágenes, descripciones y precios en un catálogo fácil de explorar.",
  },
  {
    id: 3,
    title: "Sistema de gestión",
    description:
      "Encuentra soluciones para organizar productos, pedidos y tareas de tu negocio.",
  },
];

function HomePage() {
  return (
    <>
      <section className="row align-items-center g-5 mb-5">
        <div className="col-12 col-lg-6">
          <h1 className="display-5 fw-bold mb-4">
            Tu negocio en línea.
            <br />
            Tu operación más organizada.
          </h1>

          <p className="text-secondary mb-4">
            Encuentra páginas web, catálogos digitales y sistemas de
            gestión según las necesidades de tu negocio.
          </p>

          <div className="d-flex flex-wrap gap-3">
            <Link to="/productos" className="btn btn-dark">
              Explorar servicios
            </Link>

            <a href="#servicios" className="btn btn-outline-dark">
              Conocer las categorías
            </a>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div
            className="bg-secondary-subtle rounded-3 d-flex flex-column
              align-items-center justify-content-center text-center p-4"
            style={{ minHeight: "280px" }}
          >
            <span className="fs-4 fw-semibold mb-2">Funcode</span>

            <p className="text-secondary mb-0">
              Páginas web, catálogos digitales
              <br />
              y sistemas de gestión.
            </p>
          </div>
        </div>
      </section>

      <section id="servicios" className="py-4">
        <h2 className="mb-4">¿Qué necesita tu negocio?</h2>

        <div className="row g-4">
          {services.map((service) => (
            <div key={service.id} className="col-12 col-md-4">
              <article className="card h-100 bg-light">
                <div className="card-body d-flex flex-column p-4">
                  <h3 className="h5 mb-3">{service.title}</h3>

                  <p className="text-secondary">
                    {service.description}
                  </p>

                  <Link
                    to={`/productos?category=${service.id}`}
                    className="text-dark mt-auto"
                  >
                    Ver publicaciones →
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-light rounded-3 p-4 p-md-5 mt-5">
        <h2 className="h3 mb-3">
          ¿Quieres llevar tu negocio al siguiente nivel?
        </h2>

        <p className="text-secondary">
          Explora las ofertas y encuentra una solución digital para tu
          proyecto.
        </p>

        <Link to="/productos" className="btn btn-dark">
          Explorar publicaciones
        </Link>
      </section>
    </>
  );
}

export default HomePage;