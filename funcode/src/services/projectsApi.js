import { apiRequest } from "./apiClient";

export async function listProjects({ manage = false, signal } = {}) {
  const path = manage ? "/projects/manage" : "/projects";
  const response = await apiRequest(path, { signal });

  if (!Array.isArray(response?.projects)) {
    throw new Error("La API devolvió una lista de proyectos inválida.");
  }

  return response.projects;
}

export async function createProject(project) {
  const response = await apiRequest("/projects", {
    method: "POST",
    body: project,
  });

  return response.project;
}

export async function updateProject(id, project) {
  const response = await apiRequest(`/projects/${id}`, {
    method: "PUT",
    body: project,
  });

  return response.project;
}

export async function deleteProject(id) {
  return apiRequest(`/projects/${id}`, {
    method: "DELETE",
  });
}
