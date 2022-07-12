const mongoose = require("mongoose");

const orderTypes = {
    REGULAR: "REGULAR",
    SPECIAL: "SPECIAL"
}

const orderRulesObject = {
  type: {type: String},
  time_of_arrival: {type: Array},
  meal: {type: mongoose.Types.ObjectId, ref: "Meal"}
};

const OrderRules = mongoose.model("OrderRules", new mongoose.Schema(orderRulesObject));

module.exports = { OrderRules };