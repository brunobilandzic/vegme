const mongoose = require("mongoose")


const mealObject = {
    name: { type: String, required: true },
    ingredients: [String],
    restaurant: { type: mongoose.Types.ObjectId, ref: "Restaurant" },
    orders: [{ type: mongoose.Types.ObjectId }],
  };
const mealSchema = new mongoose.Schema(mealObject)

const Meal =  mongoose.model("Meal", mealSchema)

module.exports = {Meal}