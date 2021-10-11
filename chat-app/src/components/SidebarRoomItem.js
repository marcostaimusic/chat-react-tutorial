import React, { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { fetchWithToken } from "../helpers/fetch";
import { scrollToBottom } from "../helpers/scrollToBottom";
import { types } from "../types/types";

export const SidebarRoomItem = ({ room }) => {
  // console.log(room);
  const { chatState, dispatch } = useContext(ChatContext);
  //   const { activeChat } = chatState;

  const onClick = async () => {};

  return (
    <div
      className={`chat_list ${
        room.uid === chatState.activeChat && "active_chat"
      }`}
      onClick={onClick}
    >
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://cdn.imgbin.com/2/12/15/imgbin-multi-user-computer-icons-person-information-others-DrCp4mtG9myW9LMWmG0et2V2c.jpg"
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
