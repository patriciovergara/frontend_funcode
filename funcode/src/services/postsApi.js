import { apiRequest } from "./apiClient";

function validateId(id) {
  const value = Number(id);

  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new Error(
      "El identificador debe ser un número entero positivo."
    );
  }

  return value;
}

function requireToken(token) {
  if (!token) {
    throw new Error("Debes iniciar sesión para realizar esta operación.");
  }
}

function postPayload(data) {
  return {
    title: data.title,
    description: data.description,
    price: Number(data.price),
    image_url: data.image_url,
    category_id: Number(data.category_id),
  };
}

export async function listPosts(
  { category = "", search = "", page = 1 } = {},
  { signal } = {}
) {
  const params = new URLSearchParams();

  if (category !== "" && category != null) {
    params.set("category", String(category));
  }

  if (search.trim()) {
    params.set("search", search.trim());
  }

  params.set("page", String(page));

  return apiRequest(`/posts?${params.toString()}`, {
    signal,
  });
}

export async function getPost(id, { signal } = {}) {
  const postId = validateId(id);

  return apiRequest(`/posts/${postId}`, {
    signal,
  });
}

export async function createPost(data, token) {
  requireToken(token);

  return apiRequest("/posts", {
    method: "POST",
    body: postPayload(data),
    token,
  });
}

export async function updatePost(id, data, token) {
  const postId = validateId(id);
  requireToken(token);

  return apiRequest(`/posts/${postId}`, {
    method: "PUT",
    body: postPayload(data),
    token,
  });
}

export async function deletePost(id, token) {
  const postId = validateId(id);
  requireToken(token);

  return apiRequest(`/posts/${postId}`, {
    method: "DELETE",
    token,
  });
}

export async function listMyPosts(
  token,
  { page = 1 } = {},
  { signal } = {}
) {
  requireToken(token);

  const requestedPage = Number(page);

  if (
    !Number.isSafeInteger(requestedPage) ||
    requestedPage <= 0
  ) {
    throw new Error("La página debe ser un número entero positivo.");
  }

  const params = new URLSearchParams({
    page: String(requestedPage),
  });

  return apiRequest(`/users/me/posts?${params.toString()}`, {
    token,
    signal,
  });
}