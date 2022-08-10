import React, { useEffect } from "react";
import { io } from "socket.io-client";
import {connect} from "react-redux"
import { newNotification } from "../Redux/notifications/notificationsActions";

const  CookSocket = ({newNotification}) => {
  useEffect(() => {
    const socket = io("https://localhost:5000");

    // receive a message from the server
    socket.on("new order", (socketData) => {
      newNotification(socketData.newOrder);
    });
  }, []);
  return <div>CookSocket</div>;
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {
  newNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(CookSocket)
