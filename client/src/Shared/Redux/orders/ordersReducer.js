import { LOAD_PAGINATED_ORDERS_FOR_USER, SEND_ORDER } from "../types";

const initialState = {
    browsing: {
        items: {},
        pagination: false
    },
    sentOrders: []
}

export default function ordersReducer (state = initialState, action) {
    switch (action.type) {
        case SEND_ORDER:
            return {
                ...state,
                sentOrders: [...state.sentOrders, action.payload]
            }
        case LOAD_PAGINATED_ORDERS_FOR_USER:
            return {
                ...state,
                browsing: {
                    ...state.browsing,
                    items: {
                        ...state.browsing.items,
                        [action.payload.pageNumber + "-" + action.payload.pageSize]: action.payload.items,
                        pagination: true
                    },
                    pagination: true
                }
            }
    
        default:
            return state;
    }
}