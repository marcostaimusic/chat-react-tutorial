import React, { useEffect, useState } from "react";

import { dateTime } from "../helpers/dateTime";
import { fetchWithToken } from "../helpers/fetch";
import { scrollToBottom } from "../helpers/scrollToBottom";

export const RoomMessage = ({ msg }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    fetchWithToken(`room/users/${msg.from}`).then((response) => {
      setUser([response.user.name]);
      scrollToBottom("message");
    });
  }, []);

  return (
    <div className="incoming_msg">
      {/* <div className="incoming_msg_img">
        <img src={logo} alt="sunil" />
      </div> */}
      <div className="room_msg">
        <div className="room_withd_msg">
          <p>
            <strong>{user}</strong>
          </p>
          <p>{msg.message}</p>
          <span className="time_date"> {dateTime(msg.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};
