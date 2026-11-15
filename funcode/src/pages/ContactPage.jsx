import { useState } from "react";
import { Link } from "react-router-dom";

import { apiRequest } from "../services/apiClient";
import { getRecaptchaToken } from "../services/recaptcha";

const CONTACT_EMAIL = "contacto@funcode.cl";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

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
    setFeedback({ type: "", message: "" });

    try {
      const recaptchaToken = await getRecaptchaToken("contact");

      await apiRequest("/contact", {
        method: "POST",
        body: { ...form, ...(recaptchaToken && { recaptchaToken }) },
      });

      setFeedback({
        type: "success",
        message: "Tu mensaje fue enviado correctamente. Nos pondremos en contacto contigo pronto.",
      });
      setForm(initialForm);
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : "No pudimos enviar tu mensaje. Inténtalo nuevamente.";

      setFeedback({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ background: "#1d1a16" }}>
            <div className="card-body p-4 p-md-5">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                <div>
                  <p className="text-uppercase mb-2" style={{ color: "#e8923a", letterSpacing: "0.14em", fontSize: "0.72rem", fontWeight: 700 }}>
                    Contacto
                  </p>
                  <h1 className="mb-0 text-white">Hablemos de tu proyecto</h1>
                </div>

                <Link to="/" className="btn btn-outline-light btn-sm rounded-pill">
                  Volver al inicio
                </Link>
              </div>

              <div className="mb-4 p-3 rounded-4 border border-light border-opacity-10" style={{ background: "rgba(243, 238, 227, 0.04)" }}>
                <div className="text-white-50 mb-2">Correo de contacto</div>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-decoration-none fw-semibold" style={{ color: "#e8923a" }}>
                  {CONTACT_EMAIL}
                </a>
              </div>

              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label text-white-50">Nombre</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-control bg-transparent text-white border-secondary"
                    value={form.name}
                    onChange={handleChange}
                    required
                    maxLength={120}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="email" className="form-label text-white-50">Correo electrónico</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control bg-transparent text-white border-secondary"
                    value={form.email}
                    onChange={handleChange}
                    required
                    maxLength={180}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label text-white-50">Teléfono</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="form-control bg-transparent text-white border-secondary"
                    value={form.phone}
                    onChange={handleChange}
                    maxLength={30}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="subject" className="form-label text-white-50">Asunto</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    className="form-control bg-transparent text-white border-secondary"
                    value={"Consulta general"}
                    readOnly
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="message" className="form-label text-white-50">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control bg-transparent text-white border-secondary"
                    rows="6"
                    value={form.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    maxLength={2000}
                  />
                </div>

                {feedback.message && (
                  <div className="col-12">
                    <div
                      className={`alert ${feedback.type === "success" ? "alert-success" : "alert-danger"} mb-0`}
                      role="alert"
                    >
                      {feedback.message}
                    </div>
                  </div>
                )}

                <div className="col-12 d-flex flex-column flex-md-row gap-3 align-items-md-center justify-content-between">
                  <button type="submit" className="btn btn-primary px-4" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                  </button>

                  <a href={`mailto:${CONTACT_EMAIL}?subject=Consulta%20Funcode`} className="text-decoration-none" style={{ color: "#a9bfa3" }}>
                    Enviar por correo directo
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
