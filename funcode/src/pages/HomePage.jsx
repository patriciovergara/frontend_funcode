import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    title: "Páginas web profesionales",
    description:
      "Creamos landing pages, sitios corporativos y páginas autoadministrables para presentar tu negocio y conectar con tus clientes.",
    examples:
      "Landing pages desde $129.990. Sitios con administración y funciones adicionales sujetos a cotización.",
  },
  {
    id: 2,
    title: "Catálogos digitales",
    description:
      "Desarrollamos catálogos para presentar productos y servicios con imágenes, categorías, precios y canales de contacto.",
    examples:
      "Soluciones administrables, búsqueda y filtros según el alcance de cada proyecto.",
  },
  {
    id: 3,
    title: "Sistemas y soluciones a medida",
    description:
      "Construimos aplicaciones con backend y base de datos para organizar información y apoyar la operación de tu empresa.",
    examples:
      "CRM, inventario, cotizaciones, reservas, paneles de gestión e integraciones.",
  },
];

const processSteps = [
  {
    title: "Conocemos tu proyecto",
    description:
      "Conversamos sobre tu negocio, tus necesidades y los objetivos que quieres alcanzar.",
  },
  {
    title: "Definimos el alcance",
    description:
      "Preparamos una propuesta con funcionalidades, entregables, costos y plazos estimados.",
  },
  {
    title: "Diseñamos y desarrollamos",
    description:
      "Construimos la solución por etapas y revisamos los avances según lo acordado.",
  },
  {
    title: "Probamos y publicamos",
    description:
      "Verificamos las funcionalidades y preparamos la puesta en producción de tu proyecto.",
  },
];

function HomePage() {
  return (
    <>
      <section className="row align-items-center g-5 mb-5">
        <div className="col-12 col-lg-7">
          <p className="text-uppercase text-secondary fw-semibold mb-3">
            Desarrollo web y soluciones empresariales
          </p>

          <h1 className="display-5 fw-bold mb-4">
            Creamos soluciones digitales a medida para tu negocio.
          </h1>

          <p className="lead text-secondary mb-4">
            Desarrollamos páginas web, aplicaciones y sistemas de gestión
            para mejorar tu presencia digital, organizar tus procesos y
            conectar con tus clientes.
          </p>

          <p className="mb-4">
            Desde una landing page hasta una plataforma con backend,
            base de datos y panel de administración, adaptamos cada
            solución a las necesidades de tu proyecto.
          </p>

          <div className="d-flex flex-wrap gap-3">
            <Link to="/productos" className="btn btn-dark">
              Explorar servicios
            </Link>

            <a href="#servicios" className="btn btn-outline-dark">
              Conocer nuestras soluciones
            </a>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="bg-dark text-white rounded-3 p-4 p-md-5">
            <p className="text-uppercase small mb-3">
              Tu negocio en línea
            </p>

            <h2 className="h3 mb-3">
              Landing pages profesionales
            </h2>

            <p className="display-6 fw-bold mb-3">
              Desde $129.990 CLP
            </p>

            <p className="mb-4">
              Presenta tus servicios con una página adaptable a
              celulares y orientada al contacto con tus clientes.
            </p>

            <Link
              to="/productos?category=1"
              className="btn btn-light"
            >
              Ver servicios web
            </Link>

            <p className="small text-white-50 mt-4 mb-0">
              Precio correspondiente al alcance base. Panel de
              administración, dominio, alojamiento y funcionalidades
              adicionales se cotizan por separado.
            </p>
          </div>
        </div>
      </section>

      <section id="servicios" className="py-4">
        <h2 className="mb-3">
          Soluciones para cada etapa de tu negocio
        </h2>

        <p className="text-secondary mb-4">
          Combinamos desarrollo web, gestión de datos e integración
          de sistemas para crear herramientas útiles para tu empresa.
        </p>

        <div className="row g-4">
          {services.map((service) => (
            <div key={service.id} className="col-12 col-md-4">
              <article className="card h-100 bg-light">
                <div className="card-body d-flex flex-column p-4">
                  <h3 className="h5 mb-3">{service.title}</h3>

                  <p className="text-secondary">
                    {service.description}
                  </p>

                  <p className="small text-secondary">
                    {service.examples}
                  </p>

                  <Link
                    to={`/productos?category=${service.id}`}
                    className="text-dark mt-auto"
                  >
                    Explorar soluciones
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section className="py-5">
        <h2 className="mb-3">
          Tecnología que conecta y simplifica
        </h2>

        <p className="text-secondary mb-4">
          Evaluamos también proyectos de automatización,
          integración de APIs, SEO técnico y optimización web.
          Cada servicio se define según los objetivos y las
          características del proyecto.
        </p>

        <div className="row g-3">
          {[
            "Integración de APIs",
            "Automatización de procesos",
            "SEO técnico",
            "Optimización web",
          ].map((service) => (
            <div key={service} className="col-12 col-sm-6 col-lg-3">
              <div className="border rounded-3 p-3 h-100">
                <h3 className="h6 mb-0">{service}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-4">
        <h2 className="mb-4">Cómo trabajamos</h2>

        <div className="row g-4">
          {processSteps.map((step, index) => (
            <div key={step.title} className="col-12 col-md-6 col-lg-3">
              <article className="h-100">
                <p className="text-secondary small mb-2">
                  Etapa {index + 1}
                </p>

                <h3 className="h5">{step.title}</h3>

                <p className="text-secondary mb-0">
                  {step.description}
                </p>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-light rounded-3 p-4 p-md-5 mt-5">
        <h2 className="h3 mb-3">
          Encuentra una solución para tu próximo proyecto
        </h2>

        <p className="text-secondary mb-4">
          Conoce nuestros servicios, revisa su alcance y descubre
          cómo podemos apoyar la presencia digital y la gestión
          de tu negocio.
        </p>

        <Link to="/productos" className="btn btn-dark">
          Ver catálogo de servicios
        </Link>
      </section>
    </>
  );
}

export default HomePage;