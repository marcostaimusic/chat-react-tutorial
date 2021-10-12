import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/chat/ChatContext";
import { SocketContext } from "../context/SocketContext";
import { fetchWithToken } from "../helpers/fetch";

export const CreateRoom = () => {
  const [name, setName] = useState("");
  //   const { auth } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  // const { chatState } = useContext(ChatContext);

  const onChange = ({ target }) => {
    setName(target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (name.length < 2) {
      return;
    } else {
      const resp = await fetchWithToken(`room/${name}`);
      console.log(resp);
      if (resp.ok)
        socket.emit("createRoom", {
          name,
        });

      setName("");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Create a chat room"
          aria-label="Create a chat room"
          aria-describedby="button-addon2"
          value={name}
          onChange={onChange}
        />
        <button
          className="btn btn-outline-secondary"
          type="submit"
          id="button-addon2"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
