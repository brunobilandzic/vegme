const { Order } = require("../models/order");
const { Meal } = require("../models/meal");
const {CookRoleUser} = require("../models/user")
const checkIfSameMeal = async () => {
  const orders = await Order.find().populate({
    path: "meals",
    populate: {
      path: "cook",
      populate: {
        path: "user"
      },
    },
  });
  const order = orders[Math.floor(Math.random() * orders.length)];

  const cookId = order.meals[0]?.cook.id
  console.log((cookId));
  const isSame = order.meals.every((meal) => meal.cook.id == cookId);
  console.log(isSame);
};

const listMeals = async () => {
  
}

module.exports = {
  checkIfSameMeal,
};
