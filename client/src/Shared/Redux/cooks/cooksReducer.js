import { LOAD_ALL_COOKS } from "../types";

const initialState = {
  allCooks: null,
};

export default function cooksReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL_COOKS:
      return {
        ...state,
        allCooks: action.payload,
      };
    default:
      return state;
  }
}
