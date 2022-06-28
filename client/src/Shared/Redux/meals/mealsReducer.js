import { ADD_ON_END_MEAL, MAKE_NEW_PAGE_MEAL, ADD_MEAL_TO_CART, LOAD_ALL_PAGINATED_MEALS, REMOVE_MEAL_FROM_CART } from "../types";

const initialState = {
  browsing: {
    items: {},
    pagination: false,
  },
  mealsToOrder: [],
};

export default function mealsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ON_END_MEAL:
      return {
        ...state,
        browsing: {
          ...state.browsing,
          items: {
            ...state.browsing.items,
            [action.payload.pageNumber + "-" + action.payload.pageSize]: [
              ...state.browsing.items[
                action.payload.pageNumber + "-" + action.payload.pageSize
              ],
              action.payload.meal,
            ],
          },
        },
      };
    case MAKE_NEW_PAGE_MEAL:
      return {
        ...state,
        browsing: {
          ...state.browsing,
          items: {
            ...state.browsing.items,
            [action.payload.pageNumber + "-" + action.payload.pageSize]: [
              action.payload.meal,
            ],
          },
        },
      };
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
    default:
      return state;
  }
}
