const { PaginatedList, needNewPage } = require("../helpers/pagination.js");
const { Meal, mealTypes } = require("../models/meal.js");
const url = require("url");
const { extractFiltersFromQuery } = require("../helpers/extractFilters.js");
const { CookRoleUser } = require("../models/user.js");

const getAllPaginatedMeals = async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const mealsWithPagination = await PaginatedList.getPaginatedResult(
    Meal.find(extractFiltersFromQuery(queryObject)).populate({
      path: "cook",
      populate: { path: "user" },
    }),
    Number(queryObject.pageNumber),
    Number(queryObject.pageSize),
    { date_created: -1 }
  );
  res.json(mealsWithPagination);
};

const getAllPaginatedSpecialMeals = async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const mealsWithPagination = await PaginatedList.getPaginatedResult(
    Meal.find(
      extractFiltersFromQuery(queryObject, { type: mealTypes.SPECIAL })
    ).populate({
      path: "cook",
      populate: { path: "user" },
    }),
    Number(queryObject.pageNumber),
    Number(queryObject.pageSize),
    { date_created: -1 }
  );
  res.json(mealsWithPagination)
};


const getAllMeals = async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const allMeals = await Meal.find(extractFiltersFromQuery(queryObject));
  res.json({ allMeals });
};

const createMeal = async (req, res) => {
  let newMeal = new Meal(req.body);
  const cook = await CookRoleUser.findOne({ user: req.user.id });
  newMeal.cook = cook.id;
  cook.cooks.push(newMeal.id);
  await newMeal.save();
  await cook.save();

  res.json(newMeal);
};

const getAllMealsForCook = async (req, res) => {
  const allMeals = await Meal.find({ cook: req.params.cook });
  res.json(allMeals);
};

const toggleOfferMeal = async (req, res) => {
  const meal = await Meal.findById(req.params.meal);
  meal.is_offered = !meal.is_offered;
  await meal.save();
};

const needNewPageMeal = async (req, res) => {
  res.send(await needNewPage(Meal.find(), parseInt(req.params.pageSize)));
};

module.exports = {
  getAllMeals,
  toggleOfferMeal,
  createMeal,
  getAllPaginatedMeals,
  getAllMealsForCook,
  needNewPageMeal,
  getAllPaginatedSpecialMeals
};
