import { DELETE_CACHE_ORDERS, LOAD_PAGINATED_ORDERS_FOR_USER } from "../types";

const initialState = {
  browsing: {
    items: {},
    pagination: false,
  },
  sentOrders: [],
};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PAGINATED_ORDERS_FOR_USER:
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
    case DELETE_CACHE_ORDERS:
      return {
        ...state,
        browsing: {
          items: {},
          pagination: false,
        },
      };
    default:
      return state;
  }
}
