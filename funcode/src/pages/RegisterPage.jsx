import { useState } from "react";
import { Link } from "react-router-dom";

import AuthLayout from "../components/AuthLayout.jsx";
import { authStyles } from "../styles/authStyles.js";
import { registerUser, verifyRegistration } from "../services/authService";
import { IS_DEMO_MODE } from "../services/apiConfig";

const initialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function RegisterPage() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationId, setVerificationId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Ingresa tu nombre.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (IS_DEMO_MODE) {
        setSuccess(response.message);
        setForm(initialForm);
      } else {
        if (typeof response.verificationId !== "string") {
          throw new Error("La API no devolvió los datos de verificación.");
        }
        setVerificationId(response.verificationId);
        setForm((current) => ({ ...current, password: "", confirmPassword: "" }));
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No fue posible registrar la cuenta.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleVerify(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await verifyRegistration({ verificationId, code: verificationCode });
      setSuccess(response.message);
      setVerificationId("");
      setVerificationCode("");
      setForm(initialForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No fue posible verificar el correo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function restartRegistration() {
    setVerificationId("");
    setVerificationCode("");
    setError("");
  }

  return (
    <AuthLayout
      eyebrow="Tu espacio en Funcode"
      title={
        <>
          Tu próximo paso,
          <span className="tw:block tw:text-funcode-accent">
            empieza aquí.
          </span>
        </>
      }
      description="Crea tu cuenta para explorar soluciones digitales para tu negocio."
      panelTitle={success ? "Cuenta creada" : verificationId ? "Verifica tu correo" : "Crear cuenta"}
      panelDescription={
        success
          ? "Tu cuenta está lista para iniciar sesión."
          : verificationId
            ? "Ingresa el código que enviamos a tu correo."
            : "Completa tus datos para crear tu cuenta."
      }
      footer={
        <p className="tw:m-0">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className={authStyles.link}>
            Inicia sesión
          </Link>
        </p>
      }
    >
      {IS_DEMO_MODE && (
        <p className={`${authStyles.warning} tw:mb-6`}>
          Modo demostración: utiliza datos ficticios. Las cuentas creadas
          desaparecen al recargar la página y no se envían correos de verificación.
        </p>
      )}

      {success ? (
        <div className={authStyles.success} role="status">
          <p className="tw:mb-3">{success}.</p>
          <Link to="/login" className={authStyles.link}>
            Ir a iniciar sesión
          </Link>
        </div>
      ) : verificationId ? (
        <form onSubmit={handleVerify} aria-busy={isSubmitting}>
          <p className="tw:mb-5 tw:text-sm tw:leading-relaxed tw:text-funcode-muted">
            Enviamos un código de 6 dígitos a{" "}
            <strong className="tw:break-all tw:text-funcode-text">{form.email}</strong>.
            Caduca en 10 minutos. Revisa también la carpeta de spam.
          </p>
          <fieldset disabled={isSubmitting}>
            <div className="tw:mb-5">
              <label htmlFor="verification-code" className={authStyles.label}>
                Código de verificación
              </label>
              <input
                id="verification-code"
                type="text"
                className={authStyles.field}
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={6}
                value={verificationCode}
                onChange={(event) => setVerificationCode(event.target.value)}
                required
              />
            </div>
            {error && <p className={`${authStyles.error} tw:mb-5`} role="alert">{error}</p>}
            <button type="submit" className={authStyles.button}>
              {isSubmitting ? "Verificando..." : "Verificar y crear cuenta"}
            </button>
            <button
              type="button"
              className={`${authStyles.link} tw:mt-5 tw:cursor-pointer tw:border-0 tw:bg-transparent tw:p-0 tw:text-sm`}
              onClick={restartRegistration}
            >
              Solicitar otro código
            </button>
          </fieldset>
        </form>
      ) : (
        <form onSubmit={handleSubmit} aria-busy={isSubmitting}>
          <fieldset disabled={isSubmitting}>
            <div className="tw:mb-5">
              <label htmlFor="register-name" className={authStyles.label}>
                Nombre
              </label>
              <input
                id="register-name"
                name="name"
                type="text"
                className={authStyles.field}
                autoComplete="name"
                maxLength={100}
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="tw:mb-5">
              <label htmlFor="register-email" className={authStyles.label}>
                Correo electrónico
              </label>
              <input
                id="register-email"
                name="email"
                type="email"
                className={authStyles.field}
                placeholder="nombre@ejemplo.com"
                autoComplete="email"
                maxLength={254}
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="tw:mb-5">
              <label htmlFor="register-password" className={authStyles.label}>
                Contraseña
              </label>
              <input
                id="register-password"
                name="password"
                type="password"
                className={authStyles.field}
                autoComplete="new-password"
                minLength={8}
                aria-describedby="password-help"
                value={form.password}
                onChange={handleChange}
                required
              />
              <div id="password-help" className="tw:mt-2 tw:text-xs tw:text-funcode-muted">
                Usa al menos 8 caracteres.
              </div>
            </div>

            <div className="tw:mb-6">
              <label htmlFor="register-confirm-password" className={authStyles.label}>
                Confirmar contraseña
              </label>
              <input
                id="register-confirm-password"
                name="confirmPassword"
                type="password"
                className={authStyles.field}
                autoComplete="new-password"
                minLength={8}
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <p className={`${authStyles.error} tw:mb-5`} role="alert">
                {error}
              </p>
            )}
            <button type="submit" className={authStyles.button}>
              {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </fieldset>
        </form>
      )}
    </AuthLayout>
  );
}

export default RegisterPage;
