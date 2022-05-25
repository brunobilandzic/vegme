const { PaginatedList } = require("../helpers/pagination.js");
const HttpError = require("../errors/http-error.js");
const { Order } = require("../models/order.js");
const { default: mongoose } = require("mongoose");
const { Meal } = require("../models/meal.js");
const { CustomerRoleUser, RegularRoleUser } = require("../models/user.js");

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
  console.log(req.body)
  let newOrder;
  try {
    const sess = await mongoose.startSession();

    newOrder = new Order(req.body);
    req.body.meals?.forEach(async (mealId) => {
      console.log("r")
      const meal = await Meal.findById(mealId);
      meal.orders.push(newOrder.id)
      await sess.withTransaction(async () => {
        await meal.save()
      })
      console.log(meal)
    });
    const client = await RegularRoleUser.findOne({user: req.user.id})
    console.log(client)
    client.orders.push(newOrder.id)
    newOrder.ordered_by = customer.id
    const preparer = await RegularRoleUser.findOne({user: req.body.preparer})
    preparer.offers.push(newOrder.id)

    await preparer.save({session: sess})
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
