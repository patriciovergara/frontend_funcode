import { useEffect, useRef, useState } from "react";

import { IS_DEMO_MODE } from "../services/apiConfig";
import { apiRequest } from "../services/apiClient";
import AuthContext from "./AuthContext";

function AuthProvider({ children }) {
  const [session, setSession] = useState({
    user: null,
    token: null,
  });
  const [isLoading, setIsLoading] = useState(!IS_DEMO_MODE);
  const [error, setError] = useState("");
  const sessionVersion = useRef(0);

  useEffect(() => {
    if (IS_DEMO_MODE) {
      return undefined;
    }

    const controller = new AbortController();
    const requestVersion = sessionVersion.current;

    async function restoreSession() {
      try {
        const response = await apiRequest("/users/me", {
          signal: controller.signal,
        });

        if (!response?.user) {
          throw new Error("La respuesta de sesión no contiene un usuario válido.");
        }

        if (
          !controller.signal.aborted &&
          sessionVersion.current === requestVersion
        ) {
          setSession({
            user: response.user,
            token: null,
          });
        }
      } catch (requestError) {
        if (controller.signal.aborted) {
          return;
        }

        if (
          sessionVersion.current === requestVersion &&
          requestError.status !== 401
        ) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "No fue posible verificar la sesión.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    restoreSession();
    return () => controller.abort();
  }, []);

  const isAuthenticated = Boolean(session.user);

  function login({ user, token }) {
    sessionVersion.current += 1;
    setSession({
      user,
      token: token ?? null,
    });
    setIsLoading(false);
    setError("");
  }

  async function logout() {
    if (!IS_DEMO_MODE) {
      await apiRequest("/logout", {
        method: "POST",
      });
    }

    setSession({
      user: null,
      token: null,
    });
    sessionVersion.current += 1;
    setError("");
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
