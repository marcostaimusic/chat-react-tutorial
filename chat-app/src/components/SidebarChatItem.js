import React from "react";

export const SidebarChatItem = () => {
  return (
    <div className="chat_list active_chat">
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png"
            alt="Default Avatar Svg Png Icon Free Download 264157 User - Avatar Icon Png Clipart@pikpng.com"
          />
        </div>
        <div className="chat_ib">
          <h5>Some random name</h5>
          <span className="text-success">Online</span>
          <span className="text-danger">Offline</span>
        </div>
      </div>
    </div>
  );
};
