import React, { useContext } from "react";
import { createContext, useEffect } from "react";

import { useSocket } from "../hooks/useSocket";
import { AuthContext } from "./AuthContext";
import { ChatContext } from "./chat/ChatContext";

import { types } from "../types/types";
import { scrollToBottomAnimated } from "../helpers/scrollToBottom";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online, connectSocket, disconnectSocket } = useSocket(
    "http://localhost:5000"
  );
  const { auth } = useContext(AuthContext);

  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    if (auth.logged) {
      connectSocket();
    }
  }, [auth, connectSocket]);

  useEffect(() => {
    if (!auth.logged) {
      disconnectSocket();
    }
  }, [auth, disconnectSocket]);

  useEffect(() => {
    if (socket) {
      socket.on("connectedUsersList", (users) => {
        dispatch({
          type: types.uploadedUsers,
          payload: users,
        });
      });
    }
  }, [socket, dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on("personalMessage", (message) => {
        dispatch({
          type: types.newMessage,
          payload: message,
        });
        scrollToBottomAnimated("message");
      });
    }
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
