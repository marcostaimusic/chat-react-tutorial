import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { IncomingMessage } from "./IncomingMessage";
import { OutgoingMessage } from "./OutgoingMessage";
import { SendMessage } from "./SendMessage";

export const Messages = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  return (
    <div className="mesgs">
      {/* <!-- Historia inicio --> */}
      <div className="msg_history">
        {chatState.messages.map((msg) => {
          if (msg.to === auth.uid) {
            return <IncomingMessage key={msg.uid} msg={msg} />;
          } else {
            return <OutgoingMessage key={msg.uid} msg={msg} />;
          }
        })}

        {/* <IncomingMessage />
        <OutgoingMessage /> */}
      </div>
      {/* <!-- Historia Fin --> */}

      <SendMessage />
    </div>
  );
};
