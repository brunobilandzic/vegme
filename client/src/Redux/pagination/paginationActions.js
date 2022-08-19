import {
  UPDATE_PAGE_NUMBER,
  UPDATE_PAGE_SIZE,
  UPDATE_TOTAL_ITEMS,
  UPDATE_TOTAL_PAGES,
} from "../types";

export const updatePageNumber = (type, pageNumber) => (dispatch, getState) => {
  const totalPages = getState().pagination[type].totalPages;
  if (pageNumber < 0 || pageNumber > totalPages) return;
  dispatch({
    type: UPDATE_PAGE_NUMBER,
    payload: {
      type,
      pageNumber,
    },
  });
};

export const updatePageSize = (type, pageSize) => (dispatch, getState) => {
  const totalItems = getState().pagination[type].totalItems;
  if (pageSize < 0 || totalItems) return;

  dispatch({
    type: UPDATE_PAGE_SIZE,
    payload: {
      type,
      pageSize,
    },
  });
};

export const updateTotalPages = (type, totalPages) => (dispatch, getState) => {
  const totalItems = getState().pagination[type].totalItems;
  if (totalPages < 0 || totalPages > totalItems) return;

  dispatch({
    type: UPDATE_TOTAL_PAGES,
    payload: {
      type,
      totalPages,
    },
  });
};

export const updateTotalItems = (type, totalItems) => (dispatch) => {
  dispatch({
    type: UPDATE_TOTAL_ITEMS,
    payload: {
      type,
      totalItems,
    },
  });
};
