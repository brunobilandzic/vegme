import React, { useEffect } from "react";
import { isArrayNullOrEmpty } from "../../util/helper";
import IngredientList from "./Ingredients/IngredientList";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { RiForbid2Line } from "react-icons/ri";
import propTypes from "prop-types";
import mealStyles from "./meal.module.css";
import { connect } from "react-redux";
import {
  addMealToCart,
  removeMealFromCart,
} from "../../Shared/Redux/meals/mealsActions";

function MealItem({
  meal,
  mealsToOrder,
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
    return mealsToOrder?.map((meal) => meal._id).includes(meal._id);
  };


  const determineIcon = () => {
    if (mealsToOrder.length == 0) return getIcon();
    if (
      mealsToOrder
        .map((meal) => meal.cook._id)
        .every((cookId) => cookId == meal.cook._id)
    )
      return getIcon();
    return (
      <div className="hover-box">
        <RiForbid2Line />
        <div className="hover-text different-cook">Different cook!</div>
      </div>
    );
  };


  return (
    <>
      <div className={mealStyles.wrap}>
        <div className="d-flex flex-row justify-content-start">
          <div className="flex-row-item">
            <h6>{meal?.name}</h6>
          </div>
          {!isArrayNullOrEmpty(meal.ingredients) && (
            <div className="flex-row-item">
              <IngredientList ingredients={meal.ingredients}></IngredientList>
            </div>
          )}
          <div className={"flex-row-item " + mealStyles.cookName}>{meal.cook.user?.username}</div>
          <div className={mealStyles.type}>{meal.type}</div>
        </div>
        {showAdd && (
          <div className="last-item">
            <div onClick={handleMealAddClick} className={mealStyles.addIcon}>
              {determineIcon()}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

MealItem.propTypes = {
  mealsToOrder: propTypes.array,
  removeMealFromCart: propTypes.func.isRequired,
  addMealToCart: propTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  mealsToOrder: state.meals.mealsToOrder,
});


export default connect(mapStateToProps, { addMealToCart, removeMealFromCart })(
  MealItem
);
