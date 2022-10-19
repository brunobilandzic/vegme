const url = require("url");
const { PaginatedList } = require("../helpers/pagination.js");

const { REGULAR } = require("../constants/roles.js");
const { RegularRoleUser, BaseUser } = require("../models/user.js");
const { Meal } = require("../models/meal");
const HttpError = require("../errors/http-error.js");

const getAllRegularUsers = async (req, res) => {
  const queryObject = url.parse(req.url, true).query;

  const regularsPaginatedList = await PaginatedList.getPaginatedResult(
    RegularRoleUser.find().populate({ path: "user" }),
    Number(queryObject.pageNumber),
    Number(queryObject.pageSize)
  );

  res.status(200).json(regularsPaginatedList);
};

const getRegularByUsername = async (req, res, next) => {
  const baseUser = await BaseUser.findOne({ username: req.params.username });
  if (!baseUser) {
    return next(
      new HttpError(
        `Could not find regular with username ${req.params.username}`,
        404
      )
    );
  }
  const regularId = baseUser.roles.find((r) => r.name === REGULAR).id;
  const regular = await RegularRoleUser.findById(regularId)
    .populate({ path: "favourite_meals" })
    .populate({ path: "orders" });

  if (regular) {
    res.json(regular);
  } else {
    next(
      new HttpError(
        `Could not find regular with username ${req.params.username}`,
        404
      )
    );
  }
};

const createRegular = async (req, res) => {
  let user;
  try {
    user = await BaseUser.register(req.body, req.body.password);
  } catch (error) {
    return next(new HttpError("User with that username already exists."));
  }
  const createdRegularRoleUser = await addToRegularRole(user.id);

  res.json(createdRegularRoleUser);
};

const addToRegularRole = async (userId) => {
  const user = await BaseUser.findById(userId);

  const createdRegularRoleUser = new RegularRoleUser({ user: userId });
  user.roles.push({ name: REGULAR, id: createdRegularRoleUser.id });

  await user.save();
  await createdRegularRoleUser.save();

  return createdRegularRoleUser;
};

const getFavourites = async (req, res, next) => {
  const { username } = req.params;
  const queryObject = url.parse(req.url, true).query;

  const baseUser = await BaseUser.findOne({ username });
  if (!baseUser)
    return next(
      new HttpError(`Can not find user with username ${username}`, 404)
    );

  const regular = await RegularRoleUser.findOne({ user: baseUser.id });

  if (!regular)
    return next(
      new HttpError(`Can not find user with username ${username}`, 404)
    );

  console.log(regular.favourite_meals.length);

  const favouriteMealsTest = await Meal.find({
    _id: { $in: regular.favourite_meals },
  });

  console.log(favouriteMealsTest.length);

  const favouriteMeals = await PaginatedList.getPaginatedResult(
    Meal.find({ _id: { $in: regular.favourite_meals } }),
    Number(queryObject.pageNumber),
    Number(queryObject.pageSize)
  );

  res.json(favouriteMeals);
};

module.exports = {
  getAllRegularUsers,
  createRegular,
  addToRegularRole,
  getRegularByUsername,
  getFavourites,
};
