const mongoose = require("mongoose")
const restaurantObject = {
    name: { type: String, required: true },
    owner: { type: mongoose.Types.ObjectId, ref: "BaseUser", required: true},
    meals: [{ type: mongoose.Types.ObjectId, ref: "Meal" }],
    orders: [{ type: mongoose.Types.ObjectId, ref: "Order" }],
    location: {type: String}
  };
const restaurantSchema =new  mongoose.Schema(restaurantObject)

const Restaurant =  mongoose.model("Restaurant", restaurantSchema)

module.exports = {Restaurant}
