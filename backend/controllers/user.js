const { PaginatedList } = require("../helpers/pagination.js");
const { BaseUser } = require("../models/user.js");
const passport = require("passport");
const { addToRegularRole } = require("./regular.js");

const getAllUsers = async (req, res) => {
  const usersWithPagination = await PaginatedList.getPaginatedResult(
    BaseUser.find()
  );

  res.json(usersWithPagination);
};

const createNewUser = async (req, res) => {
  let user;
  try {
    user = await BaseUser.register(req.body, req.body.password);
  } catch (error) {
    return next(new HttpError("User with that username already exists."));
  }

  await addToRegularRole(user.id);

  passport.authenticate("local")(req, res, () => {
    return res.json(user);
  });
};

module.exports = {
  getAllUsers,
  createNewUser,
};
