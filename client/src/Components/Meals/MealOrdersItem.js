import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import IngredientList from "./Ingredients/IngredientList";
import classnames from "classnames";
import OrderItem from "../Orders/OrderItem";
import { v4 as uuid } from "uuid";
import mealsStyles from "./meal.module.css";
const MealOrdersItem = ({ meal, orders }) => {
  const [showOrders, setShowOrders] = useState(false);
  const toggleShowOrders = () => {
    setShowOrders((prevShowOrders) => !prevShowOrders);
  };
  return (
    <div className={mealsStyles.mealOrders}>
      <div>Meal: {meal.name}</div>
      {meal.ingredients?.length != 0 && (
        <IngredientList ingredients={meal.ingredients} />
      )}
      {meal.orders?.length != 0 && (
        <div>
          <div
            className={classnames({ showOrders: true })}
            onClick={toggleShowOrders}
          >
            Orders ({meal.orders.length} total,{" "}
            {meal.orders.filter((order) => order.active)?.length} active)
          </div>

          <div className={classnames({ hidden: !showOrders })}>
            {orders?.map((order) => (
              <OrderItem key={uuid()} order={order} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

MealOrdersItem.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MealOrdersItem);
