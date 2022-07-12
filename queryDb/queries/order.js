const { Order } = require("../models/order");
const {Meal} = require("../models/meal")
const checkIfSameMeal = async () => {
  console.log(Order);
  const orders = await Order.find().populate({ path: "meals" });
  const order =  orders[Math.floor(Math.random() * orders.length)]
  const isSame = true
  const cookId = order.meals[0].cook
  order.meals.every(meal => meal.cook == cookId )
  console.log(isSame);
};

module.exports = {
  checkIfSameMeal,
};
