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
const { Alert } = require("../models/alert.js");

const getOneOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.orderId)
    .populate({
      path: "meals",
      select: "-orders",
    })
    .populate({ path: "cook", populate: { path: "user" } });
  if (!order) return next(new HttpError("Order not found", 404));
  res.json(order);
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

const getAllPaginatedOrdersForUser = async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const ordererBaseUser = await BaseUser.findById(req.user.id);
  const regularId = ordererBaseUser.roles.find(
    (role) => role.name === REGULAR
  )?.id;
  const ordersWithPagination = await PaginatedList.getPaginatedResult(
    Order.find(extractFiltersFromQuery(queryObject, { orderer: regularId }))
      .populate({
        path: "meals",
        select: "-orders -__v",
      })
      .populate({
        path: "cook",
        select: "user",
        populate: {
          path: "user",
          select: "username -_id",
        },
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
      if (order.meals.includes(mealId)) {
        orders = orders.filter((o) => o.id != order.id);
      }
    });
  });
  res.json(orders);
};

const createOrder = async (req, res, next) => {
  const cook = await CookRoleUser.findById(req.body.cook);
  if (!cook.order_times.includes(req.body.order_time)) {
    return next(new HttpError("Cook does not have specified order time!", 400));
  }
  const newOrder = new Order(req.body);
  req.body.meals?.forEach(async (mealId) => {
    const meal = await Meal.findById(mealId);
    meal.orders.push(newOrder.id);
    await meal.save();
  });
  cook.orders.push(newOrder.id);

  const client = await RegularRoleUser.findOne({ user: req.user.id }).populate({
    path: "user",
  });

  client.orders.push(newOrder.id);
  newOrder.orderer = client.id;

  await client.save();
  await newOrder.save();
  await cook.save();

  const cookSocketId = req.app.io.onlineUsers?.find(
    (ou) => ou.id === cook.user.toString()
  ).socketId;

  if (cookSocketId) {
    req.app.io.to(cookSocketId).emit("new-order", newOrder);
  }

  const newAlert = new Alert({
    user: cook.user,
    text: `${client.user.username} made an order ${newOrder.remark}.`,
  });

  const cookBaseUser = await BaseUser.findById(cook.user);
  cookBaseUser.alerts.push(newAlert.id);

  await cookBaseUser.save();
  await newAlert.save();

  res.json(newOrder);
};

const appendMealsToOrder = async (req, res, next) => {
  const { orderId, mealIds } = req.body;
  const order = await Order.findById(orderId);
  const meals = await Meal.find({ _id: { $in: mealIds } });

  let mealWithDifferentCook = null;
  let mealAlreadyInOrder = null;

  meals.forEach((meal) => {
    if (meal.cook.toString() != order.cook.toString()) {
      mealWithDifferentCook = meal;
      return;
    } else if (order.meals.includes(meal.id)) {
      mealAlreadyInOrder = meal;
      return;
    }
    meal.orders.push(orderId);
    order.meals.push(meal.id);
  });

  await meals.forEach(async (meal) => {
    await meal.save();
  });
  await order.save();

  if (mealWithDifferentCook) {
    return res.json({
      error: `Meal ${mealWithDifferentCook.name} has not the same cook as order ${order.remark}`,
    });
  }
  if (mealAlreadyInOrder) {
    return res.json({
      error: `Meal ${mealAlreadyInOrder.name} already in order ${order.remark}`,
    });
  }

  res.json(order);
};

const removeMealsFromOrder = async (req, res, next) => {
  const { orderId, mealIds } = req.body;
  const order = await Order.findById(orderId);

  mealIds.forEach((mealId) => {
    order.meals.pull(mealId);
  });

  await mealIds.forEach(async (mealId) => {
    const meal = await Meal.findById(mealId);

    meal.orders.pull(orderId);

    await meal.save();
  });

  await order.save();
  res.json(order);
};

const removeMealFromOrder = async (req, res, next) => {
  const { orderId, mealId } = req.body;
  const order = await Order.findById(orderId);
  const meal = await Meal.findById(mealId);

  order.meals.pull(mealId);
  meal.orders.pull(orderId);

  const cook = await CookRoleUser.findById(order.cook);
  const cookBaseUser = await BaseUser.findById(cook.user);
  const orderer = await BaseUser.findById(req.user.id);

  const newAlert = new Alert({
    user: cookBaseUser.id,
    text: `${orderer.username} removed ${meal.name} from ${order.remark}`,
  });
  cookBaseUser.alerts.push(newAlert.id);

  await order.save();
  await meal.save();
  await newAlert.save();
  await cookBaseUser.save();

  res.json(order);
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
  appendMealsToOrder,
  removeMealsFromOrder,
  getOneOrder,
  removeMealFromOrder,
};
