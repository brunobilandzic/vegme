import { LOAD_ALL_PAGINATED_MEALS } from "../types";

const initialState = {
    items: {},
    pagination: false
}

export default function mealsReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ALL_PAGINATED_MEALS:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.pageNumber + "-" + action.payload.pageSize]: action.payload.items
                },
                pagination: true
            }
        default:
            return state;
    }
}