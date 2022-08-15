import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { newNotification } from "../Redux/notifications/notificationsActions";

const SocketComponent = ({ user, newNotification }) => {
  useEffect(() => {
    const socket = io("https://localhost:5000");

    // receive a message from the server
    if (user) {
      socket.emit("log-in", { id: user?._id, roles: user?.roles });
    }

    socket.on("new-order", (newOrder) => {
      newNotification(newOrder);
    });

  }, [user]);

  return <div>SocketComponent</div>;
};

SocketComponent.propTyles = {
  newNotification: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  newNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(SocketComponent);
