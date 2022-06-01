import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import mealsReducer from "./meals/mealsReducer";
import ordersReducer from "./orders/ordersReducer";
import paginationReducer from "./pagination/paginationReducer";

export default combineReducers(
{
    auth: authReducer,
    pagination: paginationReducer,
    meals: mealsReducer,
    orders: ordersReducer
}
)