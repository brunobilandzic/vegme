import { ADD_MEAL_TO_CART, REMOVE_MEAL_FROM_CART } from "../types";

export const addMealToCart = (meal) => (dispatch) => {
  dispatch({ type: ADD_MEAL_TO_CART, payload: meal });
};

export const removeMealFromCart = (meal) => dispatch => {
    dispatch({type: REMOVE_MEAL_FROM_CART, payload: meal})
}