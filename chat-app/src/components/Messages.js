import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { IncomingMessage } from "./IncomingMessage";
import { OutgoingMessage } from "./OutgoingMessage";
import { RoomMessage } from "./RoomMessage";
import { SendMessage } from "./SendMessage";

export const Messages = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  const rooms = chatState.rooms;
  const uid = chatState.activeChat;

  const result = rooms.filter((room) => room.uid === uid);
  // console.log(result);

  return (
    <div className="mesgs">
      <div className="msg_history" id="message">
        {chatState.messages.map((msg) => {
          if (result[0] !== undefined) {
            return <RoomMessage key={msg.uid} msg={msg} />;
          } else if (msg.to === auth.uid) {
            return <IncomingMessage key={msg.uid} msg={msg} />;
          } else {
            return <OutgoingMessage key={msg.uid} msg={msg} />;
          }
        })}
      </div>

      <SendMessage />
    </div>
  );
};
