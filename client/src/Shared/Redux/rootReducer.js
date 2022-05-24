import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import cartReducer from "./cart/cartReducer";
import paginationReducer from "./pagination/paginationReducer";

export default combineReducers(
{
    auth: authReducer,
    pagination: paginationReducer,
    cart: cartReducer
}
)