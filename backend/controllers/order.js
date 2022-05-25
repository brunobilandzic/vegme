const { PaginatedList } = require("../helpers/pagination.js");
const { Order } = require("../models/order.js");
const { Meal } = require("../models/meal.js");
const url = require("url");
const { RegularRoleUser } = require("../models/user.js");
const { extractFiltersFromQuery } = require("../helpers/extractFilters.js");

const getAllOrders = async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const ordersWithPagination = await PaginatedList.getPaginatedResult(
    Order.find(extractFiltersFromQuery(queryObject)).populate({
      path: "meals",
      select: "-orders -__v",
    }),
    queryObject.pageNumber,
    queryObject.pageSize
  );

  res.json(ordersWithPagination);
};

const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  req.body.meals?.forEach(async (mealId) => {
    const meal = await Meal.findById(mealId);
    meal.orders.push(newOrder.id);
    await meal.save();
  });
  const client = await RegularRoleUser.findOne({ user: req.user.id });
  client.orders.push(newOrder.id);
  newOrder.orderer = client.id;

  await client.save();
  await newOrder.save();

  res.json(newOrder);
};

module.exports = {
  getAllOrders,
  createOrder,
};
