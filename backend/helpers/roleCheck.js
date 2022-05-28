const { OPERATOR, ADINISTRATOR, COOK, REGULAR } = require("../constants/roles");
const HttpError = require("../errors/http-error");
const { BaseUser } = require("../models/user");

const isInRole = async (userId, roleName, next) => {
  if (typeof userId === "undefined") {
    return next(new HttpError("You have to log in to continue.", 401));
  }
  const user = await BaseUser.findById(userId);

  return user.roles.map((r) => r.name).includes(roleName);
};

const requireRegular = async (req, res, next) => {
  return isInRole(req.user?.id, REGULAR)
    ? next()
    : next(new HttpError("You have to be in regular role to access this.", 401)
      );
};

const requireOperator = async (req, res, next) => {
  return isInRole(req.user?.id, OPERATOR)
    ? next()
    : next(new HttpError("You have to be a operator to access this.", 401));
};

const requireCook = async (req, res, next) => {
  return isInRole(req.user?.id, COOK, next)
    ? next()
    : next(new HttpError("You have to be a cook to access this.", 401));
};

const requireAdministrator = async (req, res, next) => {
  return isInRole(req.user?.id, ADINISTRATOR)
    ? next()
    : next(new HttpError("You have to be a coadministratorok to access this.", 401));
};

module.exports = {
  isInRole,
  requireRegular,
  requireCook,
  requireAdministrator,
  requireOperator,
};
