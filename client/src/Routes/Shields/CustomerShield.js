import React from "react";
import { connect } from "react-redux";
import { CUSTOMER } from "../../Shared/Constants/Roles";
import NotAccessible from "./NotAccessible";

function CustomerShield(props) {
  return (
    <>{props.user?.roleNames.includes(CUSTOMER) ? props.children: <NotAccessible />} </>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(CustomerShield);
