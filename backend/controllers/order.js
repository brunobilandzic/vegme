const { PaginatedList, needNewPage } = require("../helpers/pagination.js");
const { Order } = require("../models/order.js");
const { Meal } = require("../models/meal.js");
const url = require("url");
const { RegularRoleUser, BaseUser } = require("../models/user.js");
const { extractFiltersFromQuery } = require("../helpers/extractFilters.js");
const { REGULAR } = require("../constants/roles.js");

const getAllPaginatedOrdersForUser = async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const ordererBaseUser = await BaseUser.findById(req.user.id);
  const regularId = ordererBaseUser.roles.find(
    (role) => role.name === REGULAR
  )?.id;
  const ordersWithPagination = await PaginatedList.getPaginatedResult(
    Order.find(
      extractFiltersFromQuery(queryObject, { orderer: regularId })
    ).populate({
      path: "meals",
      select: "-orders -__v",
    }),
    Number(queryObject.pageNumber),
    Number(queryObject.pageSize),
    {date_ordered: -1}
  );

  res.json(ordersWithPagination);
};

const getAllPaginatedOrders = async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const ordersWithPagination = await PaginatedList.getPaginatedResult(
    Order.find(extractFiltersFromQuery(queryObject)).populate({
      path: "meals",
      select: "-orders -__v",
    }),
    Number(queryObject.pageNumber),
    Number(queryObject.pageSize)
  );

  res.json(ordersWithPagination);
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find();

  res.json(orders);
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

const toggleOrderActive = async (req, res, next) => {
  const order = await Order.findById(req.params.order);
  order.active = !order.active;
  order.save();

  res.json({ active: order.active });
};

const needNewPageMyOrder = async (req, res) => {
  const ordererBaseUser = await BaseUser.findById(req.user.id);
  const regularId = ordererBaseUser.roles.find(
    (role) => role.name === REGULAR
  )?.id;
  res.send(
    await needNewPage(
      Order.find({ orderer: regularId }),
      parseInt(req.params.pageSize)
    )
  );
};

module.exports = {
  getAllPaginatedOrdersForUser,
  getAllPaginatedOrders,
  createOrder,
  toggleOrderActive,
  getAllOrders,
  needNewPageMyOrder,
};
