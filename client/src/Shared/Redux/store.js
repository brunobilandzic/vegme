import {configureStore} from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import { applyMiddleware, compose } from "redux"
import rootReducer from "./reducers"

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default configureStore(
    {
        reducer: rootReducer,
        // middleware: [thunk],
        // enhancers: composeEnchancers([applyMiddleware])
    }
)