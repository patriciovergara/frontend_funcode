import { useState } from "react";
import { Link } from "react-router-dom";

import { registerUser } from "../services/authService";
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

      setSuccess(response.message);
      setForm(initialForm);
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

  return (
    <section>
      <h1 className="mb-4">Crear cuenta</h1>

      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card bg-light">
            <div className="card-body p-4">
              {IS_DEMO_MODE && (
                <p className="alert alert-warning">
                  Modo demostración: utiliza datos ficticios. Las cuentas
                  creadas desaparecen al recargar la página.
                </p>
              )}

              {success ? (
                <div className="alert alert-success" role="status">
                  <p>{success}.</p>

                  <Link to="/login" className="alert-link">
                    Ir a iniciar sesión
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <fieldset disabled={isSubmitting}>
                    <div className="mb-3">
                      <label htmlFor="register-name" className="form-label">
                        Nombre
                      </label>

                      <input
                        id="register-name"
                        name="name"
                        type="text"
                        className="form-control"
                        autoComplete="name"
                        maxLength={100}
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="register-email" className="form-label">
                        Correo electrónico
                      </label>

                      <input
                        id="register-email"
                        name="email"
                        type="email"
                        className="form-control"
                        autoComplete="email"
                        maxLength={254}
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="register-password" className="form-label">
                        Contraseña
                      </label>

                      <input
                        id="register-password"
                        name="password"
                        type="password"
                        className="form-control"
                        autoComplete="new-password"
                        minLength={8}
                        aria-describedby="password-help"
                        value={form.password}
                        onChange={handleChange}
                        required
                      />

                      <div id="password-help" className="form-text">
                        Usa al menos 8 caracteres.
                      </div>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="register-confirm-password"
                        className="form-label"
                      >
                        Confirmar contraseña
                      </label>

                      <input
                        id="register-confirm-password"
                        name="confirmPassword"
                        type="password"
                        className="form-control"
                        autoComplete="new-password"
                        minLength={8}
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {error && (
                      <p className="alert alert-danger" role="alert">
                        {error}
                      </p>
                    )}

                    <button type="submit" className="btn btn-dark">
                      {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
                    </button>
                  </fieldset>
                </form>
              )}

              <p className="mt-4 mb-0">
                ¿Ya tienes cuenta?{" "}
                <Link to="/login" className="text-dark">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
