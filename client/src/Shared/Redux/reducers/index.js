import {combineReducers} from "redux"

import authReducer from "./auth"
import paginationReducer from "./pagination"
import cartReducer from "./cart"


export default combineReducers({
    auth: authReducer,
    pagination: paginationReducer,
    cart: cartReducer
})