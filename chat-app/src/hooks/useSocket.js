import { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";

export const useSocket = (serverPath) => {
  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState(false);

  const connectSocket = useCallback(() => {
    const token = localStorage.getItem("token");

    const socketTemp = io.connect(serverPath, {
      transports: ["websocket"],
      autoConnect: true,
      forceNew: true,
      query: {
        "x-token": token,
      },
    });
    setSocket(socketTemp);
  }, [serverPath]);

  const disconnectSocket = useCallback(() => {
    if (socket) {
      socket.disconnect();
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      setOnline(socket.connected);
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => setOnline(true));
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("disconnect", () => setOnline(false));
    }
  }, [socket]);

  return {
    socket,
    online,
    connectSocket,
    disconnectSocket,
  };
};
