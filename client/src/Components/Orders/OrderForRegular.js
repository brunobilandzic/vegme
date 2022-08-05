import React, { useEffect } from 'react'
import ordersStyles from "./orders.module.css";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";
export default function OrderForRegular({order}) {
    const { remark, delivery_address, meals, active, date_ordered } = order;

    const getIngredientsString = (ingredients) => {
      let ingredientsString = "";
      ingredients.forEach((ingredient) => {
        ingredientsString += `${ingredient.name} ${
          ingredient.allergen ? "Allegen" : "Not allergen"
        },`;
      });
      return ingredientsString;
    };

    const getMeals = () => {
      return (
        <div className={ordersStyles.mealList}>
          {meals?.map((meal) => (
            <div key={uuid()} className={ordersStyles.mealItem}>
              <div className={ordersStyles.mealName}>{meal.name}</div>
              <div>{meal.type}</div>
              <div>{getIngredientsString(meal.ingredients)}</div>
            </div>
          ))}
        </div>
      );
    };
    
    return (
      <div className={ordersStyles}>
        <div>{format(new Date(date_ordered), "MM/dd/yy, hh:mmaa")}</div>
        <div>{remark}</div>
        <div>{delivery_address}</div>
        <div>Active: {String(active)}</div>
        {meals?.length != 0 && (
          <div className={ordersStyles.mealsWrap}>
            <div className={ordersStyles.mealsHeading}>Meals:</div>
            <div className={ordersStyles.mealList}>{getMeals()}</div>
          </div>
        )}
      </div>
    );
}
