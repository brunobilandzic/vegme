import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../../Shared/UserInterface/Modal";

export const RegularsMainPage = ({  }) => {  

  return (
    <div>
      <Link to="browse">Browse</Link>
    </div>
  );
};

RegularsMainPage.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RegularsMainPage);
