import React from "react";
import { Searchbox } from "./Searchbox";
import { Sidebar } from "./Sidebar";
import { CreateRoom } from "./CreateRoom";

export const InboxPeople = () => {
  return (
    <div className="inbox_people">
      <Searchbox />
      <CreateRoom />
      <Sidebar />
    </div>
  );
};
