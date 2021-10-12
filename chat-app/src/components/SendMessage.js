import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { SocketContext } from "../context/SocketContext";

export const SendMessage = () => {
  const [message, setMessage] = useState("");
  const { auth } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const { chatState } = useContext(ChatContext);

  const rooms = chatState.rooms;
  const uid = chatState.activeChat;

  const result = rooms.filter((room) => room.uid === uid);

  const onChange = ({ target }) => {
    setMessage(target.value);
  };

  const onSubmitRoom = (event) => {
    event.preventDefault();
    if (message.length === 0) {
      return;
    } else {
      socket.emit("roomMessage", {
        from: auth.uid,
        to: chatState.activeChat,
        message,
      });

      setMessage("");
    }
  };

  const onSubmitPersonal = (event) => {
    event.preventDefault();
    if (message.length === 0) {
      return;
    } else {
      socket.emit("personalMessage", {
        from: auth.uid,
        to: chatState.activeChat,
        message,
      });

      setMessage("");
    }
  };

  return (
    <form onSubmit={result[0] !== undefined ? onSubmitRoom : onSubmitPersonal}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input
            autoFocus
            type="text"
            className="write_msg"
            placeholder="Message..."
            value={message}
            onChange={onChange}
          />
        </div>
        <div className="col-sm-3 text-center">
          <button className="msg_send_btn mt-3" type="submit">
            Send
          </button>
        </div>
      </div>
    </form>
  );
};
