import { getRegularId } from "../../../util/helper";
import {
  createOrder,
  loadPaginatedOrdersForUserFromServer,
} from "../../Api/orders";
import {
    DONT_NEED_TO_REFRESH,
  LOAD_PAGINATED_ORDERS_FOR_USER,
  NEED_REFRESH,
  SEND_ORDER,
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
    dispatch({ type: SEND_ORDER, payload: newOrder });
    dispatch({type: NEED_REFRESH})
  };

export const loadPaginatedOrdersForUser =
  (pageNumber = 1, pageSize = 5) =>
  async (dispatch, getState) => {
      console.log(!getState().pagination.needToRefresh)
    if (getState().orders.browsing.items[pageNumber + "-" + pageSize] && !getState().pagination.needToRefresh) return;
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
    dispatch({ type: UPDATE_TOTAL_ITEMS, payload: paginatedOrders.totalItems });
    dispatch({ type: UPDATE_TOTAL_PAGES, payload: paginatedOrders.totalPages });
    dispatch({type: DONT_NEED_TO_REFRESH})
  };
