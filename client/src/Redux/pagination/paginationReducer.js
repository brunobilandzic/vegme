import {
  DONT_NEED_TO_REFRESH,
  NEED_REFRESH,
  RESET_PAGINATION_FOR_TYPE,
  UPDATE_PAGE_NUMBER,
  UPDATE_PAGE_SIZE,
  UPDATE_TOTAL_ITEMS,
  UPDATE_TOTAL_PAGES,
  WRITE_PAGINATION,
} from "../types";

const initialState = {
  orders: {
    pageNumber: 1,
    pageSize: 5,
    totalItems: null,
    totalPages: null,
  },
  meals: {
    pageNumber: 1,
    pageSize: 5,
    totalItems: null,
    totalPages: null,
  },
  cookMeals: {
    pageNumber: 1,
    pageSize: 5,
    totalItems: null,
    totalPages: null,
  },
  specialMeals: {
    pageNumber: 1,
    pageSize: 5,
    totalItems: null,
    totalPages: null,
  },
  alerts: {
    pageNumber: 1,
    pageSize: 5,
    totalItems: null,
    totalPages: null,
  },
  favouriteMeals: {
    pageNumber: 1,
    pageSize: 5,
    totalItems: null,
    totalPages: null
  }
};

export default function paginationReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PAGE_NUMBER:
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          pageNumber: action.payload.pageNumber,
        },
      };
    case UPDATE_PAGE_SIZE:
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          pageSize: action.payload.pageSize,
        },
      };
    case UPDATE_TOTAL_ITEMS:
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          totalItems: action.payload.totalItems,
        },
      };
    case UPDATE_TOTAL_PAGES:
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          totalPages: action.payload.totalPages,
        },
      };
    case WRITE_PAGINATION:
      return {
        ...state,
        [action.payload.type]: {
          pageNumber: action.payload.pageNumber,
          pageSize: action.payload.pageNumber,
          totalItems: action.payload.totalItems,
          totalPages: action.payload.totalPages,
        },
      };
    case RESET_PAGINATION_FOR_TYPE:
      return {
        ...state,
        [action.payload.type]: {
          pageNumber: 1,
          pageSize: 5,
          totalItems: null,
          totalPages: null,
        },
      };
    default:
      return state;
  }
}
