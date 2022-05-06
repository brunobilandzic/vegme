const mongoose = require("mongoose");

const { BaseUser, OperatorRoleUser } = require("../models/user.js");
const HttpError = require("../errors/http-error");
const { OPERATOR } = require("../constants/roles.js");

const createNewOperator = async (req, res, next) => {
  let createdOperatorRoleUser, user;
  try {
    user = await BaseUser.register(req.body, req.body.password);
    createdOperatorRoleUser = await addToOperatorRole(user.id);
  } catch (error) {
    return next(new HttpError("Cannot create operator."));
  }
  return res.json({ createdOperatorRoleUser });
};

const addToOperatorRole = async (userId) => {
  let operatorRoleUser;
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    let user = await BaseUser.findById(userId);
    
    user.roleNames.push(OPERATOR);
    operatorRoleUser = new OperatorRoleUser({ user: userId });
    await user.save({ session: sess });
    await operatorRoleUser.save({ session: sess });

    await sess.commitTransaction();
  } catch (error) {
    throw new HttpError("Cannot add that user to the operator role");
  }

  return operatorRoleUser;
};

module.exports = {
  createNewOperator,
};
