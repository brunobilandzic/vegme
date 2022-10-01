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
const { sendAlert } = require("../helpers/alert.js");

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
  if (!cook.allowed_order_times.includes(req.body.order_time)) {
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

  await sendAlert(
    CookRoleUser,
    `${
      client.user.username
    } made an order with remark ${newOrder.remark?.substring(0, 10)}.`,
    cook.id,
    req.app.io
  );

  res.json(newOrder);
};

const appendMealsToOrder = async (req, res, next) => {
  const { orderId, mealIds } = req.body;
  const order = await Order.findById(orderId);

  const regular = await RegularRoleUser.findOne({ user: req.user.id }).populate(
    { path: "user" }
  );
  const regularId = regular.id;

  if (order.orderer != regularId) {
    return res.json({
      error: `Order ${order.remark} orderer not the same as issuer.`,
    });
  }

  const meals = await Meal.find({ _id: { $in: mealIds } });

  let mealWithDifferentCook = null;
  let mealAlreadyInOrder = null;

  meals.forEach((meal) => {
    if (meal.cook.toString() != order.cook.toString()) {
      mealWithDifferentCook = meal;
      return;
    }
    if (order.meals.includes(meal.id)) {
      mealAlreadyInOrder = meal;
      return;
    }
    meal.orders.push(orderId);
    order.meals.push(meal.id);
  });

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

  await meals.forEach(async (meal) => {
    await meal.save();
  });
  await order.save();

  await sendAlert(
    CookRoleUser,
    `${regular.user.username} appended ${meals?.length} meals to order ${order.remark}.`,
    order.cook,
    req.app.io
  );

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

  const regular = await RegularRoleUser.findOne({ user: req.user.id });
  const regularId = regular.id;

  if (order.orderer != regularId) {
    return res.json({
      error: `Order ${order.remark} orderer not the same as issuer.`,
    });
  }

  const meal = await Meal.findById(mealId);

  order.meals.pull(mealId);
  meal.orders.pull(orderId);

  const orderer = await BaseUser.findById(req.user.id);

  await sendAlert(
    CookRoleUser,
    `${orderer.username} removed ${meal.name} from ${order.remark}`,
    order.cook,
    req.app.io
  );

  await order.save();
  await meal.save();

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

const updateOrderRegular = async (req, res, next) => {
  const regular = await RegularRoleUser.findOne({ user: req.user.id });
  const regularId = regular.id;
  const order = await Order.findById(req.body._id);
  const cook = await CookRoleUser.findById(order.cook);

  if (order.orderer != regularId) {
    return next(new HttpError(`Orderer not same as request issuer!`, 403));
  }

  if (!allowEditTime(order.order_time, cook.edit_time_allowance)) {
    req.body.order_time = order.order_time;
  }

  const newOrder = await Order.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  });

  await sendAlert(
    CookRoleUser,
    `${regular.username} updated ${order.remark?.substring(0,10)} ${
      order.remark != newOrder.remark &&( "to " + newOrder.remark?.substring(0,10))
    }.`,
    order.cook,
    req.app.io
  );

  res.json(newOrder);
};

const editOrderPrompt = async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);
  const cook = await CookRoleUser.findById(order.cook);
  const diff = allowEditTime(order.order_time, cook.edit_time_allowance);

  res.json({
    diff,
    edit_time_allowance: cook.edit_time_allowance,
  });
};

const allowEditTime = (old_order_time, edit_time_allowance) => {
  const today = new Date();
  let todayDow = today.getDay();
  let diff = 0;

  if (todayDow == old_order_time) {
    diff = 7;
  } else if (todayDow - old_order_time > 0) {
    diff = old_order_time - 1 + 6 - todayDow;
  } else {
    diff = old_order_time - todayDow - 1;
  }

  console.log(old_order_time, diff, edit_time_allowance);

  return diff;
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
  updateOrderRegular,
  editOrderPrompt,
};
