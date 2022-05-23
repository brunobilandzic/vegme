const { PaginatedList } = require("../helpers/pagination.js");
const HttpError = require("../errors/http-error.js");
const { Order } = require("../models/order.js");
const { default: mongoose } = require("mongoose");
const { Meal } = require("../models/meal.js");
const { CustomerRoleUser } = require("../models/user.js");

const getAllOrders = async (req, res, next) => {
  let ordersWithPagination;
  try {
    ordersWithPagination = await PaginatedList.getPaginatedResult(Order.find().populate({path: "meals", select: "-orders -__v"}));
  } catch (error) {
    return next(new HttpError("Cannot find orders."));
  }

  res.json(ordersWithPagination);
};

const createOrder = async (req, res, next) => {
  let newOrder;
  try {
    const sess = await mongoose.startSession();
   
    sess.startTransaction()

    newOrder = new Order(req.body);
    req.body.meals.forEach(async (mealId) => {
      const meal = await Meal.findById(mealId);
      meal.orders.push(newOrder.id)
      await meal.save({session: sess})
      
    });
    const customer = await CustomerRoleUser.findOne({user: req.user.id})
    console.log(customer)
    customer.orders.push(newOrder.id)
    newOrder.customer = customer.id
    await customer.save({session: sess})
    await newOrder.save({ session: sess });
    await sess.commitTransaction()
  } catch (error) {
    return next(new HttpError("Cannot create new order."));
  }

  res.json({newOrder});
};

module.exports = {
  getAllOrders,
  createOrder,
};
