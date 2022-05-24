import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import MealList from "../Meals/MealList";
import {Button} from "react-bootstrap"
function Cart({ mealsInCart }) {
  return (
    <>
      <div>Cart</div>
      <MealList mealList={mealsInCart} inCart></MealList>
      <Button>Order</Button>
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
