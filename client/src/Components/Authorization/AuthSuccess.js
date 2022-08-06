import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";

import { loadUser } from "../../Redux/auth/authActions.js";

function AuthSuccess({ user }) {

  return (
    <>
      <div className="local-auth-success-container auth-success.container">
        <h3 className="auth-success-header">Auth Success!</h3>
      </div>
      <p>Hello {user?.username}</p>
    </>
  );
}
AuthSuccess.propTypes = {
  user: propTypes.object,
  loadUser: propTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, { loadUser })(AuthSuccess);
