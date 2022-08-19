import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { newAlert } from "../Redux/alerts/alertsActions";

const SocketComponent = ({ user, newAlert }) => {
  useEffect(() => {
    const socket = io("https://localhost:5000");

    // receive a message from the server
    if (user) {
      socket.emit("log-in", { id: user?._id, roles: user?.roles });
    }

    socket.on("new-alert", (alert) => {
      newAlert(alert)
    })

  }, [user]);

  return <></>;
};

SocketComponent.propTyles = {
  newAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  newAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(SocketComponent);
