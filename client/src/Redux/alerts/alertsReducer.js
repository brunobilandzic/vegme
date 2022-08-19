import { LOAD_SINGLE_ALERT, LOAD_ALL_ALERTS } from "../types";

const initialState = {
  alerts: [],
};

export default function alertsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL_ALERTS:
      return {
        ...state,
        alerts: action.payload.map((alert) => {
          if (alert.seen) {
            return {
              ...alert,
              seen: true,
            };
          } else {
            return {
              ...alert,
              seen: false,
            };
          }
        }),
      };
    case LOAD_SINGLE_ALERT:
      return {
        ...state,
        alerts: [action.payload, ...state.alerts],
      };
    default:
      return state;
  }
}
