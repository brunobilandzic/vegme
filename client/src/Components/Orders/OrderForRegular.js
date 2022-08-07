import React, { useEffect } from "react";
import ordersStyles from "./orders.module.css";
import { format } from "date-fns";
import MealInOrder from "./MealInOrder";
import { v4 as uuid } from "uuid";

export default function OrderForRegular({ order, removeMeal }) {
  let { remark, delivery_address, meals, active, date_ordered } = order;

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
            {meals?.map((meal) => (
              <MealInOrder
                removeMeal={removeMeal}
                key={uuid()}
                orderId={order._id}
                meal={meal}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
