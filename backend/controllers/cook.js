const { default: mongoose } = require("mongoose");
const { COOK } = require("../constants/roles");
const HttpError = require("../errors/http-error");
const { PaginatedList } = require("../helpers/pagination");
const { orderMeals, orderByDateOrdered } = require("../helpers/sorting");
const { CookRoleUser, BaseUser } = require("../models/user");
const url = require("url");

const getOneCook = async (req, res) => {
  const cook = await CookRoleUser.findById(req.params.cookId);
  res.json(cook);
};

const getAllCooks = async (req, res) => {
  const cooksDocuments = await CookRoleUser.find();
  const cooksIds = cooksDocuments.map((cd) =>
    mongoose.Types.ObjectId(cd.user).toString()
  );

  const cooks = await BaseUser.find({ _id: { $in: cooksIds } });

  res.json(cooks);
};

const getAllCookRoles = async (req, res) => {
  const cookRoles = await CookRoleUser.find()
    .populate({ path: "user", select: "username name" })
    .populate({ path: "cooks" });
  res.json(cookRoles);
};

const createCook = async (req, res, next) => {
  let user;
  try {
    user = await BaseUser.register(req.body, req.body.password);
  } catch (error) {
    return next(new HttpError("User with that username already exists."));
  }

  const cookRoleUser = await addToCook(user.id);

  res.json(cookRoleUser);
};

const addToCook = async (userId, cook) => {
  let user = await BaseUser.findById(userId);
  let cookRoleUser = new CookRoleUser({
    user: userId,
    min_days_to_edit_order: cook.min_days_to_edit_order,
    order_times: cook.order_times,
  });
  user.roles.push({ name: COOK, id: cookRoleUser.id });

  await user.save();
  await cookRoleUser.save();

  return cookRoleUser;
};

const getAllMealsForCook = async (req, res, next) => {
  const queryObject = url.parse(req.url, true).query;

  const cook = await CookRoleUser.findOne({ user: req.user.id }).populate({
    path: "cooks",
    populate: {
      path: "orders",
      populate: {
        path: "cook",
        populate: {
          path: "user",
          select: "username",
        },
      },
    },
  });
  let mealsOrderArray = [];

  cook.cooks.forEach(async (meal) => {
    mealsOrderArray.push({
      meal: meal,
      orders: meal.orders.sort(orderByDateOrdered),
    });
  });
  mealsOrderArray.sort(orderMeals);
  const paginatedMealsOrderArray = PaginatedList.getPaginatedArray(
    mealsOrderArray,
    Number(queryObject.pageNumber),
    Number(queryObject.pageSize)
  );

  res.json(paginatedMealsOrderArray);
};

const getCookByUsername = async (req, res, next) => {
  const { username } = req.params;
  const user = await BaseUser.findOne({ username });
  const cook = await CookRoleUser.findById(
    user?.roles.find((role) => role.name === COOK).id
  )
    .populate({ path: "cooks", populate: "cook" })
    .populate({ path: "user" });
  res.json(cook);
};

module.exports = {
  getAllCooks,
  getAllCookRoles,
  createCook,
  addToCook,
  getAllMealsForCook,
  getCookByUsername,
  getOneCook,
};
