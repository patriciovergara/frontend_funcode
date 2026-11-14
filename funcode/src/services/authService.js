import { IS_DEMO_MODE } from "./apiConfig";
import { apiRequest } from "./apiClient";

// Simulación temporal. Utilizar solamente credenciales ficticias.
const accounts = [
  {
    id: 1,
    name: "Usuario de prueba",
    email: "usuario@ejemplo.com",
    password: "Demo123!",
    created_at: "2026-11-01T03:00:00.000Z",
  },
];

let nextUserId = 3;

function publicUser(account) {
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    created_at: account.created_at,
  };
}

export async function loginUser({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();

  if (!IS_DEMO_MODE) {
    return apiRequest("/login", {
      method: "POST",
      body: {
        email: normalizedEmail,
        password,
      },
    });
  }

  const account = accounts.find(
    (item) =>
      item.email === normalizedEmail &&
      item.password === password
  );

  if (!account) {
    throw new Error("Correo o contraseña incorrectos.");
  }

  return {
    message: "Sesión de demostración iniciada",
    token: "token-demo-no-valido-para-api",
    user: publicUser(account),
  };
}

export async function registerUser({ name, email, password }) {
  const normalizedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();

  if (!IS_DEMO_MODE) {
    return apiRequest("/users", {
      method: "POST",
      body: {
        name: normalizedName,
        email: normalizedEmail,
        password,
      },
    });
  }

  if (!normalizedName || !normalizedEmail || !password) {
    throw new Error("Completa todos los campos obligatorios.");
  }

  if (normalizedName.length > 100) {
    throw new Error("El nombre no puede superar los 100 caracteres.");
  }

  if (password.length < 8) {
    throw new Error("La contraseña debe tener al menos 8 caracteres.");
  }

  const emailExists = accounts.some(
    (item) => item.email === normalizedEmail
  );

  if (emailExists) {
    throw new Error("Ya existe una cuenta con ese correo.");
  }

  const account = {
    id: nextUserId++,
    name: normalizedName,
    email: normalizedEmail,
    password,
    created_at: new Date().toISOString(),
  };

  accounts.push(account);

  return {
    message: "Cuenta de demostración creada correctamente",
    user: publicUser(account),
  };
}

export async function verifyRegistration({ verificationId, code }) {
  return apiRequest("/users/verify", {
    method: "POST",
    body: { verificationId, code },
  });
}

export async function getCurrentUser(token, { signal } = {}) {
  if (!IS_DEMO_MODE) {
    return apiRequest("/users/me", {
      token,
      signal,
    });
  }

  if (!token) {
    throw new Error("Se necesita una sesión para consultar el perfil.");
  }

  throw new Error(
    "En modo demo, el perfil se obtiene del contexto de sesión."
  );
}