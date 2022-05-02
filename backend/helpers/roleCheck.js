const { CUSTOMER, RESTAURANT_OWNER, ADINISTRATOR } = require("../constants/roles")
const HttpError = require("../errors/http-error")
const { BaseUser } = require("../models/user")

const isInRole = async (userId, roleName) => {
    const user = await BaseUser.findById(userId)
    return user.roleNames.includes(roleName)
}
const requireLogin = (req, res, next) => {
    return req.user ? next() : next(new HttpError("You have to log in to continue.", 401))
  };
const requireCustomer = async (req, res, next) => {
   return isInRole(req.user.id,CUSTOMER) ? next() : res.status(401).json({message: "You have to be a customer to access this."})
}

const requireRestaurantOwner = async (req, res, next) => {
    return isInRole(req.user.id, RESTAURANT_OWNER) ? next() :  res.status(401).json({message: "You have to be a restaurant owner to access this."})

}

const requireAdministrator = async (req, res, next) => {
    return isInRole(req.user.id, ADINISTRATOR) ? next(): res.status(401).json({message: "You have to bee administrator to access this."})
}
module.exports = {
    isInRole,
    requireCustomer,
    requireRestaurantOwner,
    requireLogin,
    requireAdministrator
}
