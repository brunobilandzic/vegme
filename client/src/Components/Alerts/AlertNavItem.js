import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-bootstrap";
import { AiFillBell } from "react-icons/ai";
import { LinkContainer } from "react-router-bootstrap";
import alertsStyles from "./alerts.module.css";

export const AlertNavItem = ({ unreadAlertsCount }) => {
  
  return (
    <>
      <LinkContainer to="/alerts">
        <NavLink>
          <div className={alertsStyles.navLink}>
            <AiFillBell></AiFillBell>
            {unreadAlertsCount > 0 && (
              <div className={alertsStyles.unreadCountWrap}>
                {unreadAlertsCount}
              </div>
            )}
          </div>
        </NavLink>
      </LinkContainer>
    </>
  );
};

AlertNavItem.propTypes = {
  unreadAlertsCount: PropTypes.number,
};

const mapStateToProps = (state) => ({
  unreadAlertsCount: state.alerts.unreadAlertsCount,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AlertNavItem);
