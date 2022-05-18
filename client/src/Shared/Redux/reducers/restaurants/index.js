import { LOAD_PAGINATED_RESTAURANTS, LOAD_RESTAURANTS } from "../../types";

const initialState = {
  restaurants: {},
  pagination: false,
};

export default function restaurantReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_RESTAURANTS:
      return {
        ...state,
        restaurants: { ...state.restaurants, all: action.payload },
        pagination: false,
      };
    case LOAD_PAGINATED_RESTAURANTS:
      return {
        ...state,
        restaurants: {
          ...state.restaurants,
          [action.payload.pageNumber + "-" + action.payload.totalPages]:
            action.payload.items,
        },
        pagination: true,
      };
    default:
      return state;
  }
}
