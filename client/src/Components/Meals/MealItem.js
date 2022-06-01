import React, { useEffect } from "react";
import { isArrayNullOrEmpty } from "../../util/helper";
import IngredientList from "./Ingredients/IngredientList";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import propTypes from "prop-types";
import mealStyles from "./meal.module.css";
import { connect } from "react-redux";
import {
  addMealToCart,
  removeMealFromCart,
} from "../../Shared/Redux/cart/cartActions.js";

function MealItem({
  meal,
  orderedMeals,
  addMealToCart,
  removeMealFromCart,
  showAdd,
}) {
  const handleMealAddClick = (e) => {
    isMealInCart() ? removeMealFromCart(meal._id) : addMealToCart(meal);
  };

  const getIcon = () => {
    return isMealInCart() ? <AiOutlineMinusCircle /> : <AiOutlinePlusCircle />;
  };

  const isMealInCart = () => {
    return orderedMeals?.map((meal) => meal._id).includes(meal._id);
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
        {showAdd && (
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
  orderedMeals: state.cart.orderedMeals,
});

export default connect(mapStateToProps, { addMealToCart, removeMealFromCart })(
  MealItem
);
