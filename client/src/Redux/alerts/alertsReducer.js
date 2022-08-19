import { LOAD_SINGLE_ALERT, LOAD_ALL_PAGINATED_ALERTS } from "../types";

const initialState = {
  alerts: {
    items: {}
  },
};

export default function alertsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL_PAGINATED_ALERTS:
      return {
        ...state,
        alerts: {
          ...state.alerts,
          items: {
            ...state.alerts.items,
            [action.payload.pageNumber + "-" + action.payload.pageSize]: action.payload.items
          }
        }
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
