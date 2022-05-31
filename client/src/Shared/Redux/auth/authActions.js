import { loadUserFromServer, logoutUserFromServer } from "../../Api/auth";
import { LOGOUT, LOG_IN_THE_USER } from "../types";

const loadUser = () => async (dispatch, getState) => {
  if (getState().auth.is_logged_in) return;
  let responseData = await loadUserFromServer()
  dispatch({ type: LOG_IN_THE_USER, payload:responseData });
};

const logout = () => async (dispatch) => {
  await logoutUserFromServer()
  dispatch({ type: LOGOUT });
};

export { loadUser, logout };
