import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const MainPage = ({ user }) => {
  const getContent = () => {
    return user ? (
      <div>{JSON.stringify(user)}</div>
    ) : (
      <div>
        <Link to="/login">Login</Link>
      </div>
    );
  };
  return <>{getContent()}</>;
};

MainPage.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
