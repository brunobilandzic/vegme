import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

export const MyFavourites = (props) => {
  return <div>MyFavourites</div>;
};

MyFavourites.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MyFavourites);
