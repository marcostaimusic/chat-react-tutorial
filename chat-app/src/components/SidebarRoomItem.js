import React, { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import logo from "../../public/roomUsers.png";
// import { AuthContext } from "../context/AuthContext";
// import { SocketContext } from "../context/SocketContext";
// import { fetchWithToken } from "../helpers/fetch";

import { types } from "../types/types";

export const SidebarRoomItem = ({ room }) => {
  // console.log(room);
  const { chatState, dispatch } = useContext(ChatContext);
  // const { activeChat } = chatState;
  // const { socket } = useContext(SocketContext);
  // const { auth } = useContext(AuthContext);

  const onClick = async () => {
    dispatch({
      type: types.activateChat,
      payload: room.uid,
    });

    // const resp = await fetchWithToken(`messages/${room.uid}`);

    // dispatch({
    //   type: types.loadMessages,
    //   payload: resp.messages,
    // });
    // scrollToBottomAnimated("message");
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
