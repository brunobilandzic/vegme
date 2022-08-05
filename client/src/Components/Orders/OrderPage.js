import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { COOK, REGULAR } from "../../Shared/Constants/Roles";
import OrderForCook from "./OrderForCook";
import OrderForRegular from "./OrderForRegular";

export const OrderPage = ({ user }) => {
  const { state } = useLocation();

  return (
    <>
      {user?.roles.map((r) => r.name).includes(REGULAR) &&
        !user?.roles.map((r) => r.name).includes(COOK) && (
          <OrderForRegular order={state} />
        )}
        {user?.roles.map((r) => r.name).includes(COOK) &&
        !user?.roles.map((r) => r.name).includes(REGULAR) && (
          <OrderForCook order={state} />
        )}
     
    </>
  );
};

OrderPage.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
