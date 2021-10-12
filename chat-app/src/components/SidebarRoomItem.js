import React, { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import logo from "../../public/roomUsers.png";
import { scrollToBottom } from "../helpers/scrollToBottom";

import { types } from "../types/types";

export const SidebarRoomItem = ({ room }) => {
  const { chatState, dispatch } = useContext(ChatContext);

  const onClick = async () => {
    dispatch({
      type: types.activateChat,
      payload: room.uid,
    });

    scrollToBottom("message");
  };

  return (
    <div
      className={`chat_list ${
        room.uid === chatState.activeChat && "active_chat"
      }`}
      onClick={onClick}
      id="sidebarItem"
    >
      <div className="chat_people">
        <div className="chat_img">
          <img
            src={logo}
            alt="Default Avatar Svg Png Icon Free Download 264157 User - Avatar Icon Png Clipart@pikpng.com"
          />
        </div>
        <div className="chat_ib">
          <h5>{room.name}</h5>
        </div>
      </div>
    </div>
  );
};
