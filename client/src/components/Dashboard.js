import React from "react";
import SideBar from "./SideBar";
import OpenConversation from "./OpenConversation";
import { useConversations } from "../contexts/ConversationsProvider";

function Dashboard({ id }) {
  const { selectedConversation } = useConversations();
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <SideBar id={id}></SideBar>
      {selectedConversation && <OpenConversation />}
    </div>
  );
}

export default Dashboard;
