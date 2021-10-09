import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { AppRouter } from "./router/AppRouter";

export const ChatApp = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};
