export const DATA_MODE = import.meta.env.VITE_DATA_MODE ?? "api";

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ??
  "http://localhost:3000/api/v1"
).replace(/\/+$/, "");

if (!["demo", "api"].includes(DATA_MODE)) {
  throw new Error(
    'VITE_DATA_MODE debe tener el valor "demo" o "api".'
  );
}

if (DATA_MODE === "demo" && !import.meta.env.DEV) {
  throw new Error(
    "El modo demo solo está permitido en desarrollo. Usa VITE_DATA_MODE=api en producción."
  );
}

export const IS_DEMO_MODE = DATA_MODE === "demo";