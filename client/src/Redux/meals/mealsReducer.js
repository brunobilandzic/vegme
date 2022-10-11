import {
  ADD_MEAL_TO_CART,
  LOAD_ALL_PAGINATED_MEALS,
  REMOVE_MEAL_FROM_CART,
  DELETE_CACHE_MEALS,
  EMPTY_THE_CART,
  LOAD_ALL_PAGINATED_COOK_MEALS,
  LOAD_ALL_PAGINATED_SPECIAL_MEALS,
  REMOVE_PAGINATED_COOK_MEALS,
  LOAD_PAGINATED_FAVOURITES_FOR_USERNAME,
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
  favouriteMeals: {},
  mealsToOrder: [],
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
    case REMOVE_PAGINATED_COOK_MEALS:
      return {
        ...state,
        cookMeals: {
          ...state.cookMeals,
          items: {},
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
    case LOAD_PAGINATED_FAVOURITES_FOR_USERNAME:
      return {
        ...state,
        favouriteMeals: {
          ...state.favouriteMeals,
          [action.payload.username]: {
            ...state.favouriteMeals[action.payload.username],
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
    case DELETE_CACHE_MEALS:
      return {
        ...state,
        meals: {
          items: {},
        },
        mealsToOrder: [],
      };
    default:
      return state;
  }
}
