import React from "react";
import ordersStyles from "./orders.module.css";
import { format } from "date-fns";
import MealInOrder from "./MealInOrder";

export default function OrderForRegular({ order }) {
  const { remark, delivery_address, meals, active, date_ordered } = order;

  return (
    <div className={ordersStyles}>
      <div>{format(new Date(date_ordered), "MM/dd/yy, hh:mmaa")}</div>
      <div>{remark}</div>
      <div>{delivery_address}</div>
      <div>Active: {String(active)}</div>
      {meals?.length !== 0 && (
        <div className={ordersStyles.mealsWrap}>
          <div className={ordersStyles.mealsHeading}>Meals:</div>
          <div className={ordersStyles.mealList}>
            {meals.map((meal) => (
              <MealInOrder meal={meal} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
