import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {loadAllCooks} from "../../Shared/Redux/cooks/cooksActions"
import CookListItem from "./CookListItem";
import Loading from "../../Shared/UserInterface/Loading";
export const BrowseCooks = ({loadAllCooks, cooks}) => {
  useEffect(() => {
    loadAllCooks()
  }, []);
  
  return (
    <div>
    <Loading />
      {cooks?.map((cook, index) => (
        <CookListItem key={index} cook={cook} />
      ))}
    </div>
  );
};

BrowseCooks.propTypes = {
  cooks: PropTypes.array
};

const mapStateToProps = (state) => ({
  cooks: state.cooks.allCooks
});

const mapDispatchToProps = {
  loadAllCooks
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseCooks);
