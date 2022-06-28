import {
  ADD_ON_END_ORDER,
  LOAD_PAGINATED_ORDERS_FOR_USER,
  MAKE_NEW_PAGE_ORDER,
} from "../types";

const initialState = {
  browsing: {
    items: {},
    pagination: false,
  },
  sentOrders: [],
};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ON_END_ORDER:
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
              action.payload.order,
            ],
          },
        },
      };
    case MAKE_NEW_PAGE_ORDER:
      return {
        ...state,
        browsing: {
          ...state.browsing,
          items: {
            ...state.browsing.items,
            [action.payload.pageNumber + "-" + action.payload.pageSize]: [
              action.payload.order,
            ],
          },
        },
      };
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

    default:
      return state;
  }
}
