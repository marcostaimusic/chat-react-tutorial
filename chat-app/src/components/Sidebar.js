import React, { Fragment, useContext, useEffect } from "react";
import { scrollToBottom } from "../helpers/scrollToBottom";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { SidebarChatItem } from "./SidebarChatItem";
import { SidebarRoomItem } from "./SidebarRoomItem";

export const Sidebar = () => {
  const { chatState } = useContext(ChatContext);

  const { auth } = useContext(AuthContext);
  const { uid } = auth;

  useEffect(() => {
    scrollToBottom("sidebarItem");
  }, [chatState]);

  return (
    <Fragment>
      <div className="inbox_chat" id="sideBar">
        {chatState.users
          .filter((user) => user.uid !== uid)
          .map((user) => (
            <SidebarChatItem key={user.uid} user={user} />
          ))}

        {chatState.rooms &&
          chatState.rooms.map((room) => (
            <SidebarRoomItem key={room.uid} room={room} />
          ))}
      </div>
    </Fragment>
  );
};
