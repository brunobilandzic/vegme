import { LOAD_ALL_NOTIFICATIONS, LOAD_SINGLE_NOTIFICATION } from "../types";

const initialState = {
    notifications: []
}

export default function notificationsReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ALL_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload
            }
        case LOAD_SINGLE_NOTIFICATION:
            return{
                ...state,
                notifications: [action.payload, ...state.notifications]
            }  
        default:
            return state;
    }
}