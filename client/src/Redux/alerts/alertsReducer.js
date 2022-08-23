import {
  NEW_ALERT,
  LOAD_ALL_PAGINATED_ALERTS,
  READ_ALERTS,
  SET_UNREAD_ALERTS_COUNT,
} from "../types";

const initialState = {
  items: {},
  unreadAlertsCount: 0,
};

export default function alertsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL_PAGINATED_ALERTS:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.pageNumber + "-" + action.payload.pageSize]:
            action.payload.items,
        },
      };
    case NEW_ALERT:
      return {
        ...state,
        unreadAlertsCount: state.unreadAlertsCount + 1,
      };
    case READ_ALERTS:
      return {
        ...state,
        unreadAlertsCount: state.unreadAlertsCount - action.payload,
      };
    case SET_UNREAD_ALERTS_COUNT:
      return {
        ...state,
        unreadAlertsCount: action.payload
      }
    default:
      return state;
  }
}
