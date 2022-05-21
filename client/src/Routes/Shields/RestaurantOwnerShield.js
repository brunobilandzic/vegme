import React from "react";
import propTypes from "prop-types"
import { connect } from "react-redux";
import { RESTAURANT_OWNER } from "../../Shared/Constants/Roles";
import NotAccessible from "./NotAccessible";

function RestaurantOwnerShield(props) {
  return (
    <>
      {props.user?.roleNames.includes(RESTAURANT_OWNER) ? (
        props.children
      ) : (
        <NotAccessible/>
      )}
    </>
  );
}

RestaurantOwnerShield.propTypes = {
  user: propTypes.object
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(RestaurantOwnerShield);
