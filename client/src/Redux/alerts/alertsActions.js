import {
  fetchUnreadAlertsCount,
  loadAllPaginatedAlerts,
  readAlertsServer,
} from "../../Shared/Api/alerts";
import {
  IS_LOADING,
  LOAD_ALL_PAGINATED_ALERTS,
  NEW_ALERT,
  NOT_LOADING,
  READ_ALERTS,
  SET_UNREAD_ALERTS_COUNT,
  UPDATE_TOTAL_ITEMS,
  UPDATE_TOTAL_PAGES,
} from "../types";

export const newAlert = () => async (dispatch) => {
  dispatch({type: NEW_ALERT})
  dispatch({
    type: IS_LOADING,
  });
  const allPaginatedAlerts = await loadAllPaginatedAlerts(1, 5);
  dispatch({
    type: LOAD_ALL_PAGINATED_ALERTS,
    payload: { pageNumber: 1, pageSize: 5, items: allPaginatedAlerts.items },
  });
  dispatch({
    type: UPDATE_TOTAL_ITEMS,
    payload: {
      type: "alerts",
      totalItems: allPaginatedAlerts.totalItems,
    },
  });
  dispatch({
    type: UPDATE_TOTAL_PAGES,
    payload: {
      type: "alerts",
      totalPages: allPaginatedAlerts.totalPages,
    },
  });
  dispatch({
    type: NOT_LOADING,
  });
};

export const loadAllAlerts =
  (pageNumber = 1, pageSize = 5) =>
  async (dispatch, getState) => {
    if (getState().alerts.items[pageNumber + "-" + pageSize]) return;
    dispatch({
      type: IS_LOADING,
    });
    const allPaginatedAlerts = await loadAllPaginatedAlerts(
      pageNumber,
      pageSize
    );
    dispatch({
      type: LOAD_ALL_PAGINATED_ALERTS,
      payload: { pageNumber, pageSize, items: allPaginatedAlerts.items },
    });
    dispatch({
      type: UPDATE_TOTAL_ITEMS,
      payload: {
        type: "alerts",
        totalItems: allPaginatedAlerts.totalItems,
      },
    });
    dispatch({
      type: UPDATE_TOTAL_PAGES,
      payload: {
        type: "alerts",
        totalPages: allPaginatedAlerts.totalPages,
      },
    });
    dispatch({
      type: NOT_LOADING,
    });
  };

export const setUneradAlertsCount = () => async (dispatch) => {
  dispatch({
    type: SET_UNREAD_ALERTS_COUNT,
    payload: await fetchUnreadAlertsCount(),
  });
};

export const readAlertsRedux = (alertIds) => async (dispatch) => {
  const modifiedCount = await readAlertsServer(alertIds);
  dispatch({
    type: READ_ALERTS,
    payload: modifiedCount,
  });
};
