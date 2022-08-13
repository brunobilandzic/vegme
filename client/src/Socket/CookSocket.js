import React, { useEffect } from "react";
import {connect} from "react-redux"
import { newNotification } from "../Redux/notifications/notificationsActions";

const  CookSocket = ({newNotification}) => {
  useEffect(() => {

    // receive a message from the server
  }, []);
  return <div>CookSocket</div>;
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {
  newNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(CookSocket)
