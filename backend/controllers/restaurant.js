const { PaginatedList } = require("../helpers/pagination")
const HttpError = require("../errors/http-error")
const {Restaurant} = require("../models/restaurant.js")

const getAllRestaurants = async (req, res, next) => {
    let restaurantsWithPagination
    try {
        restaurantsWithPagination= await PaginatedList.getPaginatedResult(Restaurant.find())
    } catch (error) {
        return next(new HttpError("Cannot find restaurants."))
    }

    res.json(restaurantsWithPagination)
}

const createRestaurant = async (req, res, next) => {
    let newRestaurant
    try {
        newRestaurant = new Restaurant(req.body)
        await newRestaurant.save()
    } catch (error) {
        return next(new HttpError("Cannot create restaurant."))
    }
    res.json(newRestaurant)
}

module.exports = {
    getAllRestaurants,
    createRestaurant
}