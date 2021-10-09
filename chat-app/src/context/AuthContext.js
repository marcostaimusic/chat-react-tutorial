import React, { createContext, useState, useCallback } from "react";
import { fetchWithoutToken } from "../helpers/fetch";

export const AuthContext = createContext();

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);

  const login = async (email, password) => {
    const resp = await fetchWithoutToken("login", { email, password }, "POST");

    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      const { name, email, uid } = resp.existingUser;
      setAuth({
        uid,
        checking: false,
        logged: true,
        name,
        email,
      });

      console.log("Logged");
    }

    return resp.ok;
  };

  const register = (name, email, password) => {};

  const validateToken = useCallback(() => {}, []);

  const logout = () => {};

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        register,
        validateToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
