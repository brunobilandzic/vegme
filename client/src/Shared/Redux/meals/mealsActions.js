import { loadPaginatedMealsFromServer } from "../../Api/meals";
import {
  ADD_MEAL_TO_CART,
  LOAD_ALL_PAGINATED_MEALS,
  REMOVE_MEAL_FROM_CART,
  UPDATE_TOTAL_ITEMS,
  UPDATE_TOTAL_PAGES,
} from "../types";

export const addMealToCart = (meal) => (dispatch) => {
  dispatch({ type: ADD_MEAL_TO_CART, payload: meal });
};

export const removeMealFromCart = (meal) => (dispatch) => {
  dispatch({ type: REMOVE_MEAL_FROM_CART, payload: meal });
};

export const loadPaginatedMeals =
  (pageNumber = 1, pageSize = 5) =>
  async (dispatch, getState) => {
    if (getState().meals.browsing.items[pageNumber + "-" + pageSize]) return;
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
    dispatch({ type: UPDATE_TOTAL_ITEMS, payload: paginatedMeals.totalItems });
    dispatch({ type: UPDATE_TOTAL_PAGES, payload: paginatedMeals.totalPages });
  };
