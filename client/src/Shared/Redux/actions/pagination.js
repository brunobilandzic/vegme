import {
  UPDATE_PAGE_NUMBER,
  UPDATE_PAGE_SIZE,
  UPDATE_TOTAL_ITEMS,
  UPDATE_TOTAL_PAGES,
} from "../types";

export const updatePageNumber = (pageNumber) => (dispatch, getState) => {
  const totalPages = getState().pagination.totalPages;
  if (pageNumber < 0 || pageNumber > totalPages) return;

  dispatch({
    type: UPDATE_PAGE_NUMBER,
    payload: pageNumber,
  });
};

export const updatePageSize = (pageSize) => (dispatch, getState) => {
  const totalItems = getState().pagination.totalItems;
  if (pageSize < 0 || totalItems) return;

  dispatch({
    type: UPDATE_PAGE_SIZE,
    payload: pageSize,
  });
};

export const updateTotalPages = (totalPages) => (dispatch, getState) => {
  const totalItems = getState().pagination.totalItems;
  if (totalPages < 0 || totalPages > totalItems) return;

  dispatch({
    type: UPDATE_TOTAL_PAGES,
    payload: totalPages,
  });
};

export const updateTotalItems = (totalItems) => (dispatch) => {
  dispatch({
    type: UPDATE_TOTAL_ITEMS,
    payload: totalItems,
  });
};

