import { createMeal, loadPaginatedMealsFromServer } from "../../Api/meals";
import { needNewPageMeal } from "../actionHelpers";
import {
  ADD_MEAL_TO_CART,
  LOAD_ALL_PAGINATED_MEALS,
  REMOVE_MEAL_FROM_CART,
  UPDATE_TOTAL_ITEMS,
  UPDATE_TOTAL_PAGES,
  ADD_ON_END_MEAL,
  MAKE_NEW_PAGE_MEAL,
  IS_LOADING,
  NOT_LOADING,
} from "../types";

export const addMealToCart = (meal) => (dispatch) => {
  dispatch({ type: ADD_MEAL_TO_CART, payload: meal });
};

export const removeMealFromCart = (meal) => (dispatch) => {
  dispatch({ type: REMOVE_MEAL_FROM_CART, payload: meal });
};

export const createMealAction = (meal) => async (dispatch, getState) => {
  const newMeal = await createMeal(meal);
  switch (
    await needNewPageMeal(
      getState().meals.browsing.items[
        getState().pagination.meals.totalPages +
          "-" +
          getState().pagination.meals.pageSize
      ],
      getState().pagination.meals.pageSize
    )
  ) {
    case ADD_ON_END_MEAL:
      return dispatch({
        type: ADD_ON_END_MEAL,
        payload: {
          meal: newMeal,
          pageNumber: getState().pagination.meals.totalPages,
          pageSize: getState().pagination.meals.pageSize,
        },
      });

    case MAKE_NEW_PAGE_MEAL:
      dispatch({
        type: MAKE_NEW_PAGE_MEAL,
        payload: {
          meal: newMeal,
          pageNumber: getState().pagination.meals.totalPages + 1,
          pageSize: getState().pagination.meals.pageSize,
        },
      });
    case UPDATE_TOTAL_PAGES:
      dispatch({
        type: UPDATE_TOTAL_PAGES,
        payload: {
          type: "meals",
          totalPages: getState().pagination.meals.totalPages + 1,
        },
      });
  }
};

export const loadPaginatedMeals =
  (pageNumber = 1, pageSize = 5) =>
  async (dispatch, getState) => {
    if (getState().meals.browsing.items[pageNumber + "-" + pageSize]) return;
    dispatch({
      type: IS_LOADING
    })
    const paginatedMeals = await loadPaginatedMealsFromServer(
      pageNumber,
      pageSize
    );
    dispatch({
      type: LOAD_ALL_PAGINATED_MEALS,
      payload: {
        pageNumber,
        pageSize,
        items: paginatedMeals.items,
      },
    });
    dispatch({
      type: UPDATE_TOTAL_ITEMS,
      payload: { type: "meals", totalItems: paginatedMeals.totalItems },
    });
    dispatch({
      type: UPDATE_TOTAL_PAGES,
      payload: { type: "meals", totalPages: paginatedMeals.totalPages },
    });
    dispatch({
      type: NOT_LOADING
    })
  };
