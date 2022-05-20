const { default: axios } = require("axios");

const getAllRestaurants = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/restaurants/all",
    { withCredentials: true }
  );
  return response.data.allRestaurants;
};

const getAllPaginatedRestaurants = async (pageNumber = 1, pageSize = 5) => {
  const response = await axios.get(
    `http://localhost:5000/api/restaurants?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      withCredentials: true,
    }
  );
  return response.data.restaurantsWithPagination;
};

const getSingleRestaurant = async (restaurantId) => {
  const response = await axios.get(
    `http://localhost:5000/api/restaurants/${restaurantId}`
  );
  return response.data.restaurant;
};
module.exports = { getAllRestaurants, getAllPaginatedRestaurants, getSingleRestaurant };
