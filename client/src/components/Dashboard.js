import React from "react";
import SideBar from "./SideBar";

function Dashboard({ id }) {
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <SideBar id={id}></SideBar>
    </div>
  );
}

export default Dashboard;
