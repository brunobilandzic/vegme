const mongoose = require("mongoose")

const orderObject = {
    remark: { type: String },
    deliveryAddress: { type: String, required: true },
    ordered_by: { type: mongoose.Types.ObjectId, ref: "RegularRoleUser", required: true},
    preparer: {type: mongoose.Types.ObjectId, ref: "RegularRoleUser"},
    meals: [{ type: mongoose.Types.ObjectId, ref: "Meal"}],
  };

const Order =  mongoose.model("Order", new mongoose.Schema(orderObject))

module.exports = {Order}