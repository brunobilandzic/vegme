import React from "react";
import { connect } from "react-redux";
import { COOK, REGULAR } from "../../Shared/Constants/Roles";
import NotAccessible from "./NotAccessible";

function RegularOrCookShield(props) {
  return (
    <>
      {props.user?.roles.map((r) => r.name).includes(COOK) ||
      props.user?.roles.map((r) => r.name).includes(REGULAR) ? (
        props.children
      ) : (
        <NotAccessible />
      )}{" "}
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(RegularOrCookShield);
