import {
  ADD_MEAL_TO_CART,
  LOAD_ALL_PAGINATED_MEALS,
  REMOVE_MEAL_FROM_CART,
  DELETE_CACHE_MEALS,
  EMPTY_THE_CART,
  LOAD_ALL_PAGINATED_COOK_MEALS,
  LOAD_ALL_PAGINATED_SPECIAL_MEALS,
  ADD_MEAL_TO_DELETE_FROM_ORDER,
  REMOVE_MEAL_FROM_MEALS_TO_DELETE_FROM_ORDER,
} from "../types";

const initialState = {
  meals: {
    items: {},
  },
  cookMeals: {
    items: {},
  },
  specialMeals: {
    items: {},
  },
  mealsToOrder: [],
  mealsToDeleteFromOrder: []
};

export default function mealsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL_PAGINATED_MEALS:
      return {
        ...state,
        meals: {
          ...state.meals,
          items: {
            ...state.meals.items,
            [action.payload.pageNumber + "-" + action.payload.pageSize]:
              action.payload.items,
          },
        },
      };
    case LOAD_ALL_PAGINATED_COOK_MEALS:
      return {
        ...state,
        cookMeals: {
          ...state.cookMeals,
          items: {
            ...state.cookMeals.items,
            [action.payload.pageNumber + "-" + action.payload.pageSize]:
              action.payload.items,
          },
        },
      };
    case LOAD_ALL_PAGINATED_SPECIAL_MEALS:
      return {
        ...state,
        specialMeals: {
          ...state.specialMeals,
          items: {
            ...state.specialMeals.items,
            [action.payload.pageNumber + "-" + action.payload.pageSize]:
              action.payload.items,
          },
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
    case EMPTY_THE_CART:
      return {
        ...state,
        mealsToOrder: [],
      };
    case ADD_MEAL_TO_DELETE_FROM_ORDER: {
      return {
        ...state,
        mealsToDeleteFromOrder: [...state.mealsToDeleteFromOrder, action.payload]
      }
    }
    case REMOVE_MEAL_FROM_MEALS_TO_DELETE_FROM_ORDER: {
      return {
        ...state,
        mealsToDeleteFromOrder: [
          ...state.mealsToDeleteFromOrder.filter((meal) => meal._id != action.payload),
        ]
      }
    }
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
