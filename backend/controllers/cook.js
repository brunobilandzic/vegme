const { default: mongoose } = require("mongoose");
const { COOK } = require("../constants/roles");
const HttpError = require("../errors/http-error");
const { CookRoleUser, BaseUser } = require("../models/user");

const getAllCooks = async (req, res) => {
  const cooksDocuments = await CookRoleUser.find();
  const cooksIds = cooksDocuments.map((cd) =>
    mongoose.Types.ObjectId(cd.user).toString()
  );
  const cooks = await BaseUser.find({ _id: { $in: cooksIds } });

  res.json(cooks);
};

const getAllCookRoles = async (req, res) => {
  const cookRoles = await CookRoleUser.find();
  res.json(cookRoles);
};

const createCook = async (req, res, next) => {
  let user;
  try {
    user = await BaseUser.register(req.body, req.body.password);
  } catch (error) {
    return next(new HttpError("User with that username already exists."));
  }

  const cookRoleUser = await addToCook(user.id);

  res.json(cookRoleUser);
};

const addToCook = async (userId) => {
  let user = await BaseUser.findById(userId);
  let cookRoleUser = new CookRoleUser({ user: userId });
  user.roles.push({ name: COOK, id: cookRoleUser.id });

  await user.save();
  await cookRoleUser.save();

  return cookRoleUser;
};
module.exports = {
  getAllCooks,
  getAllCookRoles,
  createCook,
  addToCook
};
