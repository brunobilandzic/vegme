import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import MealList from "../Meals/MealList";

function Cart({ mealsInCart }) {
  return (
    <>
      <div>Cart</div>
      <MealList mealList={mealsInCart} inCart></MealList>
    </>
  );
}

Cart.propTypes = {
  mealsInCart: propTypes.array,
};

const mapStateToProps = (state) => ({
  mealsInCart: state.cart.meals,
});

export default connect(mapStateToProps, {})(Cart);
