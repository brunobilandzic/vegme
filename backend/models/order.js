const mongoose = require("mongoose")

const orderObject = {
    remark: { type: String },
    deliveryAddress: { type: String, required: true },
    ordered_by: { type: mongoose.Types.ObjectId, ref: "RegularRoleUser", required: true},
    preparer: {type: mongoose.Types.ObjectId, ref: "RegularRoleUser"},
    meals: [{ type: mongoose.Types.ObjectId, ref: "Meal"}],
  };
const orderSchema = new mongoose.Schema(orderObject)

 const Order =  mongoose.model("Order", orderSchema)

 module.exports = {Order}