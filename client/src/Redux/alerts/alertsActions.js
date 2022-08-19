import { loadAllPaginatedAlerts } from "../../Shared/Api/alerts";
import {
  IS_LOADING,
  LOAD_ALL_PAGINATED_ALERTS,
  LOAD_SINGLE_ALERT,
  NOT_LOADING,
  UPDATE_TOTAL_ITEMS,
  UPDATE_TOTAL_PAGES,
} from "../types";

export const newAlert = (alertData) => (dispatch) => {
  dispatch({
    type: LOAD_SINGLE_ALERT,
    payload: alertData,
  });
};

export const loadAllAlerts =
  (pageNumber = 1, pageSize = 5) =>
  async (dispatch, getState) => {
    if (getState().alerts.alerts.items[pageNumber + "-" + pageSize]) return;
    dispatch({
      type: IS_LOADING,
    });
    const allPaginatedAlerts = await loadAllPaginatedAlerts(
      pageNumber,
      pageSize
    );
    console.log(allPaginatedAlerts);
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
