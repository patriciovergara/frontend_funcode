import { useEffect, useState } from "react";

import useAuth from "./useAuth";
import { IS_DEMO_MODE } from "../services/apiConfig";
import { getCurrentUser } from "../services/authService";

export default function useCurrentUser() {
  const { session } = useAuth();

  const token = session.token;
  const userId = session.user?.id;

  const [result, setResult] = useState({
    key: null,
    user: null,
    error: "",
  });

  const queryKey = JSON.stringify([userId, token]);

  useEffect(() => {
    if (IS_DEMO_MODE || !token || !userId) {
      return;
    }

    const controller = new AbortController();

    async function loadCurrentUser() {
      try {
        const response = await getCurrentUser(token, {
          signal: controller.signal,
        });

        if (
          !response?.user ||
          response.user.id !== userId ||
          typeof response.user.name !== "string" ||
          typeof response.user.email !== "string"
        ) {
          throw new Error(
            "Los datos del perfil no tienen el formato esperado."
          );
        }

        if (!controller.signal.aborted) {
          setResult({
            key: queryKey,
            user: response.user,
            error: "",
          });
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setResult({
            key: queryKey,
            user: null,
            error:
              err instanceof Error
                ? err.message
                : "No fue posible cargar el perfil.",
          });
        }
      }
    }

    loadCurrentUser();

    return () => controller.abort();
  }, [token, userId, queryKey]);

  if (IS_DEMO_MODE) {
    return {
      user: session.user,
      isLoading: false,
      error: "",
    };
  }

  if (!token || !userId) {
    return {
      user: null,
      isLoading: false,
      error: "Debes iniciar sesión para consultar el perfil.",
    };
  }

  const isLoading = result.key !== queryKey;

  return {
    user: isLoading ? null : result.user,
    isLoading,
    error: isLoading ? "" : result.error,
  };
}