const mongoose = require("mongoose");

const mealTypes = {
  MAIN: "MAIN",
  DESSERT: "DESSERT",
  APPETIZER: "APPETIZER",
  DRINK: "DRINK",
};

const mealObject = {
  name: { type: String, required: true },
  ingredients: [String],
  orders: [{ type: mongoose.Types.ObjectId }],
  category: {
    type: String,
    enum: Object.values(mealTypes),
    default: mealTypes.MAIN,
  },
};
const mealSchema = new mongoose.Schema(mealObject);

const Meal = mongoose.model("Meal", mealSchema);

module.exports = { Meal };
