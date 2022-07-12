import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { loadSingleCook } from "../../Shared/Api/cooks";
import classnames from "classnames";
import cookStyles from "./cook.module.css";
import MealItem from "../Meals/MealItem";
import { v4 as uuid } from "uuid";
const CookProfile = ({ isLoggedin }) => {
  const { username } = useParams();
  const [cook, setCook] = useState();
  const [showMeals, setShowMeals] = useState(false);
  useEffect(() => {
    const fetchCook = async () => {
      setCook(await loadSingleCook(username));
    };
    fetchCook();
  }, []);


  const handleShowMealsClick = () => {
    setShowMeals((prevShowMeals) => !prevShowMeals);
  };


  return (
    <div>
      <div className={cookStyles.name}>{cook?.user.name}</div>
      <div onClick={handleShowMealsClick} className={cookStyles.mealCount + " mt-2"}>
        Cooked {cook?.cooks.length} meals
      </div>
      <div className={classnames({ hidden: !showMeals})}>
        {cook?.cooks.map((meal) => (
          <MealItem meal={meal} key={uuid()} showAdd={isLoggedin} />
        ))}
      </div>
    </div>
  );
};

CookProfile.propTypes = {
  user: PropTypes.object,
};


const mapStateToProps = (state) => ({
  isLoggedin: state.auth.is_logged_in,
});


const mapDispatchToProps = {};


export default connect(mapStateToProps, mapDispatchToProps)(CookProfile);
