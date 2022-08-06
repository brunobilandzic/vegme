import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import ordersStyles from "./orders.module.css";
import { v4 as uuid } from "uuid";
import {AiFillDelete} from "react-icons/ai"

export const MealInOrder = ({ meal,  }) => {
  const getIngredientsString = (ingredients) => {
    let ingredientsString = "";
    ingredients.forEach((ingredient, index) => {
      ingredientsString +=index!=ingredients.length - 1 ? ` ${ingredient.name}  ${
        ingredient.allergen ? "allegen" : "not allergen"
      },` : ` ${ingredient.name} ${
        ingredient.allergen ? "allegen" : "not allergen"
      }`;
    });
    return ingredientsString;
  };

  return (
    <div key={uuid()} className={`${ordersStyles.mealItem} d-flex`}>
      <div className={ordersStyles.mealName}>{meal.name}</div>
      <div>{meal.type}</div>
      <div>{getIngredientsString(meal.ingredients)}</div>
      <div>
        <AiFillDelete />
      </div>
    </div>
  );
};

MealInOrder.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MealInOrder);
