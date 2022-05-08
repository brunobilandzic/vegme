const { PaginatedList } = require("../helpers/pagination.js");
const HttpError = require("../errors/http-error.js");
const { Meal } = require("../models/meal.js");
const { Restaurant } = require("../models/restaurant.js");
const mongoose = require("mongoose");
const url = require("url");
const { extractFiltersFromQuery } = require("../helpers/extractFilters.js");

const getAllPaginatedMeals = async (req, res, next) => {
  const queryObject = url.parse(req.url, true).query;
  const mealsWithPagination = await PaginatedList.getPaginatedResult(
    Meal.find(extractFiltersFromQuery(queryObject)),
    queryObject.pageNumber,
    queryObject.pageSize
  );
  res.json({ mealsWithPagination });
};


const getAllMeals = async (req, res, next) => {
  const queryObject = url.parse(req.url, true).query;
  const allMeals = await Meal.find(extractFiltersFromQuery(queryObject))
  res.json({allMeals})
}

const createMeal = async (req, res, next) => {
  let newMeal
  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()

    const restaurant = await Restaurant.findById(req.body.restaurant)
    newMeal = new Meal(req.body);
    restaurant.meals.push(newMeal.id)
    await newMeal.save({session:sess});
    await restaurant.save({session:sess})

    await sess.commitTransaction()
  } catch (error) {
    return next(new HttpError("Cannot create meal."));
  }

  res.json({newMeal});
};


module.exports = {
    getAllMeals,
    createMeal
}