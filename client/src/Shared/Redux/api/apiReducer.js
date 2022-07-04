import { IS_LOADING, NOT_LOADING } from "../types";

const initialState = {
    isLoading: false
}


export default function apiReducer(state = initialState, action) {
    switch (action.type) {
        case IS_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case NOT_LOADING:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}