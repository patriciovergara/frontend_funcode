export const DATA_MODE = import.meta.env.VITE_DATA_MODE ?? "demo";

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ??
  "http://localhost:3000/api/v1"
).replace(/\/+$/, "");

if (!["demo", "api"].includes(DATA_MODE)) {
  throw new Error(
    'VITE_DATA_MODE debe tener el valor "demo" o "api".'
  );
}

export const IS_DEMO_MODE = DATA_MODE === "demo";