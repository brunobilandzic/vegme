import propTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import offerStyles from "./offer.module.css";

const Offers = (props) => {
  return (
    <>
      <Link to="/offers/new">New Offer</Link>
      <br />
      <Link to="/orders">My orders</Link>
      <br />
      <Link to="/cart">Cart</Link>
      <br></br>
      
    </>
  );
};

Offers.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Offers);
