import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadAllCooks } from "../../Shared/Api/cooks";
import CookListItem from "./CookListItem";

export const BrowseCooks = ({}) => {
  const [cooks, setCooks] = useState([]);
  useEffect(() => {
    const loadCooksApi = async () => {
      const cooksFromApi = await loadAllCooks();
      setCooks(cooksFromApi);
    };
    loadCooksApi();
  }, []);

  
  return (
    <div>
      {cooks?.map((cook, index) => (
        <CookListItem key={index} cook={cook} />
      ))}
    </div>
  );
};

BrowseCooks.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseCooks);
