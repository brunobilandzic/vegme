import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadAllAlerts } from "../../Redux/alerts/alertsActions";
import AlertItem from "./AlertItem";
import { v4 as uuid } from "uuid";

export const Alerts = ({ alerts, is_logged_in, loadAllAlerts }) => {
  useEffect(() => {
    is_logged_in && loadAllAlerts();
  }, [is_logged_in]);
  return (
    <>
      <div>alerts: {alerts.length}</div>
      <div>
        {alerts?.map((alert) => (
          <AlertItem key={uuid()} alert={alert} />
        ))}
      </div>
    </>
  );
};

Alerts.propTypes = {
  alerts: PropTypes.array,
  is_logged_in: PropTypes.bool,
  loadAllAlerts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts.alerts,
  is_logged_in: state.auth.is_logged_in,
});

const mapDispatchToProps = { loadAllAlerts };

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
