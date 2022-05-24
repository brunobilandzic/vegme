import {
    UPDATE_PAGE_NUMBER,
    UPDATE_PAGE_SIZE,
    UPDATE_TOTAL_ITEMS,
    UPDATE_TOTAL_PAGES,
    WRITE_PAGINATION,
  } from "../types";
  
  const initialState = {
      pageNumber: 1,
      pageSize: 5,
      totalItems: null,
      totalPages: null
  }
  
  export default function paginationReducer(state = initialState, action) {
    switch (action.type) {
      case UPDATE_PAGE_NUMBER:
        return {
          ...state,
          pageNumber: action.payload,
        };
      case UPDATE_PAGE_SIZE:
        return {
          ...state,
          pageSize: action.payload,
        };
      case UPDATE_TOTAL_ITEMS:
        return {
          ...state,
          totalItems: action.payload,
        };
      case UPDATE_TOTAL_PAGES:
        return {
          ...state,
          totalPages: action.payload,
        };
      case WRITE_PAGINATION:
        return {
          ...state,
          pageNumber: action.payload.pageNumber,
          pageSize: action.payload.pageSize,
          totalItems: action.payload.totalItems,
          totalPages: action.payload.totalPages,
        };
      default:
        return state;
    }
  }
  