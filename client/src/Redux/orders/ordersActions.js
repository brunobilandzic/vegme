import {
  createOrder,
  loadPaginatedOrdersForUserFromServer,
} from "../../Shared/Api/orders";
import {
  DELETE_CACHE_ORDERS,
  EMPTY_THE_CART,
  IS_LOADING,
  LOAD_PAGINATED_ORDERS_FOR_USER,
  NOT_LOADING,
  RESET_PAGINATION_FOR_TYPE,
  UPDATE_TOTAL_ITEMS,
  UPDATE_TOTAL_PAGES,
} from "../types";

export const sendOrder =
  (remark, deliveryAddress, orderTime) => async (dispatch, getState) => {
    const order = {
      remark,
      delivery_address: deliveryAddress,
      order_time: orderTime,
      meals: getState().meals.mealsToOrder?.map((meal) => meal._id),
      cook: getState().meals.mealsToOrder[0].cook._id,
    };
    const newOrder = await createOrder(order);
    dispatch({
      type: DELETE_CACHE_ORDERS,
    });
    dispatch({
      type: RESET_PAGINATION_FOR_TYPE,
      payload: {
        type: "orders",
      },
    });
    dispatch({
      type: EMPTY_THE_CART,
    });
  };

export const emptyTheCart = () => (dispatch) => {
  dispatch({
    type: EMPTY_THE_CART,
  });
};

export const clearOrdersCache = () => (dispatch) => {
  dispatch({
    type: DELETE_CACHE_ORDERS,
  });
  dispatch({
    type: RESET_PAGINATION_FOR_TYPE,
    payload: {
      type: "orders",
    },
  });
};

export const loadPaginatedOrdersForUser =
  (pageNumber = 1, pageSize = 5) =>
  async (dispatch, getState) => {
    if (getState().orders.browsing.items[pageNumber + "-" + pageSize]) return;
    dispatch({
      type: IS_LOADING,
    });
    const paginatedOrders = await loadPaginatedOrdersForUserFromServer(
      pageNumber,
      pageSize
    );
    dispatch({
      type: LOAD_PAGINATED_ORDERS_FOR_USER,
      payload: {
        pageNumber,
        pageSize,
        items: paginatedOrders.items,
      },
    });
    dispatch({
      type: UPDATE_TOTAL_ITEMS,
      payload: { type: "orders", totalItems: paginatedOrders.totalItems },
    });
    dispatch({
      type: UPDATE_TOTAL_PAGES,
      payload: { type: "orders", totalPages: paginatedOrders.totalPages },
    });
    dispatch({
      type: NOT_LOADING,
    });
  };
