import { combineReducers } from "redux";
import apiReducer from "./api/apiReducer";
import authReducer from "./auth/authReducer";
import cooksReducer from "./cooks/cooksReducer";
import mealsReducer from "./meals/mealsReducer";
import ordersReducer from "./orders/ordersReducer";
import paginationReducer from "./pagination/paginationReducer";

export default combineReducers(
{
    auth: authReducer,
    pagination: paginationReducer,
    meals: mealsReducer,
    orders: ordersReducer,
    api: apiReducer,
    cooks: cooksReducer
}
)