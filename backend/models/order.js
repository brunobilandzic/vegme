const mongoose = require("mongoose");

const orderObject = {
  cook: { type: mongoose.Types.ObjectId, ref: "CookRoleUser" },
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
  order_time: { type: Number },
};

const Order = mongoose.model("Order", new mongoose.Schema(orderObject));

module.exports = { Order };
