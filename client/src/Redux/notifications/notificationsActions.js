import { LOAD_SINGLE_NOTIFICATION } from "../types";

export const newNotification = (notificationData) => (dispatch) => {
  const notification = {
    payload: notificationData,
    seen: false
  }
  dispatch({
    type: LOAD_SINGLE_NOTIFICATION,
    payload: notification,
  });
};
