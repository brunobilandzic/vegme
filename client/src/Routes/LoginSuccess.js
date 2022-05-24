import React, { useEffect } from 'react'
import propTypes from "prop-types";
import { connect } from "react-redux";

import {loadUser} from "../Shared/Redux/auth/authActions.js"

function LoginSuccess(props) {
    useEffect(() => {
        props.loadUser()
    }, [])
  
    return (
      <>
        <p>Hellp</p>
        {JSON.stringify(props.user)}

      </>
    );
}
LoginSuccess.propTypes = {
    user:  propTypes.object,
    loadUser: propTypes.func.isRequired
}
const mapStateToProps = state => ({
    user: state.auth.user
})
export default connect(mapStateToProps, {loadUser})(LoginSuccess)