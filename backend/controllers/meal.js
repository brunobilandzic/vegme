const { PaginatedList } = require("../helpers/pagination.js");
const HttpError = require("../errors/http-error.js");
const { Meal } = require("../models/meal.js");

const getAllMeals = async (req, res, next) => {
  const mealsWithPagination = await PaginatedList.getPaginatedResult(
    Meal.find()
  );
  res.status(200).json({ mealsWithPagination });
};

const createMeal = async (req, res, next) => {
  const newMeal = new Meal(req.body);
  try {
    await newMeal.save();
  } catch (error) {
    return next(new HttpError("Cannot create meal."));
  }

  res.json(newMeal);
};


module.exports = {
    getAllMeals,
    createMeal
}