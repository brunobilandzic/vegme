import { createOrder } from "../../Api/orders";
import { ADD_MEAL_TO_CART, REMOVE_MEAL_FROM_CART, SEND_ORDER } from "../types";

export const addMealToCart = (meal) => (dispatch) => {
  dispatch({ type: ADD_MEAL_TO_CART, payload: meal });
};

export const removeMealFromCart = (meal) => (dispatch) => {
  dispatch({ type: REMOVE_MEAL_FROM_CART, payload: meal });
};

export const sendOrder =
  (remark, deliveryAddress, active) => async (dispatch, getState) => {
    const order = {
      remark,
      delivery_address: deliveryAddress,
      active,
      meals: getState().cart.orderedMeals?.map((meal) => meal._id),
    };

    const newOrder = await createOrder(order);
    dispatch({ type: SEND_ORDER, payload: newOrder });
  };
