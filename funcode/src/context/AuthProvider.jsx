import { useState } from "react";
import AuthContext from "./AuthContext";

function AuthProvider({ children }) {
  const [session, setSession] = useState({
    user: null,
    token: null,
  });

  const isAuthenticated = Boolean(session.user && session.token);

  function login({ user, token }) {
    setSession({
      user,
      token,
    });
  }

  function logout() {
    setSession({
      user: null,
      token: null,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
