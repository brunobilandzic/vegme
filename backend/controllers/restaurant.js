const { PaginatedList } = require("../helpers/pagination");
const url = require("url");
const HttpError = require("../errors/http-error");
const { Restaurant } = require("../models/restaurant.js");
const mongoose = require("mongoose");
const { RestaurantOwnerRoleUser } = require("../models/user");
const { extractFiltersFromQuery } = require("../helpers/extractFilters");

const getAllPaginatedRestaurants = async (req, res, next) => {
  let restaurantsWithPagination;
  const queryObject = url.parse(req.url, true).query;
  try {
    restaurantsWithPagination = await PaginatedList.getPaginatedResult(
      Restaurant.find()
        .populate([
          {
            path: "meals",
            select: "-_id -restaurant -__v",
          },
          {
            path: "owner",
            select: "name username -_id",
          },
        ])
        .select("-__v"),
      Number(queryObject.pageNumber),
      Number(queryObject.pageSize)
    );
  } catch (error) {
    return next(new HttpError("Cannot find restaurants."));
  }

  res.json({ restaurantsWithPagination });
};

const getAllRestaurants = async (req, res, next) => {
  const queryObject = url.parse(req.url, true).query;
  const allRestaurants = await Restaurant.find(
    extractFiltersFromQuery(queryObject)
  );

  res.json({ allRestaurants });
};

const createRestaurant = async (req, res, next) => {
  let newRestaurant;
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    newRestaurant = new Restaurant({ name: req.body.name, owner: req.user.id });
    const owner = await RestaurantOwnerRoleUser.findOne({ user: req.user.id });
    owner.restaurants.push(newRestaurant.id);
    await newRestaurant.save({ session: sess });
    await owner.save({ session: sess });

    await sess.commitTransaction();
  } catch (error) {
    return next(new HttpError("Cannot create restaurant."));
  }
  res.json(newRestaurant);
};

const getSingleRestaurant = async (req, res, next) => {
  let restaurant;
  try {
    restaurant = await Restaurant.findById(req.params.restaurantId)
      .populate([
        {
          path: "meals",
          select: "-_id -restaurant -__v",
        },
        {
          path: "owner",
          select: "name username -_id",
        },
      ])
      .select("-__v");
  } catch (error) {
    return next(new HttpError("Cannot find restaurant."));
  }

  res.json({ restaurant });
};

module.exports = {
  getAllRestaurants,
  createRestaurant,
  getAllPaginatedRestaurants,
  getSingleRestaurant,
};
