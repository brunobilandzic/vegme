import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getMealById } from "../../Shared/Api/meals";
import { COOK, REGULAR } from "../../Shared/Constants/Roles";
import MealForCook from "./Cook/MealForCook";
import MealForRegular from "./MealForRegular";

export const MealMainPage = ({ user }) => {
  const { mealId } = useParams();
  const [meal, setMeal] = useState();

  useEffect(() => {
    const setMealAsync = async () => {
      const meal = await getMealById(mealId);
      setMeal(meal);
    };

    setMealAsync();
  }, []);

  return (
    <>
      {meal &&
        user?.roles.map((r) => r.name).includes(REGULAR) &&
        !user?.roles.map((r) => r.name).includes(COOK) && (
          <MealForRegular meal={meal} />
        )}
      {meal &&
        user?.roles.map((r) => r.name).includes(COOK) &&
        !user?.roles.map((r) => r.name).includes(REGULAR) && (
          <MealForCook meal={meal} />
        )}
    </>
  );
};

MealMainPage.propTypes = {};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MealMainPage);
