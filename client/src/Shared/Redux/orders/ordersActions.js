import {
  createOrder,
  loadPaginatedOrdersForUserFromServer,
} from "../../Api/orders";
import { needNewPageOrder } from "../actionHelpers";
import {
  ADD_ON_END_ORDER,
  LOAD_PAGINATED_ORDERS_FOR_USER,
  MAKE_NEW_PAGE_ORDER,
  UPDATE_TOTAL_ITEMS,
  UPDATE_TOTAL_PAGES,
} from "../types";

export const sendOrder =
  (remark, deliveryAddress, active) => async (dispatch, getState) => {
    const order = {
      remark,
      delivery_address: deliveryAddress,
      active,
      meals: getState().meals.mealsToOrder?.map((meal) => meal._id),
    };
    const newOrder = await createOrder(order);
    switch (
      await needNewPageOrder(
        getState().orders.browsing.items[
          getState().pagination.orders.totalPages +
            "-" +
            getState().pagination.orders.pageSize
        ],
        getState().pagination.orders.pageSize
      )
    ) {
      case ADD_ON_END_ORDER:
        return dispatch({
          type: ADD_ON_END_ORDER,
          payload: {
            order: newOrder,
            pageNumber: getState().pagination.orders.totalPages,
            pageSize: getState().pagination.orders.pageSize,
          },
        });

      case MAKE_NEW_PAGE_ORDER:
        dispatch({
          type: MAKE_NEW_PAGE_ORDER,
          payload: {
            order: newOrder,
            pageNumber: getState().pagination.orders.totalPages + 1,
            pageSize: getState().pagination.orders.pageSize,
          },
        });
        dispatch({
          type: UPDATE_TOTAL_PAGES,
          payload: {
            type: "orders",
            totalPages: getState().pagination.orders.totalPages + 1,
          },
        });
        case UPDATE_TOTAL_PAGES:
          dispatch({
            type: UPDATE_TOTAL_PAGES,
            payload: {
              type: "orders",
              totalPages: getState().pagination.orders.totalPages + 1,
            },
          });
    }
  };

export const loadPaginatedOrdersForUser =
  (pageNumber = 1, pageSize = 5) =>
  async (dispatch, getState) => {
    if (getState().orders.browsing.items[pageNumber + "-" + pageSize]) return;
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
  };