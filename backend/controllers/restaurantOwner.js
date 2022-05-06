const url = require("url");
const { PaginatedList } = require("../helpers/pagination");
const HttpError = require("../errors/http-error");
const { RestaurantOwnerRoleUser, BaseUser } = require("../models/user");
const mongoose= require("mongoose");
const { RESTAURANT_OWNER } = require("../constants/roles");

const getAllRestaurantOwners = async (req, res, next) => {
  const queryObject = url.parse(req.url, true).query;
  let restaurantOwnersPaginatedList;
  let restaurantOwnersIds = await RestaurantOwnerRoleUser.find();
  restaurantOwnersIds = restaurantOwnersIds.map((ror) =>
    mongoose.Types.ObjectId(ror.user).toString()
  );

  try {
    restaurantOwnersPaginatedList = await PaginatedList.getPaginatedResult(
      BaseUser.find({ _id: { $in: restaurantOwnersIds } }),
      queryObject.pageNumber,
      queryObject.pageSize
    );
  } catch (error) {
    return next(new HttpError("Failed to fetch restaurant owner. 3"), 500);
  }

  return res.status(200).json({ restaurantOwnersPaginatedList });
};

const createRestaurantOwner = async (req, res, next) => {
  let newRestaurantOwnerRoleUser, user;
  console.log(req.body)
  try {
    user = await BaseUser.register(req.body, req.body.password)
    console.log(user)
    newRestaurantOwnerRoleUser = await addToRestaurantOwnerRole(user.id);
  } catch (error) {
    return next(new HttpError("Cannot add the user to restaurant owner role."));
  }

  res.json(newRestaurantOwnerRoleUser);
};

const addToRestaurantOwnerRole = async (userId) => {
  let newRestaurantOwnerRoleUser;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    const user = await BaseUser.findById(userId);
    user.roleNames.push(RESTAURANT_OWNER);
    newRestaurantOwnerRoleUser = new RestaurantOwnerRoleUser({user: userId});
    await newRestaurantOwnerRoleUser.save({ session: sess });
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    throw new HttpError("Failed to add to restaurant owner role.");
  }
  return newRestaurantOwnerRoleUser;
};

module.exports = {
  getAllRestaurantOwners,
  createRestaurantOwner,
  addToRestaurantOwnerRole
};
