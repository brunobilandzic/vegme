import propTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Offers = (props) => {
  return (
    <>
      <div>Offers</div>
      <Link to="/offers/new">New Offer</Link>
    </>
  );
};

Offers.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Offers);
