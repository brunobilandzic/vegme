const mongoose = require("mongoose");
const { ADMINISTRATOR } = require("../constants/roles");
const HttpError = require("../errors/http-error");
const { AdminRoleUser, BaseUser } = require("../models/user");

const getAllAdmins = async (req, res, next) => {
  let adminIds, admins;

  try {
    adminIds = await AdminRoleUser.find();
    console.log(adminIds);
    adminIds = adminIds.map((ai) =>
      mongoose.Types.ObjectId(ai.user).toString()
    );
    console.log("hello");
    console.log(adminIds);
    admins = await BaseUser.find({ _id: { $in: adminIds } });
  } catch (error) {
    return next(new HttpError("Cannot find admins."));
  }

  res.json(admins);
};

const createAdmin = async (req, res, next) => {
  let adminRoleUser, user;
  try {
    user =  await BaseUser.register(
      req.body,
      req.body.password
    );
    await user.save();
    console.log(user);
    adminRoleUser = await addToAdmin(user.id);
  } catch (error) {
    return next(new HttpError("Cannot add user to admin role."));
  }
  res.json(adminRoleUser);
};

const addToAdmin = async (userId) => {
  let adminRoleUser;
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    let user = await BaseUser.findById(userId);
    user.roleNames.push(ADMINISTRATOR);
    console.log(user);
    adminRoleUser = new AdminRoleUser({ user: userId });

    await user.save({ session: sess });
    await adminRoleUser.save({ session: sess });

    await sess.commitTransaction();
  } catch (error) {
    throw new HttpError("Cannot add that user to the admin role.");
  }

  return adminRoleUser;
};

module.exports = {
  getAllAdmins,
  createAdmin,
};
