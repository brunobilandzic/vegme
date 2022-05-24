import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import MealList from "../Meals/MealList";
import {Button} from "react-bootstrap"
function Cart({ orderedMeals }) {
  return (
    <>
      <div>Cart</div>
      <MealList mealList={orderedMeals}></MealList>
      <Button>Order</Button>
    </>
  );
}

Cart.propTypes = {
  mealsInCart: propTypes.array,
};

const mapStateToProps = (state) => ({
  orderedMeals: state.cart.orderedMeals,
});

export default connect(mapStateToProps, {})(Cart);
