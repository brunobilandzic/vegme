import { loadAllAlertsFromServer } from "../../Shared/Api/alerts";
import { LOAD_ALL_ALERTS, LOAD_SINGLE_ALERT } from "../types";

export const newAlert = (alertData) => (dispatch) => {
  dispatch({
    type: LOAD_SINGLE_ALERT,
    payload: alertData,
  });
};

export const loadAllAlerts = () => async (dispatch) => {
  const allAlerts = await loadAllAlertsFromServer();
  dispatch({
    type: LOAD_ALL_ALERTS,
    payload: allAlerts,
  });
};
