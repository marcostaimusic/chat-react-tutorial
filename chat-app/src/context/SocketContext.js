import React, { useContext } from "react";
import { createContext, useEffect } from "react";

import { useSocket } from "../hooks/useSocket";
import { AuthContext } from "./AuthContext";
import { ChatContext } from "./chat/ChatContext";

import { types } from "../types/types";
import { scrollToBottom } from "../helpers/scrollToBottom";

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
      socket.on("existentRooms", (rooms) => {
        dispatch({
          type: types.existingRooms,
          payload: rooms,
        });
        //console.log("rooms existent");
      });
    }
  }, [socket, dispatch]);

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
        scrollToBottom("message");
      });
    }
  }, [socket, dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on("roomMessage", ({ message, user }) => {
        dispatch({
          type: types.roomMessage,
          payload: message,
          user,
        });
        scrollToBottom("message");
      });
    }
  }, [socket, dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on("roomCreated", (name) => {
        dispatch({
          type: types.roomCreated,
          payload: name,
        });
        console.log("room received");
      });
    }
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
