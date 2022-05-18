import {combineReducers} from "redux"

import authReducer from "./auth"
import restaurantsReducer from "./restaurants"
import paginationReducer from "./pagination"

export default combineReducers({
    auth: authReducer,
    restaurants: restaurantsReducer,
    pagination: paginationReducer
})