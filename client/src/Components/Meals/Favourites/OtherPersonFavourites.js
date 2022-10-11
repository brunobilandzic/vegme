import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import MealList from "../Render/MealList";

export const OtherPersonFavourites = ({username, meals}) => {
  return (
    <div>
      {`${username} favourite meals:`}
      <MealList meals={meals} showAdd={true} />
    </div>
  );
};

OtherPersonFavourites.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OtherPersonFavourites);
