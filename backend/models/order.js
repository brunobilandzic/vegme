const mongoose = require("mongoose");

const orderObject = {
  remark: { type: String },
  delivery_address: { type: String, required: true },
  orderer: {
    type: mongoose.Types.ObjectId,
    ref: "RegularRoleUser",
    required: true,
  },
  meals: [{ type: mongoose.Types.ObjectId, ref: "Meal" }],
  active: { type: Boolean, default: true },
  date_ordered: { type: Date, default: () => Date.now() },
};

const Order = mongoose.model("Order", new mongoose.Schema(orderObject));

module.exports = { Order };