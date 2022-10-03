import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import mealStyles from "./meal.module.css";
import { format } from "date-fns";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { RiForbid2Line } from "react-icons/ri";
import {
  addMealToCart,
  removeMealFromCart,
} from "../../Redux/meals/mealsActions";

export const MealForRegular = ({
  meal,
  mealsToOrder,
  addMealToCart,
  removeMealFromCart,
}) => {
  const handleMealAddClick = (e) => {
    isMealInCart() ? removeMealFromCart(meal._id) : addMealToCart(meal);
  };

  const getIcon = () => {
    return isMealInCart() ? (
      <AiOutlineMinusCircle className={mealStyles.removeIcon} onClick={handleMealAddClick} />
    ) : (
      <AiOutlinePlusCircle className={mealStyles.addIcon}  onClick={handleMealAddClick} />
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

  return (
    <div
      className={
        "d-flex justify-content-between " + mealStyles.mealForRegularWrap
      }
    >
      <div>
        <div className={mealStyles.mealName}>{meal.name}</div>
        <div>{meal.cook?.user.username}</div>
        <div>{format(new Date(meal.date_created), "MM/dd/yy, hh:mmaa")}</div>
      </div>
      <div className={mealStyles.bigIcon}>
        <div className={mealStyles.icon}>{determineIcon()}</div>
      </div>
    </div>
  );
};

MealForRegular.propTypes = {
  addMealToCart: PropTypes.func.isRequired,
  removeMealFromCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  mealsToOrder: state.meals.mealsToOrder,
});

const mapDispatchToProps = { addMealToCart, removeMealFromCart };

export default connect(mapStateToProps, mapDispatchToProps)(MealForRegular);
