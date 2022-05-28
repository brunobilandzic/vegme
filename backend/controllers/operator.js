const { BaseUser, OperatorRoleUser } = require("../models/user.js");
const HttpError = require("../errors/http-error");
const { OPERATOR } = require("../constants/roles.js");

const createNewOperator = async (req, res, next) => {
  let user
  try {
    user = await BaseUser.register(req.body, req.body.password);
  } catch (error) {
    return next(new HttpError("User with that username already exists."))
  }
  
  const createdOperatorRoleUser = await addToOperatorRole(user.id);

  return res.json(createdOperatorRoleUser);
};

const addToOperatorRole = async (userId) => {
  const user = await BaseUser.findById(userId);
  const operatorRoleUser = new OperatorRoleUser({ user: userId });
  user.roles.push({ name: OPERATOR, id: operatorRoleUser.id });

  await user.save();
  await operatorRoleUser.save();

  return operatorRoleUser;
};

module.exports = {
  createNewOperator,
  addToOperatorRole
};
