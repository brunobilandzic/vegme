import { LOGOUT, LOG_IN_THE_USER } from "../types";
const initialState = {
  user: null,
  is_logged_in: false
};
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOG_IN_THE_USER:
      return {
        ...state,
        user: action.payload,
        is_logged_in: true
      };
    case LOGOUT:
       return {
         ...state,
         user: null,
         is_logged_in: false
       }
    default:
      return state;
  }
}
