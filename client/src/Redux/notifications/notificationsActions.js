import { LOAD_SINGLE_NOTIFICATION } from "../types";

export const newNotification = (notification) => (dispatch) => {
  dispatch({
    type: LOAD_SINGLE_NOTIFICATION,
    payload: notification,
  });
};
