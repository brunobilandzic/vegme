const url = require("url");
const { PaginatedList } = require("../helpers/pagination.js");
const HttpError = require("../errors/http-error.js");

const { CUSTOMER } = require("../constants/roles.js");
const { CustomerRoleUser, BaseUser } = require("../models/user.js");
const mongoose = require("mongoose");

const getAllCustomers = async (req, res, next) => {
  const queryObject = url.parse(req.url, true).query;

  let customersIds = await CustomerRoleUser.find();
  customersIds = customersIds.map((cr) =>
    mongoose.Types.ObjectId(cr.user).toString()
  );
  let customerPaginatedList;
  try {
    customerPaginatedList = await PaginatedList.getPaginatedResult(
      BaseUser.find({ _id: { $in: customersIds } }),
      queryObject.pageNumber,
      queryObject.pageSize
    );
  } catch (error) {
    return next(new HttpError("Failed to fetch customers.", 500));
  }

  res.status(200).json({ customerPaginatedList });
};

const createCustomer = async (req, res, next) => {
  let createdCustomerRoleUser;
  try {
    let user = await BaseUser.register(req.body, req.body.password);
    createdCustomerRoleUser = await addToCustomerRole(user.id);
  } catch (error) {
    return next(new HttpError("Cannot add that user to the customer role."));
  }

  res.json(createdCustomerRoleUser);
};

const addToCustomerRole = async (userId) => {
  let createdCustomerRoleUser;
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    const user = await BaseUser.findById(userId);
    user.roleNames.push(CUSTOMER);

    createdCustomerRoleUser = new CustomerRoleUser({ user: userId });

    await user.save({ session: sess });
    await createdCustomerRoleUser.save({ session: sess });

    await sess.commitTransaction();
  } catch (error) {
    throw new HttpError("Cannot add user to the customer role.");
  }
  return createdCustomerRoleUser;
};
module.exports = {
  getAllCustomers,
  createCustomer,
  addToCustomerRole,
};
