import React from "react";
import { dateTime } from "../helpers/dateTime";

export const OutgoingMessage = ({ msg }) => {
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{msg.message}</p>
        <span className="time_date"> {dateTime(msg.createdAt)}</span>
      </div>
    </div>
  );
};
