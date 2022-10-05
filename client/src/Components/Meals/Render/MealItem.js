import React, { useEffect } from "react";
import { isArrayNullOrEmpty } from "../../../util/helper";
import IngredientList from "../Ingredients/IngredientList";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { RiForbid2Line } from "react-icons/ri";
import propTypes from "prop-types";
import mealStyles from "../meal.module.css";
import { connect } from "react-redux";
import {
  addMealToCart,
  removeMealFromCart,
} from "../../../Redux/meals/mealsActions";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

function MealItem({
  meal,
  mealsToOrder,
  addMealToCart,
  removeMealFromCart,
  showAdd,
  cookUsername
}) {
  const navigate = useNavigate();
  const handleMealAddClick = (e) => {
    isMealInCart() ? removeMealFromCart(meal._id) : addMealToCart(meal);
  };

  const getIcon = () => {
    return isMealInCart() ? (
      <AiOutlineMinusCircle
        className={mealStyles.removeIcon}
        onClick={handleMealAddClick}
      />
    ) : (
      <AiOutlinePlusCircle
        className={mealStyles.addIcon}
        onClick={handleMealAddClick}
      />
    );
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
        <RiForbid2Line className={mealStyles.forbidIcon} />
        <div className="hover-text different-cook">Different cook!</div>
      </div>
    );
  };

  const openMeal = (e) => {
    if (
      e.target.tagName.toLowerCase() != "path" &&
      e.target.tagName.toLowerCase() != "svg"
    )
      navigate(`/meals/${meal._id}`);
  };

  return (
    <>
      <div className={mealStyles.wrap} onClick={openMeal}>
        <div className="d-flex flex-row justify-content-start">
          <div className="flex-row-item">
            <h6>{meal?.name}</h6>
          </div>
          {!isArrayNullOrEmpty(meal.ingredients) && (
            <div className="flex-row-item">
              <IngredientList ingredients={meal.ingredients}></IngredientList>
            </div>
          )}
          <div className={"flex-row-item " + mealStyles.cookName}>
            {cookUsername ? cookUsername : meal.cook.user?.username}
          </div>
          <div className={"flex-row-item " + mealStyles.type}>{meal.type}</div>
          <div className={"flex-rew-item " + mealStyles.dateCreated}>
            {format(new Date(meal.date_created), "MM/dd/yy, hh:mmaa")}
          </div>
        </div>
        {showAdd && (
          <div className="last-item">
            <div className={mealStyles.addIcon}>{determineIcon()}</div>
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
