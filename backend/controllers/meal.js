const { PaginatedList } = require("../helpers/pagination.js");
const { Meal } = require("../models/meal.js");
const url = require("url");
const { extractFiltersFromQuery } = require("../helpers/extractFilters.js");
const { RegularRoleUser } = require("../models/user.js");

const getAllPaginatedMeals = async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const mealsWithPagination = await PaginatedList.getPaginatedResult(
    Meal.find(extractFiltersFromQuery(queryObject)),
    queryObject.pageNumber,
    queryObject.pageSize
  );
  res.json(mealsWithPagination);
};

const getAllMeals = async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const allMeals = await Meal.find(extractFiltersFromQuery(queryObject));
  res.json({ allMeals });
};

const createMeal = async (req, res) => {
  let newMeal = new Meal(req.body);
  console.log(newMeal)
  console.log(req.body)
  newMeal.cook = req.user.id;
  const cook = await RegularRoleUser.findOne({ user: req.user.id });
  cook.cooks.push(newMeal.id);
  await newMeal.save();
  await cook.save();

  res.json(newMeal);
};

const getAllMealsForCook = async (req, res) => {
  const allMeals = await Meal.find({ cook: req.params.cook });
  res.json(allMeals);
};

module.exports = {
  getAllMeals,
  createMeal,
  getAllPaginatedMeals,
  getAllMealsForCook,
};
