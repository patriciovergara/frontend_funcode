import { useState } from "react";
import { Link } from "react-router-dom";

import { apiRequest } from "../services/apiClient";
import { getRecaptchaToken } from "../services/recaptcha";
import { IS_DEMO_MODE } from "../services/apiConfig";
import useAuth from "../hooks/useAuth";

const CONTACT_EMAIL = "contacto@funcode.cl";
const CONTACT_SENT_MESSAGE = "Tu mensaje ha sido enviado correctamente.";
const EMAIL_PATTERN = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;
const PHONE_PATTERN = /^\+?[0-9\s()-]+$/;

const initialForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

function ContactPage() {
  const { session, isLoading, error: sessionError } = useAuth();
  return (
    <ContactForm
      key={session.user?.id ?? "guest"}
      session={session}
      isLoading={isLoading}
      sessionError={sessionError}
    />
  );
}

function ContactForm({ session, isLoading, sessionError }) {
  const user = session.user;
  const [form, setForm] = useState(() => ({
    ...initialForm,
    name: user?.name ?? "",
    email: user?.email ?? "",
  }));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [verificationId, setVerificationId] = useState("");
  const [code, setCode] = useState("");
  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting || isLoading) return;
    const email = form.email.trim();
    const phone = form.phone.trim();
    const phoneDigits = phone.replace(/\D/g, "");
    if (!EMAIL_PATTERN.test(email) || email.length > 180) {
      setFeedback({ type: "error", message: "Ingresa un correo electrónico válido, por ejemplo nombre@dominio.cl." });
      return;
    }
    if (phone && (!PHONE_PATTERN.test(phone) || phoneDigits.length < 8 || phoneDigits.length > 15)) {
      setFeedback({ type: "error", message: "Ingresa un teléfono válido de 8 a 15 dígitos, sin letras." });
      return;
    }
    setIsSubmitting(true);
    setFeedback({ type: "", message: "" });

    try {
      const recaptchaToken = await getRecaptchaToken("contact");
      const response = await apiRequest("/contact", {
        method: "POST",
        body: { ...form, recaptchaToken },
        token: IS_DEMO_MODE ? null : session.token,
      });

      if (typeof response?.verificationId === "string" && response.verificationId) {
        setVerificationId(response.verificationId);
        setCode("");
        return;
      }
      if (response?.message !== CONTACT_SENT_MESSAGE) {
        throw new Error("La API no confirmó el envío ni la verificación. Inténtalo nuevamente.");
      }
      setFeedback({
        type: "success",
        message: "Tu mensaje fue enviado correctamente. Nos pondremos en contacto contigo pronto.",
      });
      setForm({ ...initialForm, name: user?.name ?? "", email: user?.email ?? "" });
    } catch (error) {
      const message =
        Array.isArray(error?.data?.details) && error.data.details.length
          ? error.data.details.join(" ")
          : error instanceof Error && error.message
          ? error.message
          : "No pudimos enviar tu mensaje. Inténtalo nuevamente.";

      setFeedback({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleVerify(event) {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setFeedback({ type: "", message: "" });
    try {
      const response = await apiRequest("/contact/verify", {
        method: "POST",
        body: { verificationId, code },
        token: IS_DEMO_MODE ? null : session.token,
      });
      if (response?.message !== CONTACT_SENT_MESSAGE) {
        throw new Error("La API no confirmó el envío del mensaje.");
      }
      setVerificationId("");
      setCode("");
      setForm({ ...initialForm, name: user?.name ?? "", email: user?.email ?? "" });
      setFeedback({ type: "success", message: "Tu mensaje fue enviado correctamente. Nos pondremos en contacto contigo pronto." });
    } catch (error) {
      setFeedback({ type: "error", message: error instanceof Error ? error.message : "No se pudo verificar el código." });
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

              {verificationId ? (
                <form onSubmit={handleVerify} className="row g-3" aria-busy={isSubmitting}>
                  <p className="text-white-50 mb-0">
                    Enviamos un código de 6 dígitos a <strong className="text-white">{form.email}</strong>.
                    Caduca en 10 minutos. Revisa también la carpeta de spam.
                  </p>
                  <div className="col-12">
                    <label htmlFor="contact-code" className="form-label text-white-50">Código de verificación</label>
                    <input
                      id="contact-code"
                      type="text"
                      className="form-control bg-transparent text-white border-secondary"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      value={code}
                      onChange={(event) => setCode(event.target.value)}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  {feedback.message && (
                    <div className="col-12">
                      <div className="alert alert-danger mb-0" role="alert">{feedback.message}</div>
                    </div>
                  )}
                  <div className="col-12 d-flex flex-wrap gap-3">
                    <button type="submit" className="btn btn-primary px-4" disabled={isSubmitting}>
                      {isSubmitting ? "Verificando..." : "Verificar y enviar"}
                    </button>
                    <button type="button" className="btn btn-outline-light" disabled={isSubmitting}
                      onClick={() => { setVerificationId(""); setCode(""); setFeedback({ type: "", message: "" }); }}>
                      Volver al formulario
                    </button>
                  </div>
                </form>
              ) : (
              <form onSubmit={handleSubmit} className="row g-3" aria-busy={isSubmitting || isLoading}>
                {sessionError && (
                  <div className="col-12"><div className="alert alert-danger" role="alert">{sessionError}</div></div>
                )}
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label text-white-50">Nombre</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-control bg-transparent text-white border-secondary"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    disabled={isSubmitting || isLoading}
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
                    autoComplete="email"
                    readOnly={Boolean(user)}
                    disabled={isSubmitting || isLoading}
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
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+56 9 1234 5678"
                    aria-describedby="contact-phone-help"
                    disabled={isSubmitting || isLoading}
                    maxLength={30}
                  />
                  <small id="contact-phone-help" className="text-white-50">Opcional. Ingresa de 8 a 15 dígitos, sin letras.</small>
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
                    disabled={isSubmitting || isLoading}
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
                  <button type="submit" className="btn btn-primary px-4" disabled={isSubmitting || isLoading || Boolean(sessionError)}>
                    {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                  </button>

                  <a href={`mailto:${CONTACT_EMAIL}?subject=Consulta%20Funcode`} className="text-decoration-none" style={{ color: "#a9bfa3" }}>
                    Enviar por correo directo
                  </a>
                </div>
              </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
