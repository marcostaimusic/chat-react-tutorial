import React from "react";
import { dateTime } from "../helpers/dateTime";
import logo from "../../public/singleUser.png";

export const IncomingRoomMessage = ({ msg }) => {
  return (
    <div className="incoming_msg">
      <div className="incoming_msg_img">
        <img src={logo} alt="sunil" />
      </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          <p>{user} wrote..</p>
          <p>{msg.message}</p>
          <span className="time_date"> {dateTime(msg.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};
