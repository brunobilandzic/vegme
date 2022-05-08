const { getAllRestaurants } = require("../../Api/restaurants")
const { LOAD_RESTAURANTS } = require("../types")

const loadAllRestaurants = () => async dispatch => {
    const allRstaurants = await getAllRestaurants()
    dispatch({type: LOAD_RESTAURANTS, payload: allRstaurants})
}

export {loadAllRestaurants}