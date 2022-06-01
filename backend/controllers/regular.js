const url = require("url");
const { PaginatedList } = require("../helpers/pagination.js");

const { REGULAR } = require("../constants/roles.js");
const { RegularRoleUser, BaseUser } = require("../models/user.js");

const getAllRegularUsers = async (req, res) => {
  const queryObject = url.parse(req.url, true).query;

  const regularsPaginatedList = await PaginatedList.getPaginatedResult(
    RegularRoleUser.find(),
    Number(queryObject.pageNumber),
    Number(queryObject.pageSize)
  );

  res.status(200).json(regularsPaginatedList);
};

const createRegular = async (req, res) => {
  let user
  try {
    user = await BaseUser.register(req.body, req.body.password);
  } catch (error) {
    return next(new HttpError("User with that username already exists."))
  }
  const createdRegularRoleUser = await addToRegularRole(user.id);

  res.json(createdRegularRoleUser);
};

const addToRegularRole = async (userId) => {
  const user = await BaseUser.findById(userId);

  const createdRegularRoleUser = new RegularRoleUser({ user: userId });
  user.roles.push({ name: REGULAR, id: createdRegularRoleUser.id });

  await user.save();
  await createdRegularRoleUser.save();

  return createdRegularRoleUser;
};

module.exports = {
  getAllRegularUsers,
  createRegular,
  addToRegularRole,
};
