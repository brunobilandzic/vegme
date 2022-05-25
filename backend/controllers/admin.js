const mongoose = require("mongoose");
const { ADMINISTRATOR } = require("../constants/roles");
const HttpError = require("../errors/http-error");
const { AdminRoleUser, BaseUser } = require("../models/user");

const getAllAdmins = async (req, res) => {
  const adminDocuments = await AdminRoleUser.find();
  const adminIds = adminDocuments.map((ai) => mongoose.Types.ObjectId(ai.user).toString());
  const admins = await BaseUser.find({ _id: { $in: adminIds } });

  res.json(admins);
};

const createAdmin = async (req, res, next) => {
  let user
  try {
     user = await BaseUser.register(req.body, req.body.password);
  } 
  catch (error) {
   return next(new HttpError("User with that username already exists."))
  }
  let adminRoleUser = await addToAdmin(user.id);

  res.json(adminRoleUser);
};

const addToAdmin = async (userId) => {
  let user = await BaseUser.findById(userId);
  let adminRoleUser = new AdminRoleUser({ user: userId });
  user.roles.push({ name: ADMINISTRATOR, id: adminRoleUser.id });

  await user.save();
  await adminRoleUser.save();

  return adminRoleUser;
};

module.exports = {
  getAllAdmins,
  createAdmin,
};
