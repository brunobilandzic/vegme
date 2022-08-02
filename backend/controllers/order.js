const { PaginatedList, needNewPage } = require("../helpers/pagination.js");
const { Order } = require("../models/order.js");
const { Meal } = require("../models/meal.js");
const url = require("url");
const {
  RegularRoleUser,
  BaseUser,
  CookRoleUser,
} = require("../models/user.js");
const { extractFiltersFromQuery } = require("../helpers/extractFilters.js");
const { REGULAR } = require("../constants/roles.js");
const HttpError = require("../errors/http-error.js");
const { default: mongoose } = require("mongoose");

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
    }).populate({
      path: "cook",
      select: "user",
      populate: {
        path: "user",
        select: "username -_id"
      }

    }),
    Number(queryObject.pageNumber),
    Number(queryObject.pageSize),
    { date_ordered: -1 }
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

const getAllOrdersForUser = async (req, res) => {
  const regular = await RegularRoleUser.findOne({ user: req.user.id });
  const regularId = regular.id;
  const orders = await Order.find({ orderer: regularId });
  res.json(orders);
};

const getAllOrdersForCook = async (req, res) => {
  const orders = await Order.find({ cook: req.params.cook });
  res.json(orders);
};

const getAllPersonalOrdersForCook = async (req, res) => {
  const mealIds = req.query.mealIds.split(",");
  const regular = await RegularRoleUser.findOne({ user: req.user.id });
  const regularId = regular.id;
  let orders = await Order.find({
    $and: [{ cook: req.query.cookId }, { orderer: regularId }],
  });
  mealIds.forEach((mealId) => {
    orders.forEach((order) => {
      if (order.meals.includes(mealId)){
        orders = orders.filter((o) => o.id != order.id);}
    });
  });
  res.json(orders);
};

const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  req.body.meals?.forEach(async (mealId) => {
    const meal = await Meal.findById(mealId);
    meal.orders.push(newOrder.id);
    await meal.save();
  });
  const cook = await CookRoleUser.findById(req.body.cook);
  cook.orders.push(newOrder.id);

  const client = await RegularRoleUser.findOne({ user: req.user.id });

  client.orders.push(newOrder.id);
  newOrder.orderer = client.id;

  await client.save();
  await newOrder.save();
  await cook.save()
  res.json(newOrder);
};

const addMealToOrder = async (req, res, next) => {
  const order = await Order.findById(req.body.orderId);
  let requestFail = false;
  let mealCount = 0;
  await req.body.mealIds?.forEach(async (mealId, index) => {
    const meal = await Meal.findById(mealId);
    if (order.meals.includes(mealId)) {
      requestFail = true;
      return next(
        new HttpError(`Meal ${meal.name} already in that order.`, 400)
      );
    }
    if (order.cook.toString() != meal.cook.toString()) {
      requestFail = true;
      return next(
        new HttpError(
          `Meal ${meal.name} cook and order ${order.remark} cook not the same`,
          400
        )
      );
    }
    meal?.orders.push(order.id);
    order?.meals.push(meal.id);
    mealCount = index;
    await order.save();
    await meal.save();

    res.json(order)
  });

  if (mealCount == req.body.mealIds.length) {
    console.log("in");
    res.json(order);
  }
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
  getAllOrdersForUser,
  getAllOrdersForCook,
  getAllPersonalOrdersForCook,
  addMealToOrder,
};
