import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { loadSingleRestaurant } from "../../Shared/Redux/actions/restaurants.js";
import MealItem from "../Meals/MealItem.js";

function RestaurantSingular(props) {
  const { single, loadSingleRestaurant } = props;
  const { restaurantId } = useParams();
  const restaurant = single[restaurantId];
  useEffect(() => {
    loadSingleRestaurant(restaurantId);
  }, []);
  const getMeals = () =>
    single[restaurantId]?.meals.map((meal) => (
      <MealItem meal={meal}></MealItem>
    ));
  return (
    <>
      <h1>{restaurant?.name}</h1>
      <div className="meal-list-container"><div className="meals-display-header">Meals</div>{getMeals()}</div>
    </>
  );
}

RestaurantSingular.propTypes = {
  loadSingleRestaurant: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  single: state.restaurants.single,
});

export default connect(mapStateToProps, { loadSingleRestaurant })(
  RestaurantSingular
);
