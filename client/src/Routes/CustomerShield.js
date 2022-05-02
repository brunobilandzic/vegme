import React from "react";
import { connect } from "react-redux";
import NotAccessible from "./NotAccessible";


function CustomerShield(props) {
  return (
    <>{props.user === "customer" ? props.children: <NotAccessible />} </>
  )
}


const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(CustomerShield);
