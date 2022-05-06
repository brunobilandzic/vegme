const { PaginatedList } = require("../helpers/pagination");
const HttpError = require("../errors/http-error");
const { Restaurant } = require("../models/restaurant.js");
const { default: mongoose } = require("mongoose");
const { RestaurantOwnerRoleUser } = require("../models/user");

const getAllRestaurants = async (req, res, next) => {
  let restaurantsWithPagination;
  try {
    restaurantsWithPagination = await PaginatedList.getPaginatedResult(
      Restaurant.find()
    );
  } catch (error) {
    return next(new HttpError("Cannot find restaurants."));
  }

  res.json(restaurantsWithPagination);
};

const createRestaurant = async (req, res, next) => {
  let newRestaurant, owner;
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

module.exports = {
  getAllRestaurants,
  createRestaurant,
};
