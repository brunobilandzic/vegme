import React from "react";
import { connect } from "react-redux";
import { ADMINISTRATOR } from "../../Shared/Constants/Roles";
import NotAccessible from "./NotAccessible";

function AdministratorShield(props) {
  return (
    <>
      {props.user?.roleNames.includes(ADMINISTRATOR) ? (
        props.children
      ) : (
        <NotAccessible />
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(AdministratorShield);
