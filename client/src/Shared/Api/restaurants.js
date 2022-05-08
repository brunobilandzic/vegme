const { default: axios } = require("axios")

const getAllRestaurants = async () => {
    const response = await axios.get("http://localhost:5000/api/restaurants", {withCredentials: true})
    return response.data.allRestaurants
}
module.exports = {getAllRestaurants}