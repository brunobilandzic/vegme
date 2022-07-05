import {
  ADD_MEAL_TO_CART,
  LOAD_ALL_PAGINATED_MEALS,
  REMOVE_MEAL_FROM_CART,
  DELETE_CACHE_MEALS,
} from "../types";

const initialState = {
  browsing: {
    items: {},
    pagination: false,
  },
  mealsToOrder: [],
};

export default function mealsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL_PAGINATED_MEALS:
      return {
        ...state,
        browsing: {
          ...state.browsing,
          items: {
            ...state.browsing.items,
            [action.payload.pageNumber + "-" + action.payload.pageSize]:
              action.payload.items,
          },
          pagination: true,
        },
      };
    case ADD_MEAL_TO_CART:
      return {
        ...state,
        mealsToOrder: [...state.mealsToOrder, action.payload],
      };

    case REMOVE_MEAL_FROM_CART:
      return {
        ...state,
        mealsToOrder: [
          ...state.mealsToOrder.filter((meal) => meal._id != action.payload),
        ],
      };
    case DELETE_CACHE_MEALS:
      return {
        ...state,
        browsing: {
          items: {},
          pagination: false,
        },
        mealsToOrder: [],
      };
    default:
      return state;
  }
}
