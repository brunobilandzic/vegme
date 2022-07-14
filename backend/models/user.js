const mongoose = require("mongoose");
const PassportLocalMongoose = require("passport-local-mongoose");

const roleObject = {
  name: { type: String, required: true },
  id: { type: mongoose.Types.ObjectId },
};
const baseUserObject = {
  name: { type: String, required: true },
  googleId: { type: String },
  username: { type: String, required: true, validate: /^\S*$/ },
  email: { type: String },
  email_verified: { type: Boolean, default: false },
  date_registered: { type: Date, default: Date.now() },
  changed_username: { type: Boolean, default: true },
  roles: [roleObject],
};
const regularRoleUserObject = {
  user: {
    type: mongoose.Types.ObjectId,
    ref: "BaseUser",
    required: true,
    unique: true,
  },
  orders: [{ type: mongoose.Types.ObjectId, ref: "Order", default: [] }],
};
const cookRoleUserObject = {
  user: {
    type: mongoose.Types.ObjectId,
    ref: "BaseUser",
    required: true,
    unique: true,
  },
  cooks: [{ type: mongoose.Types.ObjectId, ref: "Meal" }],
  orders: [{ type: mongoose.Types.ObjectId, ref: "Order" }],
};
const adminRoleUserObject = {
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
};
const operatorRoleUserObject = {
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
};

const baseUserSchema = new mongoose.Schema(baseUserObject);
baseUserSchema.plugin(PassportLocalMongoose);
const BaseUser = mongoose.model("BaseUser", baseUserSchema);

const CookRoleUser = new mongoose.model(
  "CookRoleUser",
  new mongoose.Schema(cookRoleUserObject)
);

const RegularRoleUser = new mongoose.model(
  "RegularRoleUser",
  new mongoose.Schema(regularRoleUserObject)
);

const AdminRoleUser = mongoose.model(
  "AdminRoleUser",
  new mongoose.Schema(adminRoleUserObject)
);

const OperatorRoleUser = mongoose.model(
  "OperatorRoleUser",
  new mongoose.Schema(operatorRoleUserObject)
);

module.exports = {
  BaseUser,
  CookRoleUser,
  RegularRoleUser,
  AdminRoleUser,
  OperatorRoleUser,
};
