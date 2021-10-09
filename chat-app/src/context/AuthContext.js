import React, { createContext, useState, useCallback } from "react";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";

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
    // console.log(resp);

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

  const register = async (name, email, password) => {
    const resp = await fetchWithoutToken(
      "login/new",
      { name, email, password },
      "POST"
    );

    // console.log(resp);

    if (resp.ok) {
      localStorage.setItem("token", resp.token);

      const { user } = resp;

      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });

      console.log("Logged");
      return true;
    }

    return resp.msg;
  };

  const validateToken = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuth({
        checking: false,
        logged: false,
      });
      return false;
    }

    const resp = await fetchWithToken("login/renew");
    if (resp.ok) {
      localStorage.setItem("token", resp.token);

      const { existingUser } = resp;

      setAuth({
        uid: existingUser.uid,
        checking: false,
        logged: true,
        name: existingUser.name,
        email: existingUser.email,
      });

      console.log("Logged");
      return true;
    } else {
      setAuth({
        checking: false,
        logged: false,
      });
      return false;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      checking: false,
      logged: false,
    });
  };

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
