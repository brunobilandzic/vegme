const { PaginatedList } = require("../helpers/pagination.js");
const HttpError = require("../errors/http-error.js");
const { BaseUser } = require("../models/user.js");
const { addToCustomerRole } = require("./customer.js");
const passport = require("passport");

const getAllUsers = async (req, res, next) => {
  let usersWithPagination;
  try {
    usersWithPagination = await PaginatedList.getPaginatedResult(
      BaseUser.find()
    );
  } catch (error) {
    return next(new HttpError("Cannot find users"));
  }
  res.json(usersWithPagination);
};

const createNewUser = async (req, res, next) => {
  let createdUser;

  try {
    createdUser = await BaseUser.register(req.body, req.body.password);
    await addToCustomerRole(createdUser.id);
  } catch (error) {
    return next(new HttpError("Failed to create user"));
  }

  createdUser = await BaseUser.findById(createdUser.id);

  passport.authenticate("local")(req, res, () => {
    return res.json(createdUser);
  });
};

module.exports = {
  getAllUsers,
  createNewUser,
};
