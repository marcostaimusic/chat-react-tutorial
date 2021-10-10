import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { SocketContext } from "../context/SocketContext";

export const CreateRoom = () => {
  const [message, setMessage] = useState("");
  //   const { auth } = useContext(AuthContext);
  //   const { socket } = useContext(SocketContext);
  //   const { chatState } = useContext(ChatContext);

  const onChange = ({ target }) => {
    setMessage(target.value);
  };

  const onSubmit = (event) => {
    console.log("ciao");
  };

  //   const onSubmit = (event) => {
  //     event.preventDefault();
  //     if (message.length === 0) {
  //       return;
  //     } else {
  //       socket.emit("personalMessage", {
  //         from: auth.uid,
  //         to: chatState.activeChat,
  //         message,
  //       });

  //       setMessage("");
  //     }
  //   };

  return (
    <form onSubmit={onSubmit}>
      {/* <div className="type_msg row">
        <div className="input_msg_write col-sm-9"> */}
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          Button
        </button>
      </div>
      {/* <input
            type="text"
            className="write_msg"
            placeholder="Create a room..."
            value={message}
            onChange={onChange}
          /> */}
      {/* </div> */}
      {/* <div className="col-sm-2 text-center">
          <button className="msg_send_btn mt-3 mr-5" type="submit">
            Send
          </button>
        </div> */}
      {/* //   </div> */}
    </form>
  );
};
