import { ADD_MEAL_TO_CART, REMOVE_MEAL_FROM_CART } from "../types";

const initialState = {
    orderedMeals: []
}

export default function cartReducer(state= initialState, action) {
    switch (action.type) {
        case ADD_MEAL_TO_CART:
            return {
                ...state,
                orderedMeals: [...state.orderedMeals, action.payload]
            }         
            
        case REMOVE_MEAL_FROM_CART:
            return {
                ...state,
                orderedMeals: [...state.orderedMeals.filter(meal => meal._id != action.payload)]
            }
        default:
            return state;
    }
}