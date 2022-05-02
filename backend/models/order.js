const mongoose = require("mongoose")

const orderObject = {
    remark: { type: String },
    deliveryAddress: { type: String, required: true },
    customer: { type: mongoose.Types.ObjectId, ref: "CustomerRole", required: true },
    restaurant: { type: mongoose.Types.ObjectId, ref: "Restaurant", required: true },
    meals: [{ type: mongoose.Types.ObjectId, ref: "Meal", required: true }],
  };
const orderSchema = new mongoose.Schema(orderObject)

 const Order =  mongoose.model("Order", orderSchema)

 module.exports = {Order}