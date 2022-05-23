const url = require("url");
const { PaginatedList } = require("../helpers/pagination.js");
const HttpError = require("../errors/http-error.js");

const { REGULAR } = require("../constants/roles.js");
const { RegularRoleUser, BaseUser } = require("../models/user.js");
const mongoose = require("mongoose");

const getAllRegularUsers = async (req, res, next) => {
  const queryObject = url.parse(req.url, true).query;

  let regularsPaginatedList;
  try {
    regularsPaginatedList = await PaginatedList.getPaginatedResult(
      RegularRoleUser.find(),
      queryObject.pageNumber,
      queryObject.pageSize
    );
  } catch (error) {
    return next(new HttpError("Failed to fetch customers.", 500));
  }

  res.status(200).json(regularsPaginatedList);
};

const createRegular = async (req, res, next) => {
  let createdRegularRoleUser;
  try {
    let user = await BaseUser.register(req.body, req.body.password);
    createdRegularRoleUser = await addToRegularRole(user.id);
  } catch (error) {
    return next(new HttpError("Cannot add that user to the customer role."));
  }

  res.json(createdRegularRoleUser);
};

const addToRegularRole = async (userId) => {
  let createdRegularRoleUser;
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    const user = await BaseUser.findById(userId);
    
    createdRegularRoleUser = new RegularRoleUser({ user: userId });
    user.roles.push({name: REGULAR, id: createdRegularRoleUser.id})
    

    await user.save({ session: sess });
    await createdRegularRoleUser.save({ session: sess });
    
    await sess.commitTransaction();
  } catch (error) {
    throw new HttpError("Cannot add user to the customer role.");
  }
  return createdCustomerRoleUser;
};

module.exports = {
  getAllRegularUsers,
  createRegular,
  addToRegularRole,
};
