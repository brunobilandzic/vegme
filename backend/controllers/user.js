const mongoose = require("mongoose");
const { PaginatedList } = require("../helpers/pagination.js");
const HttpError = require("../errors/http-error.js");
const {BaseUser} = require("../models/user.js");
const { CUSTOMER, RESTAURANT_OWNER } = require("../constants/roles.js");
const { addToCustomerRole } = require("./customer.js");
const { addToRestaurantOwnerRole } = require("./restaurantOwner.js");

const getAllUsers = async (req, res, next) => {
    let usersWithPagination;
    try {
        usersWithPagination =await PaginatedList.getPaginatedResult(BaseUser.find())
    } catch (error) {
        return next(new HttpError("Cannot find users"))
    }
    res.json(usersWithPagination)
}

const createNewUser = async (req, res, next) => {

    let createdUser = new BaseUser(req.body)

    try {
        await createdUser.save()
        switch (req.body.role) {
            case CUSTOMER:
                await addToCustomerRole(createdUser.id)
                break;
            case RESTAURANT_OWNER:
                await addToRestaurantOwnerRole(createdUser.id) 
                break
            default:
                break;
        }   
    }
    
    catch (error) {
        await createdUser.remove()
        return next(new HttpError("Failed to create user"))
    }

    createdUser = await BaseUser.findById(createdUser.id)

    res.json(createdUser)
}

module.exports = {
    getAllUsers,
    createNewUser
}