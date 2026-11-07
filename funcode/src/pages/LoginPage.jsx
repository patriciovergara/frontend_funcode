import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout.jsx";
import { authStyles } from "../styles/authStyles.js";
import useAuth from "../hooks/useAuth";
import { loginUser } from "../services/authService";
import { IS_DEMO_MODE } from "../services/apiConfig";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setError("");

    if (!email.trim() || !password) {
      setError("Completa el correo y la contraseña.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await loginUser({
        email,
        password,
      });

      login({
        user: response.user,
        token: response.token,
      });

      navigate("/mi-perfil", { replace: true });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No fue posible iniciar sesión.",
      );
    } finally {
      setIsSubmitting(false);
    }
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
      description="Accede a tu cuenta y continúa explorando soluciones digitales para tu negocio."
      panelTitle="Iniciar sesión"
      panelDescription="Ingresa con el correo y la contraseña de tu cuenta."
      footer={
        <p className="tw:m-0">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className={authStyles.link}>
            Crear cuenta
          </Link>
        </p>
      }
    >
      {IS_DEMO_MODE && (
        <div className={`${authStyles.warning} tw:mb-6`}>
          <p className="tw:mb-3">
            Modo demostración: utiliza solamente esta cuenta ficticia.
          </p>

          <p className="tw:m-0">
            Correo:{" "}
            <span className="tw:break-all tw:font-mono">
              usuario@ejemplo.com
            </span>
            <br />
            Contraseña:{" "}
            <span className="tw:font-mono">Demo123!</span>
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} aria-busy={isSubmitting}>
        <div className="tw:mb-5">
          <label htmlFor="login-email" className={authStyles.label}>
            Correo electrónico
          </label>

          <input
            id="login-email"
            name="email"
            type="email"
            className={authStyles.field}
            placeholder="nombre@ejemplo.com"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="tw:mb-6">
          <label htmlFor="login-password" className={authStyles.label}>
            Contraseña
          </label>

          <input
            id="login-password"
            name="password"
            type="password"
            className={authStyles.field}
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        {error && (
          <p className={`${authStyles.error} tw:mb-5`} role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className={authStyles.button}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Ingresando..." : "Ingresar a mi cuenta"}
        </button>
      </form>

      <p className="tw:mt-5 tw:mb-0 tw:text-xs tw:leading-relaxed tw:text-funcode-muted">
        Puedes consultar la{" "}
        <Link to="/privacidad" className={authStyles.link}>
          Política de privacidad
        </Link>
        {" "}y los{" "}
        <Link to="/terminos" className={authStyles.link}>
          Términos y condiciones
        </Link>
        .
      </p>
    </AuthLayout>
  );
}

export default LoginPage;