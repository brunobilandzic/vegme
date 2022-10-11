import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import MealList from "../Render/MealList";

export const MyFavourites = ({ meals }) => {
  return (
    <div>
      <div>Your favourite meals:</div>
      <MealList meals={meals} showAdd={true} />
    </div>
  );
};

MyFavourites.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MyFavourites);
