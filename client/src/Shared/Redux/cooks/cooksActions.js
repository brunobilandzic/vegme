import { loadAllCooksFromServer } from "../../Api/cooks";
import { IS_LOADING, LOAD_ALL_COOKS, NOT_LOADING } from "../types";

export const loadAllCooks = () => async (dispatch, getState) => {
  if (getState().cooks.allCooks) return;
  dispatch({ type: IS_LOADING });
  dispatch({
    type: LOAD_ALL_COOKS,
    payload: await loadAllCooksFromServer(),
  });
  dispatch({ type: NOT_LOADING });
};
