import React from "react";
import { connect } from "react-redux";
import { ADMINISTRATOR } from "../../Shared/Constants/Roles";
import NotAccessible from "./NotAccessible";

function AdministratorShield(props) {
  return (
    <>
      {props.user?.roles.map(r => r.name).includes(ADMINISTRATOR) ? (
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
