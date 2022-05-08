import {combineReducers} from "redux"

import authReducer from "./auth"
import restaurantsReducer from "./restaurants"

export default combineReducers({
    auth: authReducer,
    restaurants: restaurantsReducer
})