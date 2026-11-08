import { API_BASE_URL } from "./apiConfig";

export class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export async function apiRequest(
  path,
  {
    method = "GET",
    body,
    token,
    signal,
  } = {}
) {
  if (!path.startsWith("/") || path.startsWith("//")) {
    throw new Error(
      'La ruta de la API debe comenzar con una sola "/".'
    );
  }

  const headers = {
    Accept: "application/json",
  };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    credentials: "include",
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  });

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      throw new ApiError(
        `La API devolvió una respuesta que no es JSON (HTTP ${response.status}).`,
        response.status
      );
    }
  }

  if (!response.ok) {
    const message =
      typeof data?.message === "string"
        ? data.message
        : `La petición falló (HTTP ${response.status}).`;

    throw new ApiError(message, response.status, data);
  }

  return data;
}
