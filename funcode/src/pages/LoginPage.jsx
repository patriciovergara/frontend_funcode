import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
        err instanceof Error ? err.message : "No fue posible iniciar sesión.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section>
      <h1 className="mb-4">Iniciar sesión</h1>

      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card bg-light">
            <div className="card-body p-4">
              {IS_DEMO_MODE && (
                <div className="alert alert-warning">
                  <p className="mb-2">
                    Modo demostración: utiliza solamente esta cuenta ficticia.
                  </p>

                  <p className="mb-0">
                    Correo: <code>usuario@ejemplo.com</code>
                    <br />
                    Contraseña: <code>Demo123!</code>
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="login-email" className="form-label">
                    Correo electrónico
                  </label>

                  <input
                    id="login-email"
                    type="email"
                    className="form-control"
                    placeholder="nombre@ejemplo.com"
                    autoComplete="username"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="login-password" className="form-label">
                    Contraseña
                  </label>

                  <input
                    id="login-password"
                    type="password"
                    className="form-control"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                </div>

                {error && (
                  <p className="alert alert-danger" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-dark"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Ingresando..." : "Ingresar"}
                </button>
              </form>

              <p className="mt-4 mb-0">
                ¿No tienes cuenta?{" "}
                <Link to="/registro" className="text-dark">
                  Regístrate
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
