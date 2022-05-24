import React from "react";
import { isArrayNullOrEmpty } from "../../../util/helper";
import IngredientList from "../Ingredients/IngredientList";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import propTypes from "prop-types";
import mealStyles from "./meal.module.css";
import { connect } from "react-redux";
import {
  addMealToCart,
  removeMealFromCart,
} from "../../../Shared/Redux/actions/meals";

function MealItem({
  meal,
  mealsInCart,
  addMealToCart,
  removeMealFromCart,
  inCart,
}) {
  const handleMealAddClick = (e) => {
    isMealInCart() ? removeMealFromCart(meal) : addMealToCart(meal);
  };

  const getIcon = () => {
    return isMealInCart() ? <AiOutlineMinusCircle /> : <AiOutlinePlusCircle />;
  };

  const isMealInCart = () => {
    return mealsInCart?.includes(meal);
  };
  return (
    <>
      <div className={mealStyles.mealItem}>
        <h6>{meal.name}</h6>
        {!isArrayNullOrEmpty(meal.ingredients) && (
          <>
            <IngredientList ingredients={meal.ingredients}></IngredientList>
          </>
        )}
        {!inCart && (
          <div onClick={handleMealAddClick} className={mealStyles.addIcon}>
            {getIcon()}
          </div>
        )}
      </div>
    </>
  );
}

MealItem.propTypes = {
  mealsInCart: propTypes.array,
  removeMealFromCart: propTypes.func.isRequired,
  addMealToCart: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  mealsInCart: state.cart.meals,
});

export default connect(mapStateToProps, { addMealToCart, removeMealFromCart })(
  MealItem
);
