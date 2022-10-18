import { LOAD_PAGINATED_REGULARS } from "../types";

const initialState = {
        items: {
            
        }
    }

export default function regularReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_PAGINATED_REGULARS:          
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.pageNumber + "-" + action.payload.pageSize]: action.payload.items
                }
            }
        default:
            return state;
    }
}