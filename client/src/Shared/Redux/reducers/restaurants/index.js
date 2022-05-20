import {
  LOAD_PAGINATED_RESTAURANTS,
  LOAD_RESTAURANTS,
  LOAD_SINGLE_RESTAURANT,
} from "../../types";

const initialState = {
  restaurants: {},
  pagination: false,
  single: {},
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
          [action.payload.pageNumber + "-" + action.payload.pageSize]:
            action.payload.items,
        },
        pagination: true,
      };
    case LOAD_SINGLE_RESTAURANT:
      return {
        ...state,
        single: {
          ...state.single,
          [action.payload._id]: action.payload,
        },
      };
    default:
      return state;
  }
}
