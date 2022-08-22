import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadAllAlerts, readAlertsRedux } from "../../Redux/alerts/alertsActions";
import AlertItem from "./AlertItem";
import { v4 as uuid } from "uuid";
import PaginationCustom from "../../Shared/Components/PaginationCustom";
import Loading from "../../Shared/UserInterface/Loading";

export const Alerts = ({
  alerts,
  is_logged_in,
  loadAllAlerts,
  pageNumber,
  pageSize,
  readAlertsRedux
}) => {
  useEffect(() => {
    is_logged_in && loadAllAlerts();
  }, [is_logged_in]);

  useEffect(() => {
    readAllAlerts()
  }, [alerts.items]);

  const readAllAlerts = () => {
    const alertIds = alerts?.items[pageNumber + "-" + pageSize]?.map(
      (alert) => alert._id
    );
    readAlertsRedux(alertIds)
  };

  return (
    <>
      <Loading />
      <div>alerts: {alerts?.items[pageNumber + "-" + pageSize]?.length}</div>
      <div>
        {alerts?.items[pageNumber + "-" + pageSize]?.map((alert) => (
          <AlertItem key={uuid()} alert={alert} />
        ))}
      </div>
      <PaginationCustom type="alerts" loadItems={loadAllAlerts} />
    </>
  );
};

Alerts.propTypes = {
  alerts: PropTypes.object,
  is_logged_in: PropTypes.bool,
  loadAllAlerts: PropTypes.func.isRequired,
  pageNumber: PropTypes.number,
  pageSize: PropTypes.number,
  readAlertsRedux: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
  is_logged_in: state.auth.is_logged_in,
  pageNumber: state.pagination.alerts.pageNumber,
  pageSize: state.pagination.alerts.pageSize,
});

const mapDispatchToProps = { loadAllAlerts, readAlertsRedux };

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
