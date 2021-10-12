import React, { createContext, useState, useCallback, useContext } from "react";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import { ChatContext } from "./chat/ChatContext";
import axios from "axios";

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
  const { dispatch } = useContext(ChatContext);

  const responseSuccessGoogle = (response) => {
    // console.log(response);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/login/googlelogin`,
      data: { tokenId: response.tokenId },
    }).then((response) => {
      console.log(response);
      localStorage.setItem("token", response.data.token);

      setAuth({
        uid: response.data.user.uid,
        checking: false,
        logged: true,
        name: response.data.user.name,
        email: response.data.user.email,
      });
    });
  };

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
    }

    return resp.ok;
  };

  const register = async (name, email, password) => {
    const resp = await fetchWithoutToken(
      "login/new",
      { name, email, password },
      "POST"
    );

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
      //console.log(resp);
      setAuth({
        uid: existingUser.uid,
        checking: false,
        logged: true,
        name: existingUser.name,
        email: existingUser.email,
      });

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
    dispatch({
      type: types.closeSession,
    });
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
        responseSuccessGoogle,
        register,
        validateToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
