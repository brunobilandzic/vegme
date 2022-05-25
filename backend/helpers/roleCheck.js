const {
  CUSTOMER,
  RESTAURANT_OWNER,
  ADINISTRATOR,
  COOK,
} = require("../constants/roles");
const HttpError = require("../errors/http-error");
const { BaseUser } = require("../models/user");

const isInRole = async (userId, roleName) => {
  const user = await BaseUser.findById(userId);
  return user.roles.map(r => r.name).includes(roleName);
};
const requireLogin = (req, res, next) => {
  return req.user
    ? next()
    : next(new HttpError("You have to log in to continue.", 401));
};

const requireCustomer = async (req, res, next) => {
  return isInRole(req.user.id, CUSTOMER)
    ? next()
    : res
        .status(401)
        .json({ message: "You have to be a customer to access this." });
};

const requireCook = async (req, res, next) => {
  return isInRole(req.user.id, COOK)
    ? next()
    : res
        .status(401)
        .json({ message: "You have to be a cook to access this." });
};

const requireAdministrator = async (req, res, next) => {
  return isInRole(req.user.id, ADINISTRATOR)
    ? next()
    : res
        .status(401)
        .json({ message: "You have to bee administrator to access this." });
};
module.exports = {
  isInRole,
  requireCustomer,
  requireCook,
  requireLogin,
  requireAdministrator,
};
