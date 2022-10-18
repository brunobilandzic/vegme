import { combineReducers } from "redux";
import alertsReducer from "./alerts/alertsReducer";
import apiReducer from "./api/apiReducer";
import authReducer from "./auth/authReducer";
import cooksReducer from "./cooks/cooksReducer";
import mealsReducer from "./meals/mealsReducer";
import ordersReducer from "./orders/ordersReducer";
import paginationReducer from "./pagination/paginationReducer";
import regularsReducer from "./regulars/regularsReducer"

export default combineReducers(
{
    auth: authReducer,
    pagination: paginationReducer,
    meals: mealsReducer,
    orders: ordersReducer,
    api: apiReducer,
    cooks: cooksReducer,
    alerts: alertsReducer,
    regulars: regularsReducer
}
)