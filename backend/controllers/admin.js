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
    const sess = await mongoose.startSession();
    sess.startTransaction();
    user = await BaseUser.findById(req.body.user);
    user.roleNames.push(ADMINISTRATOR);
    adminRoleUser = new AdminRoleUser(req.body);
    await user.save({ session: sess });
    await adminRoleUser.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    return next(new HttpError("Cannot add user to admin role."));
  }
  res.json(adminRoleUser);
};

module.exports = {
  getAllAdmins,
  createAdmin,
};
