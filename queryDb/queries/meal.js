const { Meal } = require("../models/meal");

const queryFavourited = async () => {
  const meals = await Meal.find();
  const favourited = meals.filter(m => m.favourited_by.length != 0)
  console.log(favourited.length);
};

module.exports = {
    queryFavourited
}