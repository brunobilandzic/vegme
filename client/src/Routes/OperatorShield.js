import React from "react";
import { connect } from "react-redux";
import NotAccessible from "./NotAccessible";


function OperatorShield(props) {
  return (
    <>{props.user === "operator" ? props.children : <NotAccessible />} </>
  )
}


const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(OperatorShield);
