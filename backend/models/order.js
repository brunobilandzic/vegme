const mongoose = require("mongoose")

const orderObject = {
    remark: { type: String },
    deliveryAddress: { type: String, required: true },
    orderer: { type: mongoose.Types.ObjectId, ref: "RegularRoleUser", required: true},
    meals: [{ type: mongoose.Types.ObjectId, ref: "Meal"}],
  };

const Order =  mongoose.model("Order", new mongoose.Schema(orderObject))

module.exports = {Order}