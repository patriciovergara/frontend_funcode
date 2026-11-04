import { apiRequest } from "./apiClient";

export async function createServiceRequest(data, token) {
  return apiRequest("/service-requests", {
    method: "POST",
    body: data,
    token,
  });
}