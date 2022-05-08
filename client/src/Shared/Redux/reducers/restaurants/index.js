import { LOAD_RESTAURANTS } from "../../types";

const initialState = {
    restaurants:[]
}

export default function restaurantReducer(state=initialState, action){
    switch (action.type) {
        case LOAD_RESTAURANTS:
            return {
                ...state,
                restaurants: action.payload
            }
        default:
            return state;
    }
}