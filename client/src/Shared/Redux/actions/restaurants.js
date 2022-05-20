const {
  getAllRestaurants,
  getAllPaginatedRestaurants,
  getSingleRestaurant,
} = require("../../Api/restaurants");
const {
  LOAD_RESTAURANTS,
  LOAD_PAGINATED_RESTAURANTS,
  WRITE_PAGINATION,
  LOAD_SINGLE_RESTAURANT,
} = require("../types");

const loadAllRestaurants = () => async (dispatch) => {
  const allRstaurants = await getAllRestaurants();
  dispatch({ type: LOAD_RESTAURANTS, payload: allRstaurants });
};

const loadAllRestaurantsWithPagination =
  (pageNumber, pageSize) => async (dispatch, getState) => {
    const cachedRestaurants =
      getState().restaurants.restaurants[pageNumber + "-" + pageSize];
    if (cachedRestaurants) return;

    const allRestaurantsWithPagination = await getAllPaginatedRestaurants(
      pageNumber,
      pageSize
    );
    dispatch({
      type: LOAD_PAGINATED_RESTAURANTS,
      payload: {
        items: allRestaurantsWithPagination.items,
        pageNumber: allRestaurantsWithPagination.pageNumber,
        totalPages: allRestaurantsWithPagination.totalPages,
        totalItems: allRestaurantsWithPagination.totalItems,
        pageSize: allRestaurantsWithPagination.pageSize,
      },
    });
    dispatch({
      type: WRITE_PAGINATION,
      payload: {
        pageNumber: allRestaurantsWithPagination.pageNumber,
        pageSize: allRestaurantsWithPagination.pageSize,
        totalPages: allRestaurantsWithPagination.totalPages,
        totalItems: allRestaurantsWithPagination.totalItems,
      },
    });
  };

const loadSingleRestaurant = (restaurantId) => async (dispatch, getState) => {
  const cachedRestaurant = getState().restaurants.single[restaurantId];
  if (cachedRestaurant) return;

  const restaurant = await getSingleRestaurant(restaurantId)
  dispatch({
    type: LOAD_SINGLE_RESTAURANT,
    payload: restaurant
  })
};

export { loadAllRestaurants, loadAllRestaurantsWithPagination, loadSingleRestaurant };
