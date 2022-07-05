import React from "react";
import { connect } from "react-redux";
import NotAccessible from "./NotAccessible";

function AuthorizationShield(props) {
  return (
    <>
      {props.user ? (
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

export default connect(mapStateToProps, {})(AuthorizationShield);