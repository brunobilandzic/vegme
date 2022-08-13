import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

export const Notifications = ({ notifications }) => {
  return (
    <>
      <div>Notifications:</div>
      <div>{notifications?.length}</div>
    </>
  );
};

Notifications.propTypes = {
  notifications: PropTypes.array,
};

const mapStateToProps = (state) => ({
  notifications: state.notifications.notifications,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
