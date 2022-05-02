const { PaginatedList } = require("../helpers/pagination.js");
const HttpError = require("../errors/http-error.js");
const {Order} = require("../models/order.js")

const getAllOrders = async (req,res,next) => {
    let ordersWithPagination;
    try {
        ordersWithPagination = await PaginatedList.getPaginatedResult(Order.find())
    } catch (error) {
        return next(new HttpError("Cannot find orders."))
    }

    res.json(ordersWithPagination)
}

const createOrder = async (req, res, next) => {
    let newOrder
    try {
        newOrder = new Order(req.body)
        await newOrder.save()
    } catch (error) {
        return next(new HttpError("Cannot create new order."))
    }

    res.json(newOrder)
}

module.exports = {
    getAllOrders,
    createOrder
}