import { ADD_MEAL_TO_CART, REMOVE_MEAL_FROM_CART } from "../../types";

const initialState = {
  meals: [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MEAL_TO_CART:
      return {
        ...state,
        meals: [...state.meals, action.payload],
      };
    case REMOVE_MEAL_FROM_CART:
      return {
        ...state,
        meals: state.meals.filter((meal) => meal._id != action.payload._id),
      };
    default:
      return state;
  }
}
