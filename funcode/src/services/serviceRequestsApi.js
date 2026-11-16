import { apiRequest } from "./apiClient";
import { getRecaptchaToken } from "./recaptcha";

export async function createServiceRequest(data, token) {
  const recaptchaToken = await getRecaptchaToken("quote");
  return apiRequest("/service-requests", {
    method: "POST",
    body: { ...data, recaptchaToken },
    token,
  });
}