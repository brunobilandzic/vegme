import {
  createMeal,
  loadMealsWithOrders,
  loadPaginatedMealsFromServer,
  loadPaginatedSpecialMealsFromServer,
} from "../../Shared/Api/meals";
import { getFavourites } from "../../Shared/Api/regular";
import {
  ADD_MEAL_TO_CART,
  LOAD_ALL_PAGINATED_MEALS,
  REMOVE_MEAL_FROM_CART,
  UPDATE_TOTAL_ITEMS,
  UPDATE_TOTAL_PAGES,
  IS_LOADING,
  NOT_LOADING,
  DELETE_CACHE_MEALS,
  RESET_PAGINATION_FOR_TYPE,
  LOAD_ALL_PAGINATED_COOK_MEALS,
  LOAD_ALL_PAGINATED_SPECIAL_MEALS,
  REMOVE_PAGINATED_COOK_MEALS,
  LOAD_PAGINATED_FAVOURITES_FOR_USERNAME,
} from "../types";

export const addMealToCart = (meal) => (dispatch, getState) => {
  if (
    !getState()
      .meals.mealsToOrder.map((meal) => meal.cook._id)
      .every((cookId) => cookId == meal.cook._id)
  )
    return;

  dispatch({ type: ADD_MEAL_TO_CART, payload: meal });
};

export const removeMealFromCart = (mealId) => (dispatch) => {
  dispatch({ type: REMOVE_MEAL_FROM_CART, payload: mealId });
};

export const createMealAction = (meal) => async (dispatch, getState) => {
  const newMeal = await createMeal(meal);
  dispatch({
    type: DELETE_CACHE_MEALS,
  });
  dispatch({
    type: RESET_PAGINATION_FOR_TYPE,
    payload: {
      type: "meals",
    },
  });
  dispatch({
    type: REMOVE_PAGINATED_COOK_MEALS,
  });
  dispatch({
    type: RESET_PAGINATION_FOR_TYPE,
    payload: {
      type: "cookMeals",
    },
  });
};

export const loadPaginatedMeals =
  (pageNumber = 1, pageSize = 5) =>
  async (dispatch, getState) => {
    if (getState().meals.meals.items[pageNumber + "-" + pageSize]) return;
    dispatch({
      type: IS_LOADING,
    });
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
      type: NOT_LOADING,
    });
  };

export const loadPaginatedMealsWithOrders =
  (pageNumber = 1, pageSize = 5) =>
  async (dispatch, getState) => {
    if (getState().meals.cookMeals.items[pageNumber + "-" + pageSize]) return;
    dispatch({
      type: IS_LOADING,
    });
    const paginatedMealsOrders = await loadMealsWithOrders(
      pageNumber,
      pageSize
    );
    dispatch({
      type: LOAD_ALL_PAGINATED_COOK_MEALS,
      payload: {
        pageNumber,
        pageSize,
        items: paginatedMealsOrders.items,
      },
    });
    dispatch({
      type: UPDATE_TOTAL_ITEMS,
      payload: {
        type: "cookMeals",
        totalItems: paginatedMealsOrders.totalItems,
      },
    });
    dispatch({
      type: UPDATE_TOTAL_PAGES,
      payload: {
        type: "cookMeals",
        totalPages: paginatedMealsOrders.totalPages,
      },
    });
    dispatch({
      type: NOT_LOADING,
    });
  };

export const loadPaginatedSpecialMeals =
  (pageNumber = 1, pageSize = 5) =>
  async (dispatch, getState) => {
    if (getState().meals.specialMeals.items[pageNumber + "-" + pageSize])
      return;
    dispatch({
      type: IS_LOADING,
    });
    const paginatedSpecialMeals = await loadPaginatedSpecialMealsFromServer(
      pageNumber,
      pageSize
    );
    dispatch({
      type: LOAD_ALL_PAGINATED_SPECIAL_MEALS,
      payload: {
        pageNumber,
        pageSize,
        items: paginatedSpecialMeals.items,
      },
    });
    dispatch({
      type: UPDATE_TOTAL_ITEMS,
      payload: {
        type: "specialMeals",
        totalItems: paginatedSpecialMeals.totalItems,
      },
    });
    dispatch({
      type: UPDATE_TOTAL_PAGES,
      payload: {
        type: "specialMeals",
        totalPages: paginatedSpecialMeals.totalPages,
      },
    });
    dispatch({
      type: NOT_LOADING,
    });
  };

export const loadPaginatedFavouritesForUsername =
  (username, pageNumber = 1, pageSize = 5) =>
  async (dispatch, getState) => {
    if (
      getState().meals.favouriteMeals[username] &&
      getState().meals.favouriteMeals[username][pageNumber + "-" + pageSize]
    )
      return;
    console.log(username);
    dispatch({
      type: IS_LOADING,
    });

    const paginatedFavourites = await getFavourites(
      username,
      pageNumber,
      pageSize
    );

    dispatch({
      type: LOAD_PAGINATED_FAVOURITES_FOR_USERNAME,
      payload: {
        username,
        pageNumber,
        pageSize,
        items: paginatedFavourites.items,
      },
    });
    dispatch({
      type: UPDATE_TOTAL_ITEMS,
      payload: {
        type: "favouriteMeals",
        totalItems: paginatedFavourites.totalItems,
      },
    });
    dispatch({
      type: UPDATE_TOTAL_PAGES,
      payload: {
        type: "favouriteMeals",
        totalPages: paginatedFavourites.totalPages,
      },
    });

    dispatch({
      type: NOT_LOADING,
    });
  };
