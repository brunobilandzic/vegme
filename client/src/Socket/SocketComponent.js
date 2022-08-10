import { connect } from "react-redux";
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { COOK } from "../Shared/Constants/Roles";

function SocketComponent({ user }) {
  useEffect(() => {
    const socket = io("https://localhost:5000");

    // receive a message from the server
    socket.on("test", (...args) => {
      if(user?.roles.map(r => r.name).includes(COOK)) {
        console.log("Cook");
      }
    })
  }, [user]);
  
  return <></>;
}

const mapDispatchToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapDispatchToProps, {})(SocketComponent);
