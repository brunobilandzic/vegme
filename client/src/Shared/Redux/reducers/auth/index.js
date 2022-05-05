import { LOGOUT, LOG_IN_THE_USER } from "../../types";
const initialState = {
  user: null,
};
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOG_IN_THE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
       return {
         ...state,
         user: null
       }
    default:
      return state;
  }
}
